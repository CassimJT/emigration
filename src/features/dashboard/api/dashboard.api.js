import api from '@/lib/axios'

/*
 * API Mock/Service layer for Dashboard data.
 * Provides functions to fetch dashboard summaries, application statuses,
 * and payment details. Currently uses mock/placeholder endpoints.
 */

// Fetch overall dashboard summary (user-specific) <<exported>>
async function fetchDashboardSummary() {
  try {
    const { data } = await api.get('') 
    return data
  } catch (error) {
    return handleError(error)
  }
}

// Fetch passport/application status for dashboard display <<exported>>
async function fetchApplicationStatus() {
  try {
    const { data } = await api.get('') 
    return data
  } catch (error) {
    return handleError(error)
  }
}

// Fetch payment status for dashboard display <<exported>>
async function fetchPaymentStatus() {
  try {
    const { data } = await api.get('') 
    return data
  } catch (error) {
    return handleError(error)
  }
}

// Consistent error handling function
function handleError(error) {
  if (error.response) {
    return error.response.data
  } else if (error.request) {
    return { status: 500, statusText: 'Failed', message: 'No response from server' }
  } else {
    return { status: 500, statusText: 'Failed', message: error.message }
  }
}

export{
  fetchDashboardSummary,
  fetchApplicationStatus,
  fetchPaymentStatus,
}