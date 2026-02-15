// passport/pages/PassportApplicationPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";

import ProgressIndicator from "../components/ProgressIndicator";
import PassportTypeStep from "../components/PassportTypeStep";
import PersonalInfoStep from "../components/PersonalInfoStep";
import ReviewStep from "../components/ReviewStep";

import { usePassportApplication } from "../hooks/usePassportApplication";
import SubmitApplicationPage from "../components/SubmitApplication";

export default function PassportApplicationPage() {
  const { user } = useAuth();
  const { currentRole } = useOutletContext();
  const role = (currentRole || user?.role || "client").toLowerCase();
  const navigate = useNavigate();

  const {
    currentStep,
    nextStep,
    previousStep,
    saveStepData,
    stepsData,
    saveAndContinue,
    submitFinalApplication,
    loading: hookLoading,
  } = usePassportApplication();

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Flattened formData from all steps — single source of truth
  const formData = React.useMemo(() => {
    return Object.values(stepsData).reduce((acc, step) => ({ ...acc, ...step }), {});
  }, [stepsData]);

  const handleNext = async (e, stepData = null) => {
    e.preventDefault();

    try {
      // Save current step data if provided by the step component
      if (stepData) {
        saveStepData(currentStep, stepData);
      }

      // Final submission
      if (currentStep === 4) {
        setIsSubmitting(true);
        await submitFinalApplication();
        toast.success("Application submitted successfully!");
        navigate("/dashboard/payments");
        return;
      }

      // Proceed to next step
      await saveAndContinue(stepData);
    } catch (err) {
      console.error("Error during next step:", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    previousStep();
  };

  if (role !== "client") {
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
              passportType={formData.passportType || "Ordinary"}
              serviceType={formData.serviceType || "Normal"}
              bookletType={formData.bookletType || "36 Pages"}
              onSubmit={handleNext}
              loading={hookLoading}
            />
          )}

          {currentStep === 2 && (
            <PersonalInfoStep
              name={formData.name || ""}
              surname={formData.surname || ""}
              email={formData.email || ""}
              height={formData.height || ""}
              mothersPlaceOfBirth={formData.mothersPlaceOfBirth || ""}
              residentialStatus={formData.residentialStatus || "Permanent"}
              occupation={formData.occupation || "Ordinary"}
              onBack={handleBack}
              onSubmit={handleNext}
              loading={hookLoading}
            />
          )}

          {currentStep === 3 && (
            <ReviewStep
              data={formData}
              onBack={handleBack}
              onClick={handleNext}
              loading={hookLoading}
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
              onBack={handleBack}
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