import React from "react";
import { useState } from 'react';
import ProgressIndicator from '../components/ProgressIndicator';
import PassportTypeStep from '../components/PassportTypeStep';
import PersonalInfoStep from '../components/PersonalInfoStep';
import ReviewStep from '../components/ReviewStep';
import SubmitApplicationPage from "../components/SubmitApplication";
import { usePassportApplication } from '../hooks/usePassportApplication';
import { Navigate, useNavigate, useOutletContext } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useLocation } from "react-router-dom";



function PassportApplicationPage() {
  const { user } = useAuth();
  const { currentRole } = useOutletContext();
  
  const role = (currentRole || user?.role || 'client').toLowerCase();
  

  const[isSubmitting, setIsSubmitting] = useState(false);
  const[loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Extract selectedType from location state if available
  const location = useLocation();
  const selectedType = location.state?.selectedType || null;
  const [passportTypeData, setPassportTypeData] = useState({
        passportType: selectedType?.type || 'Ordinary',
        serviceType: selectedType?.serviceType || 'Normal',
        bookletType: selectedType?.page || '36 Pages',
   });

  const [personalInfoStepData,setPersonalInfoStepData] = useState({
        name: '',
        surname: '',
        email: '',
        residentialStatus: 'Ordinary',
        occupation: 'Ordinary',
   })

  const { 
    currentStep,
    nextStep,
    previousStep,
    saveStepData,
    stepsData,
    saveAndContinue,
    submitFinalApplication } = usePassportApplication();

  const preparePayload = () => {

      if (currentStep === 1) {
        return {
          passportType: passportTypeData.passportType.trim(),
          serviceType: passportTypeData.serviceType.trim(),
          bookletType: passportTypeData.bookletType.trim()
        }
      }

      else if (currentStep === 2) {
        return {
          name: personalInfoStepData.name.trim(),
          surname: personalInfoStepData.surname.trim(),
          email: personalInfoStepData.email.trim(),
          residentialStatus: personalInfoStepData.residentialStatus.trim() || 'Ordinary',
          occupation: personalInfoStepData.occupation.trim() || 'Ordinary',
        }
      }

      return {};
    }
  const handleChange = (e) => {
      const { id, value } = e.target;

      if (currentStep === 1) {
        setPassportTypeData((prev) => ({ ...prev, [id]: value }));
      } else if (currentStep === 2) {
        setPersonalInfoStepData((prev) => ({ ...prev, [id]: value }));
      }
    };

  const handleNext = async (e) => {
      e.preventDefault();
      const payload = preparePayload();
      saveStepData(currentStep + 1, payload);

      if(currentStep === 3){
       try{
        setLoading(true);
        await saveAndContinue();
        nextStep();
        return;
        
       }
        catch(err){ 
          console.error(err);
        } finally {
          setLoading(false);
        }
        
      }
      if(currentStep === 4){
        try {
          setIsSubmitting(true);
          await submitFinalApplication();
          navigate("/dashboard/payments");
        } catch (err) {
          console.error(err);
        } finally {
          setIsSubmitting(false);
        }
          return;
      }
      await saveAndContinue();
      //nextStep();
    }

  const formData = {
      ...stepsData[1],
      ...stepsData[2],
    };      

  if (role !== 'client') {
    return (
      <Navigate to="*" replace />
    );
  }

  return(
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
              passportType={passportTypeData.passportType}
              serviceType={passportTypeData.serviceType}
              bookletType={passportTypeData.bookletType}
              onChange={handleChange} 
              onSubmit={handleNext} 
              initialData={formData} 
            />
          )}
          {currentStep === 2 && (
            <PersonalInfoStep
              name={personalInfoStepData.name}
              surname={personalInfoStepData.surname}
              email={personalInfoStepData.email}
              residentialStatus={personalInfoStepData.residentialStatus}
              occupation={personalInfoStepData.occupation}
              onBack={previousStep}
              onChange={handleChange}
              onSubmit={handleNext} 
              initialData={formData} 
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
              summaryData={Object.entries(formData).map(([label, value]) => ({ label, value }))} 
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