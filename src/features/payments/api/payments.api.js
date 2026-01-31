import api from '@/lib/axios'

// Initiate a new payment
export async function initiatePayment(payload) {
  try {
    const { data } = await api.post('/payments/init', payload)
    return data
  } catch (error) {
    throw handleError(error)
  }
}

// Verify payment status by reference
export async function verifyPayment(reference) {
  try {
    const { data } = await api.get(`/payments/verify/${reference}`)
    return data
  } catch (error) {
    throw handleError(error)
  }
}

// Fetch payment history for the current user
export async function fetchPaymentHistory() {
  try {
    const { data } = await api.get('/payments/history')
    return data
  } catch (error) {
    throw handleError(error)
  }
}

// Centralized error handling
function handleError(error) {
  if (error.response) {
    return error.response.data
  } else if (error.request) {
    return { 
      status: 500, 
      statusText: 'Failed', 
      message: 'No response from server' 
    }
  } else {
    return { 
      status: 500, 
      statusText: 'Failed', 
      message: error.message 
    }
  }
}
