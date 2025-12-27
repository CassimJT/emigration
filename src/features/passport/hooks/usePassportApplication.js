// src/features/passport/hooks/usePassportApplication.js
import { useState } from 'react'
import {
  createApplication,
  updateApplication,
  submitApplication as apiSubmitApplication,
  fetchApplication
} from '../api/passport.api'

export function usePassportApplication() {
  const [currentStep, setCurrentStep] = useState(0)
  const [stepsData, setStepsData] = useState({})
  const [applicationId, setApplicationId] = useState(null)

  // Move to next step
  const nextStep = () => {
    setCurrentStep((prev) => prev + 1)
  }

  // Move to previous step
  const previousStep = () => {
    setCurrentStep((prev) => (prev > 0 ? prev - 1 : 0))
  }

  // Save data for a specific step
  const saveStepData = (step, data) => {
    setStepsData((prev) => ({
      ...prev,
      [step]: data,
    }))
  }

  // Submit the full application
  const submitApplication = async () => {
    try {
      let response
      if (!applicationId) {
        // Create new application
        response = await createApplication(stepsData)
        setApplicationId(response?.data?.id || null)
      } else {
        // Update existing application
        response = await updateApplication(applicationId, stepsData)
      }

      // Final submission
      if (applicationId) {
        const submitResponse = await apiSubmitApplication(applicationId)
        return submitResponse
      }

      return response
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  return {
    currentStep,
    nextStep,
    previousStep,
    saveStepData,
    stepsData,
    applicationId,
    submitApplication,
  }
}
