import React, { useState } from 'react'
import {
  createApplication,
  updateApplication,
  submitApplication as apiSubmitApplication,
  fetchApplication,
  fetchApplicationsForReview,
} from '../api/passport.api'
import { useAuthContext } from '@/providers/AuthProvider' 

export function usePassportApplication() {
  const [currentStep, setCurrentStep] = useState(1)
  const [stepsData, setStepsData] = useState({})
  const [applicationId, setApplicationId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [status, setStatus] = useState(null)
  const [reviewQueue, setReviewQueue] = useState([]); // renamed from applications for clarity
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 1,
  });

  // Navigation
  const nextStep = () => setCurrentStep((s) => s + 1)
  const previousStep = () => setCurrentStep((s) => (s > 1 ? s - 1 : 1))

  // Data Management

 const { verificationSessionId } = useAuthContext()

  const saveStepData = (step, data) => {
    console.log(`Saving data for step ${step}:`, data)
    setStepsData((prev) => ({
      ...prev,
      [step]: data,
    }))
    console.log(`updated data for ${step}:`,stepsData)
    
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

const loadReviewQueue = React.useCallback(async ({ page = 1, status = "DRAFT", limit = 10 } = {}) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetchApplicationsForReview({ status, page, limit });

      setReviewQueue(response.data || []);
      setPagination(response.pagination || { page, limit, total: 0, pages: 1 });

      return response;
    } catch (err) {
      setError(err.message || "Failed to load review queue");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Helper to change page
  const changePage = (newPage) => {
    if (newPage < 1 || newPage > pagination.pages) return;
    loadReviewQueue({ page: newPage, limit: pagination.limit });
  };

  //  createNewApplication
const createNewApplication = async (customPayload = null) => {
  setLoading(true);
  setError(null);
  setStatus(null);

  try {
    const payload = customPayload || {
      type: stepsData[1]?.passportType,
      formData: stepsData,
      identitySessionId: verificationSessionId, 
    };

    console.log('Creating application with payload:', payload);

    const data = await createApplication(payload);

    console.log('Create application response:', data);

    if (!data || data.status !== 'success') {
      throw new Error(data?.message || 'Failed to create application');
    }

    const newAppId = data?.data?._id;

    if (!newAppId) {
      throw new Error('No application ID returned from createApplication');
    }

    setApplicationId(newAppId);
    setStatus('success');

    console.log('Application created with ID:', newAppId);

    return data;
  } catch (err) {
  console.error('Full API error:', err);
  if (err.response) {  // assuming axios or similar
    console.log('Response data:', err.response.data);
    console.log('Status:', err.response.status);
    console.log('Headers:', err.response.headers);
  }
  setError(err.message || 'Failed to update application');
  setStatus('failed');
  throw err;
  } finally {
    setLoading(false);
  }
};
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
      console.error('Full API error:', err);
    if (err.response) {  // assuming axios or similar
      console.log('Response data:', err.response.data);
      console.log('Status:', err.response.status);
      console.log('Headers:', err.response.headers);
  }
  setError(err.message || 'Failed to update application');
  setStatus('failed');
  throw err;
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

const saveAndContinue = async (freshStepData = null) => {
  if (freshStepData) {
    saveStepData(currentStep, freshStepData);
  }

  const dataForThisStep = freshStepData || stepsData[currentStep] || {};

  if (!applicationId) {
    const payload = {
      type: dataForThisStep.passportType,           
      formData: {
        ...stepsData,                               
        [currentStep]: dataForThisStep,             
      },
      identitySessionId: verificationSessionId,
    };

    await createNewApplication(payload);
  } else {
    await updateExistingApplication();
  }
  nextStep();
};

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

    // review queue
    reviewQueue,
    pagination,
    loadReviewQueue,
    changePage,
  }
}