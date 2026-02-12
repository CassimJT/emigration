import React, { useState } from 'react'
import {
  createApplication,
  updateApplication,
  submitApplication as apiSubmitApplication,
  fetchApplication,
  fetchApplications,
} from '../api/passport.api'
import { useAuthContext } from '@/providers/AuthProvider' 

export function usePassportApplication() {
  const [currentStep, setCurrentStep] = useState(0)
  const [stepsData, setStepsData] = useState({})
  const [applicationId, setApplicationId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [status, setStatus] = useState(null) 
  const [applications, setApplications] = useState([]) 

  // Navigation
  const nextStep = () => setCurrentStep((s) => s + 1)
  const previousStep = () => setCurrentStep((s) => (s > 0 ? s - 1 : 0))

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
const loadApplication = React.useCallback(async (id) => {
  if (!id) return;

  setLoading(true);
  setError(null);
  setStatus(null);

  try {
    const data = await fetchApplication(id);
    if (!data || data.status !== 'success') {
      throw new Error(data?.message || 'Failed to fetch application');
    }

    setApplicationId(id);
    setStepsData(data.data || {});
    setStatus('success');
    return data;
  } catch (err) {
    setError(err.message || 'Failed to fetch application');
    setStatus('failed');
    throw err;
  } finally {
    setLoading(false);
  }
}, []);
  
  //////////load all applications (for dashboard)/////////////
const loadApplications = React.useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchApplications(params);
      if (response?.status !== 'success') {
        throw new Error(response?.message || 'Failed to load applications');
      }
      setApplications(response.data || []);
      return response;
    } catch (err) {
      const message = err.message || 'Failed to fetch applications';
      setError(message);
      console.error('Load applications error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

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
    applicationsList: applications,
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
    loadApplications,           // -> fetchApplications
    createNewApplication,       // -> createApplication
    updateExistingApplication,  // -> updateApplication
    submitFinalApplication,     // -> submitApplication

    /* workflow */
    saveAndContinue,
    submitApplication,
  }
}
