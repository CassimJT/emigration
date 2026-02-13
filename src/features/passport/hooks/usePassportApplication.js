import { useState } from 'react'
import {
  createApplication,
  updateApplication,
  submitApplication as apiSubmitApplication,
  fetchApplication,
  fetchMyApplications,
  fetchApplicationsForReview,
  startReview as apiStartReview,
  approveApplication as apiApproveApplication,
  rejectApplication as apiRejectApplication,
  fetchImmigrationRecord,
} from '../api/passport.api'

import { useAuthContext } from '@/providers/AuthProvider'

export function usePassportApplication() {
  const { verificationSessionId } = useAuthContext()

  
   //  STATE


  const [currentStep, setCurrentStep] = useState(0)
  const [stepsData, setStepsData] = useState({})
  const [applicationId, setApplicationId] = useState(null)

  const [applications, setApplications] = useState([])
  const [reviewQueue, setReviewQueue] = useState([])
  const [immigrationRecord, setImmigrationRecord] = useState(null)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [status, setStatus] = useState(null)



  // NAVIGATION


  const nextStep = () => setCurrentStep((s) => s + 1)
  const previousStep = () =>
    setCurrentStep((s) => (s > 0 ? s - 1 : 0))


  // DATA MANAGEMENT

  const saveStepData = (step, data) => {
    setStepsData((prev) => ({
      ...prev,
      [step]: data,
    }))
  }

  const resetApplication = () => {
    setCurrentStep(0)
    setStepsData({})
    setApplicationId(null)
    setImmigrationRecord(null)
    setError(null)
    setStatus(null)
    setLoading(false)
  }


  // CLIENT SIDE OPERATIONS

  const loadApplication = async (id) => {
    if (!id) return

    setLoading(true)
    setError(null)

    try {
      const data = await fetchApplication(id)

      if (!data || data.status !== 'success') {
        throw new Error(data?.message || 'Failed to fetch application')
      }

      setApplicationId(id)
      setStepsData(data.data?.formData || {})
      setStatus('success')

      return data
    } catch (err) {
      setError(err.message)
      setStatus('failed')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const createNewApplication = async () => {
    setLoading(true)
    setError(null)

    try {
      const payload = {
        type: stepsData[1]?.passportType,
        formData: stepsData,
        identitySessionId: verificationSessionId,
      }

      const data = await createApplication(payload)

      if (!data || data.status !== 'success') {
        throw new Error(data?.message || 'Failed to create application')
      }

      setApplicationId(data.data?._id || data.data?.id)
      setStatus('success')

      return data
    } catch (err) {
      setError(err.message)
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

    try {
      const data = await updateApplication(applicationId, {
        formData: stepsData,
      })

      if (!data || data.status !== 'success') {
        throw new Error(data?.message || 'Failed to update application')
      }

      setStatus('success')
      return data
    } catch (err) {
      setError(err.message)
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

    try {
      const data = await apiSubmitApplication(applicationId)

      if (!data || data.status !== 'success') {
        throw new Error(data?.message || 'Failed to submit application')
      }

      setStatus('success')
      return data
    } catch (err) {
      setError(err.message)
      setStatus('failed')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const loadMyApplications = async (filterStatus = null) => {
    setLoading(true)
    setError(null)

    try {
      const data = await fetchMyApplications(filterStatus)

      if (!data || data.status !== 'success') {
        throw new Error(data?.message || 'Failed to load applications')
      }

      setApplications(data.data || [])
      return data
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const loadImmigrationRecord = async (appId) => {
    setLoading(true)
    setError(null)

    try {
      const data = await fetchImmigrationRecord(appId)

      if (!data || data.status !== 'success') {
        throw new Error(data?.message || 'Failed to load immigration record')
      }

      setImmigrationRecord(data.data)
      return data
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

   //  OFFICER / ADMIN OPERATIONS


  const loadReviewQueue = async (status = 'SUBMITTED') => {
    setLoading(true)
    setError(null)

    try {
      const data = await fetchApplicationsForReview(status)

      if (!data || data.status !== 'success') {
        throw new Error(data?.message || 'Failed to load review queue')
      }

      setReviewQueue(data.data || [])
      return data
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const startReview = async (id) => {
    setLoading(true)
    setError(null)

    try {
      const data = await apiStartReview(id)

      if (!data || data.status !== 'success') {
        throw new Error(data?.message || 'Failed to start review')
      }

      return data
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const approveApplication = async (id) => {
    setLoading(true)
    setError(null)

    try {
      const data = await apiApproveApplication(id)

      if (!data || data.status !== 'success') {
        throw new Error(data?.message || 'Failed to approve application')
      }

      return data
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const rejectApplication = async (id, reason = null) => {
    setLoading(true)
    setError(null)

    try {
      const data = await apiRejectApplication(id, reason)

      if (!data || data.status !== 'success') {
        throw new Error(data?.message || 'Failed to reject application')
      }

      return data
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  
  //   WORKFLOW HELPERS
 

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

  
   //  RETURN


  return {
    /* state */
    currentStep,
    stepsData,
    applicationId,
    applications,
    reviewQueue,
    immigrationRecord,
    loading,
    error,
    status,

    /* navigation */
    nextStep,
    previousStep,

    /* data */
    saveStepData,
    resetApplication,

    /* client operations */
    loadApplication,
    createNewApplication,
    updateExistingApplication,
    submitFinalApplication,
    loadMyApplications,
    loadImmigrationRecord,

    /* officer operations */
    loadReviewQueue,
    startReview,
    approveApplication,
    rejectApplication,

    /* workflow */
    saveAndContinue,
    submitApplication,
  }
}
