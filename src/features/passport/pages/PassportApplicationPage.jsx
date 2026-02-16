// passport/pages/PassportApplicationPage.jsx
import React, { useState, useEffect } from 'react';
import ProgressIndicator from '../components/ProgressIndicator';
import PassportTypeStep from '../components/PassportTypeStep';
import PersonalInfoStep from '../components/PersonalInfoStep';
import ReviewStep from '../components/ReviewStep';
import SubmitApplicationPage from "../components/SubmitApplication";
import { usePassportApplication } from '../hooks/usePassportApplication';
import { Navigate, useNavigate, useOutletContext } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";


function PassportApplicationPage() {
  const { user, verificationSessionId, citizenProfile } = useAuth();
  const { currentRole } = useOutletContext();
  const role = (currentRole || user?.role || 'client').toLowerCase();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();
  const selectedType = location.state?.selectedType || null;

  const [passportTypeData, setPassportTypeData] = useState({
    passportType: selectedType?.type || 'Ordinary',
    serviceType: selectedType?.serviceType || 'Normal',
    bookletType: selectedType?.pages || '36 Pages',
  });

  const [personalInfoStepData, setPersonalInfoStepData] = useState({
    name: '',
    surname: '',
    nationalId: '',
    email: '',
    residentialStatus: 'Permanent',
    occupation: 'Working',
    height: '',
    placeOfBirth: '',
    mothersPlaceOfBirth: '',
  });

  // Pre-fill form with citizen profile data from auth context
  useEffect(() => {
    console.log("=== CITIZEN PROFILE CHECK ===");
    console.log("citizenProfile from auth:", citizenProfile);
    
    if (citizenProfile) {
      console.log("Pre-filling form with citizen profile:", citizenProfile);
      setPersonalInfoStepData(prev => {
        const updated = {
          ...prev,
          name: citizenProfile.firstName || '',
          surname: citizenProfile.surName || '',
          nationalId: citizenProfile.nationalId || '',
        };
        console.log("Updated personalInfoStepData:", updated);
        return updated;
      });
    } else {
      console.warn("No citizenProfile available in auth context!");
    }
  }, [citizenProfile]);

  const {
    currentStep,
    nextStep,
    previousStep,
    saveStepData,
    stepsData,
    submitFinalApplication,
    createNewApplication,
    updateExistingApplication,
    applicationId,
    fetchIdentityDetails,
  } = usePassportApplication();

  const preparePayload = () => {
    if (currentStep === 1) {
      return {
        passportType: passportTypeData.passportType.trim(),
        serviceType: passportTypeData.serviceType.trim(),
        bookletType: passportTypeData.bookletType.trim()
      };
    }
    if (currentStep === 2) {
      return {
        name: personalInfoStepData.name.trim(),
        surname: personalInfoStepData.surname.trim(),
        email: personalInfoStepData.email.trim(),
        residentialStatus: personalInfoStepData.residentialStatus.trim() || 'Ordinary',
        occupation: personalInfoStepData.occupation.trim() || 'Ordinary',
        height: personalInfoStepData.height,
        placeOfBirth: personalInfoStepData.placeOfBirth?.trim(),
        mothersPlaceOfBirth: personalInfoStepData.mothersPlaceOfBirth?.trim(),
        nationalId: personalInfoStepData.nationalId, // Include nationalId in payload
      };
    }
    return {};
  };

  const handleChange = (id, value) => {
    if (currentStep === 1) {
      setPassportTypeData((prev) => ({ ...prev, [id]: value }));
    } else if (currentStep === 2) {
      setPersonalInfoStepData((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleNext = async (e) => {
    e.preventDefault();

    let payload = preparePayload();
    console.log("Prepared payload for step", currentStep, payload);

    setLoading(true);

    try {
      if (currentStep === 1 || currentStep === 2) {
        // Data is already populated from citizenProfile in useEffect
        // Just save and proceed
        console.log("Saving step data:", currentStep, payload);
        saveStepData(currentStep, payload);
        nextStep();
      }
      else if (currentStep === 3) {
        if (applicationId) {
          await updateExistingApplication();
        } else {
          await createNewApplication();
        }
        nextStep();
      }
      else if (currentStep === 4) {
        setIsSubmitting(true);
        await submitFinalApplication();
        toast.success("Application submitted successfully!");
        navigate("/dashboard/payments");
        return;
      }
    } catch (err) {
      console.error("Next failed:", err);
      toast.error("Failed to proceed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formData = {
    ...stepsData[1],
    ...stepsData[2],
  };

  if (role !== 'client') {
    return <Navigate to="*" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-2 text-center text-2xl font-bold text-gray-800">
          APPLICATION FORM FOR NEW MALAWI PASSPORT
        </h1>

        <ProgressIndicator currentStep={currentStep} />

        <div className="mt-8 rounded-xl bg-white p-8 shadow-sm">
          {currentStep === 1 && (
            <PassportTypeStep
              passportType={passportTypeData.passportType}
              serviceType={passportTypeData.serviceType}
              bookletType={passportTypeData.bookletType}
              onChange={handleChange}
              onSubmit={handleNext}
              loading={loading}
            />
          )}

          {currentStep === 2 && (
            <PersonalInfoStep
              name={personalInfoStepData.name}
              surname={personalInfoStepData.surname}
              email={personalInfoStepData.email}
              residentialStatus={personalInfoStepData.residentialStatus}
              occupation={personalInfoStepData.occupation}
              height={personalInfoStepData.height}
              placeOfBirth={personalInfoStepData.placeOfBirth}
              mothersPlaceOfBirth={personalInfoStepData.mothersPlaceOfBirth}
              onBack={previousStep}
              onChange={handleChange}
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
              passportDetails={stepsData[1]}
              personalDetails={stepsData[2]}
              onBack={previousStep}
              onSubmit={handleNext}
              isSubmitting={isSubmitting}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default PassportApplicationPage;