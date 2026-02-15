// passport/pages/PassportApplicationPage.jsx
import React, { useState } from 'react';
import ProgressIndicator from '../components/ProgressIndicator';
import PassportTypeStep from '../components/PassportTypeStep';
import PersonalInfoStep from '../components/PersonalInfoStep';
import ReviewStep from '../components/ReviewStep';
import { usePassportApplication } from '../hooks/usePassportApplication';
import { Navigate, useNavigate, useOutletContext } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";
import SubmitApplicationPage from '../components/SubmitApplication';

function PassportApplicationPage() {
  const { user } = useAuth();
  const { currentRole } = useOutletContext();
  const role = (currentRole || user?.role || 'client').toLowerCase();
  const navigate = useNavigate();

  const location = useLocation();
  const selectedType = location.state?.selectedType || null;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    currentStep,
    previousStep,
    saveStepData,
    stepsData,
    saveAndContinue,
    submitFinalApplication,
    applicationId,
    createNewApplication,
  } = usePassportApplication();

  // Flattened formData from hook (for display/review/submit)
  const formData = React.useMemo(() => {
    return Object.values(stepsData).reduce((acc, step) => ({ ...acc, ...step }), {});
  }, [stepsData]);

  const handleNext = async (e, stepData = null) => {
    e.preventDefault();

    try {
      // Save current step data if provided
      if (stepData) {
        saveStepData(currentStep, stepData);
      }

      // Create application ONLY after step 2 (Personal Info)
      if (currentStep === 2 && !applicationId) {
        setLoading(true);
        const payload = {
          type: formData.passportType || stepData?.passportType || 'Ordinary',
          formData: { ...formData, ...stepData },
          identitySessionId: 'your-verification-session-id-here', // ← replace with real value from auth/context
        };
        await createNewApplication(payload);
      }

      // Final submission
      if (currentStep === 4) {
        setIsSubmitting(true);
        await submitFinalApplication();
        toast.success("Application submitted successfully!");
        navigate("/dashboard/payments");
        return;
      }

      // Normal next step
      await saveAndContinue(stepData);
    } catch (err) {
      console.error("Next failed:", err);
      toast.error("Failed to proceed. Please try again.");
    } finally {
      setLoading(false);
      setIsSubmitting(false);
    }
  };

  if (role !== 'client') {
    return <Navigate to="*" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <h1 className="mb-2 text-center text-2xl font-bold text-gray-800">
          APPLICATION FORM FOR NEW MALAWI PASSPORT
        </h1>

        {/* Progress */}
        <ProgressIndicator currentStep={currentStep} />

        {/* Form Card */}
        <div className="mt-8 rounded-xl bg-white p-8 shadow-sm">
          {currentStep === 1 && (
            <PassportTypeStep
              passportType={formData.passportType || selectedType?.type || 'Ordinary'}
              serviceType={formData.serviceType || selectedType?.serviceType || 'Normal'}
              bookletType={formData.bookletType || selectedType?.pages || '36 Pages'}
              onChange={(id, value) => {
                console.log(id,value)
              }}
              onSubmit={handleNext}
              loading={loading}
            />
          )}

          {currentStep === 2 && (
            <PersonalInfoStep
              name={formData.name || ''}
              surname={formData.surname || ''}
              email={formData.email || ''}
              height={formData.height || ''}
              mothersPlaceOfBirth={formData.mothersPlaceOfBirth || ''}
              residentialStatus={formData.residentialStatus || 'Permanent'}
              occupation={formData.occupation || 'Ordinary'}
              onBack={previousStep}
              onChange={(id, value) => {
                console.log(id,value)
              }}
              onSubmit={handleNext}
              loading={loading}
            />
          )}

          {currentStep === 3 && (
            <ReviewStep
              data={formData}
              onBack={previousStep}
              onClick={handleNext}
              loading={loading}
            />
          )}

          {currentStep === 4 && (
            <SubmitApplicationPage
              summaryData={Object.entries(formData).map(([key, value]) => ({
                label: key
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())
                  .trim(),
                value,
              }))}
              onBack={previousStep}
              onSubmit={handleNext}
              isSubmitting={isSubmitting}
            />
          )}
        </div>

        {/* Footer note */}
        <p className="mt-8 text-center text-sm text-gray-500">
          Please ensure all information is accurate before final submission
        </p>
      </div>
    </div>
  );
}

export default PassportApplicationPage;