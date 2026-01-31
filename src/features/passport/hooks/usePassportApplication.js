import { useState } from 'react'
import {
  createApplication,
  updateApplication,
  submitApplication as apiSubmitApplication,
  fetchApplication,
} from '../api/passport.api'

export function usePassportApplication() {
  const [currentStep, setCurrentStep] = useState(0)
  const [stepsData, setStepsData] = useState({})
  const [applicationId, setApplicationId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [status, setStatus] = useState(null) 

  // Navigation
  const nextStep = () => setCurrentStep((s) => s + 1)
  const previousStep = () => setCurrentStep((s) => (s > 0 ? s - 1 : 0))

  // Data Management

  const saveStepData = (step, data) => {
    console.log('Saving data for step', step, data) 
    setStepsData((prev) => ({
      ...prev,
      [step]: data,
    }))
    console.log('Updated stepsData:', {...stepsData, [step]: data})
  }

  const resetApplication = () => {
    setCurrentStep(0)
    setStepsData({})
    setApplicationId(null)
    setError(null)
    setStatus(null)
    setLoading(false)
  }

  // API Operations

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

  const createNewApplication = async () => {
    setLoading(true)
    setError(null)
    setStatus(null)

    try {
      const data = await createApplication(stepsData)

      if (!data || data.status !== 'success') {
        throw new Error(data?.message || 'Failed to create application')
      }

      setApplicationId(data?.data?.id || null)
      setStatus('success')
      return data
    } catch (err) {
      setError(err.message || 'Failed to create application')
      setStatus('failed')
      throw err
    } finally {
      setLoading(false)
    }
  }

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

  const submitFinalApplication = async () => {
    if (!applicationId) {
      throw new Error('No applicationId set')
    }

    setLoading(true)
    setError(null)
    setStatus(null)

    try {
      const data = await apiSubmitApplication(applicationId)

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
