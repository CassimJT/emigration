import { useState } from 'react'
import {
  createApplication,
  updateApplication,
  submitApplication as apiSubmitApplication,
  fetchApplication,
} from '../api/passport.api'
import { useAuthContext } from '@/providers/AuthProvider' 

export function usePassportApplication() {
  const [currentStep, setCurrentStep] = useState(1)
  const [stepsData, setStepsData] = useState({})
  const [applicationId, setApplicationId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [status, setStatus] = useState(null) 

  // Navigation
  const nextStep = () => setCurrentStep((s) => s + 1)
  const previousStep = () => setCurrentStep((s) => (s > 1 ? s - 1 : 1))

  // Data Management

 const { verificationSessionId } = useAuthContext()

  const saveStepData = (step, data) => {
    setStepsData((prev) => ({
      ...prev,
      [step]: data,
    }))
    
  }

  //resetApplication
  const resetApplication = () => {
    setCurrentStep(0)
    setStepsData({})
    setApplicationId(null)
    setError(null)
    setStatus(null)
    setLoading(false)
  }

  // API Operations

  //loadApplication
  const loadApplication = async (id) => {
    if (!id) return
    setLoading(true)
    setError(null)
    setStatus(null)

    try {
      const data = await fetchApplication(id)

      if (!data || data.status !== 'success') {
        throw new Error(data?.message || 'Failed to fetch application')
      }

      setApplicationId(id)
      setStepsData(data.data || {})
      setStatus('success')
      return data
    } catch (err) {
      setError(err.message || 'Failed to fetch application')
      setStatus('failed')
      throw err
    } finally {
      setLoading(false)
    }
  }
  //  createNewApplication
  const createNewApplication = async () => {
    setLoading(true)
    setError(null)
    setStatus(null)

    try {
      const payload ={
        type: stepsData[1]?.passportType, 
        formData: stepsData,
        identitySessionId: verificationSessionId, // Include this if your backend needs it to associate the application with the user's session
      }
      console.log('Creating application with payload:', payload)
      const data = await createApplication(payload)
      console.log('Create application response:', data)

      if (!data || data.status !== 'success') {
        throw new Error(data?.message || 'Failed to create application')
      }
      const newAppId = data?.data?._id
      if (!newAppId) {
        throw new Error('No application ID returned from createApplication')
      }
      setApplicationId(newAppId)
      setStatus('success')
      console.log('Application created with ID:',newAppId)
      return data
    } catch (err) {
      setError(err.message || 'Failed to create application')
      setStatus('failed')
      throw err
    } finally {
      setLoading(false)
    }
  }
//updateExistingApplication
  const updateExistingApplication = async () => {
    if (!applicationId) {
      throw new Error('No applicationId set')
    }

    setLoading(true)
    setError(null)
    setStatus(null)

    try {
      const data = await updateApplication(applicationId, stepsData)

      if (!data || data.status !== 'success') {
        throw new Error(data?.message || 'Failed to update application')
      }

      setStatus('success')
      return data
    } catch (err) {
      setError(err.message || 'Failed to update application')
      setStatus('failed')
      throw err
    } finally {
      setLoading(false)
    }
  }
//submitFinalApplication
  const submitFinalApplication = async () => {
    const id = applicationId
    console.log('Submitting application with ID:', id) 
    if (!id) {
      throw new Error('No applicationId set')
    }

    setLoading(true)
    setError(null)
    setStatus(null)

    try {
      const data = await apiSubmitApplication(id)

      if (!data || data.status !== 'success') {
        throw new Error(data?.message || 'Failed to submit application')
      }

      setStatus('success')
      return data
    } catch (err) {
      setError(err.message || 'Failed to submit application')
      setStatus('failed')
      throw err
    } finally {
      setLoading(false)
    }
  }

  // workflow helper

  const saveAndContinue = async () => {
    if (!applicationId) {
      await createNewApplication()
    } else {
      await updateExistingApplication()
    }
    nextStep()
  }

  const submitApplication = async () => {
    if (!applicationId) {
      await createNewApplication()
    } else {
      await updateExistingApplication()
    }
    return submitFinalApplication()
  }

  return {
    /* state */
    currentStep,
    stepsData,
    applicationId,
    loading,
    error,
    status,

    /* navigation */
    nextStep,
    previousStep,

    /* data */
    saveStepData,
    resetApplication,

    /* api-backed actions */
    loadApplication,            // -> fetchApplication
    createNewApplication,       // -> createApplication
    updateExistingApplication,  // -> updateApplication
    submitFinalApplication,     // -> submitApplication

    /* workflow */
    saveAndContinue,
    submitApplication,
  }
}
