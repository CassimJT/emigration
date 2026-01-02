import React from "react";
 import { useState } from 'react';
 import ProgressIndicator from '../components/ProgressIndicator';
 import PassportTypeStep from '../components/PassportTypeStep';
 import PersonalInfoStep from '../components/PersonalInfoStep';
 import ReviewStep from '../components/ReviewStep';


function PassportApplicationPage() {

   const [step, setStep] = useState(1);
   const [formData, setFormData] = useState({});
  //const step = 1;

  const handleNext = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };
  

  return(
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <h1 className="mb-2 text-center text-2xl font-bold text-gray-800">
          APPLICATION FORM FOR NEW MALAWI PASSPORT
        </h1>

        {/* Progress */}
        <ProgressIndicator currentStep={step} />

        {/* Form Card */}
        <div className="mt-8 rounded-xl bg-white p-8 shadow-sm">
          {step === 1 && (
            <PassportTypeStep 
              onNext={handleNext} 
              initialData={formData} 
            />
          )}
          {step === 2 && (
            <PersonalInfoStep 
              onNext={handleNext} 
              onBack={handleBack} 
              initialData={formData} 
            />
          )}
          {step === 3 && (
            <ReviewStep 
              data={formData} 
              onBack={handleBack} 
              // onSubmit={() => console.log('Submit:', formData)}
            />
          )}
        </div>
      </div>
    </div>

  );
}

export default PassportApplicationPage;