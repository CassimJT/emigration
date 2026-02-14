import React, { useState, useCallback } from 'react';
import {
  createApplication,
  updateApplication,
  submitApplication as apiSubmitApplication,
  fetchApplication,
  fetchApplicationsForReview,
} from '../api/passport.api';
import { useAuthContext } from '@/providers/AuthProvider';

export function usePassportApplication() {
  const [currentStep, setCurrentStep] = useState(1);
  const [stepsData, setStepsData] = useState({});
  const [applicationId, setApplicationId] = useState(null);



  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(null);

  const [reviewQueue, setReviewQueue] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 1,
  });

  const { verificationSessionId } = useAuthContext();

  // Navigation
  const nextStep = () => setCurrentStep((s) => s + 1);
  const previousStep = () => setCurrentStep((s) => (s > 1 ? s - 1 : 1));

  const saveStepData = (step, data) => {
    console.log(`Saving data for step ${step}:`, data);
    setStepsData((prev) => ({
      ...prev,
      [step]: data,
    }));
  };

  const resetApplication = () => {
    setCurrentStep(1);
    setStepsData({});
    setApplicationId(null);
    setError(null);
    setStatus(null);
    setLoading(false);
  };

  const loadApplication = async (id) => {
    if (!id) return;
    setLoading(true);
    setError(null);
    setStatus(null);
    try {
      const response = await fetchApplication(id);
      if (!response || response.status !== 'success') {
        throw new Error(response?.message || 'Failed to fetch application');
      }
      const app = response.data;
      setApplicationId(id);
      setStepsData(app.formData || {});


      setStatus('success');
      return response;
    } catch (err) {
      setError(err.message || 'Failed to fetch application');
      setStatus('failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const createNewApplication = async (customPayload) => {
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
      const response = await createApplication(payload);
      console.log('Create application response:', response);

      if (!response || response.status !== 'success') {
        throw new Error(response?.message || 'Failed to create application');
      }

      const newApp = response.data;
      const newId = newApp._id;

      if (!newId) throw new Error('No application ID returned');

      setApplicationId(newId);

      setStatus('success');
      console.log('Application created with ID:', newId);
      return response;
    } catch (err) {
      console.error('Create error:', err);
      if (err.response) console.log('Response data:', err.response.data);
      setError(err.message || 'Failed to create application');
      setStatus('failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

const updateExistingApplication = async () => {
  if (!applicationId) {
    throw new Error('No applicationId set');
  }

  setLoading(true);
  setError(null);
  setStatus(null);

  try {
    const flattenedFormData = Object.values(stepsData).reduce(
      (acc, stepData) => ({ ...acc, ...stepData }),
      {}
    );

    const payload = {
      formData: flattenedFormData
    };

    console.log('Updating application with allowed payload:', payload);

    const response = await updateApplication(applicationId, payload);

    if (!response || response.status !== 'success') {
      throw new Error(response?.message || 'Failed to update application');
    }

    setStatus('success');
    return response;
  } catch (err) {
    console.error('Update error:', err);
    if (err.response) {
      console.log('Backend response data:', err.response.data);
      console.log('Status:', err.response.status);
    }
    setError(err.message || 'Failed to update application');
    setStatus('failed');
    throw err;
  } finally {
    setLoading(false);
  }
};

  const submitFinalApplication = async () => {
    if (!applicationId) throw new Error('No applicationId set');
    setLoading(true);
    setError(null);
    setStatus(null);
    try {
      const response = await apiSubmitApplication(applicationId);
      if (!response || response.status !== 'success') {
        throw new Error(response?.message || 'Failed to submit');
      }
      setStatus('success');
      return response;
    } catch (err) {
      setError(err.message || 'Failed to submit application');
      setStatus('failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const saveAndContinue = async (freshStepData) => {
    if (freshStepData) {
      saveStepData(currentStep, freshStepData);
    }

    if (!applicationId) {
      const payload = {
        type: freshStepData?.passportType || stepsData[1]?.passportType,
        formData: {
          ...stepsData,
          [currentStep]: freshStepData || stepsData[currentStep] || {},
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
      await createNewApplication();
    } else {
      await updateExistingApplication();
    }
    return submitFinalApplication();
  };

  const loadReviewQueue = useCallback(
    async ({ page = 1, status = 'DRAFT', limit = 10 } = {}) => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetchApplicationsForReview({ status, page, limit });
        setReviewQueue(response.data || []);
        setPagination(response.pagination || { page, limit, total: 0, pages: 1 });
        return response;
      } catch (err) {
        setError(err.message || 'Failed to load review queue');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const changePage = (newPage) => {
    if (newPage < 1 || newPage > pagination.pages) return;
    loadReviewQueue({ page: newPage, limit: pagination.limit });
  };

  return {
    currentStep,
    stepsData,
    applicationId,
    loading,
    error,
    status,
    nextStep,
    previousStep,
    saveStepData,
    resetApplication,
    loadApplication,
    createNewApplication,
    updateExistingApplication,
    submitFinalApplication,
    saveAndContinue,
    submitApplication,
    reviewQueue,
    pagination,
    loadReviewQueue,
    changePage,
  };
}