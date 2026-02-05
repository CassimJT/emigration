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
    // Backend expects tx_ref in query: router.get("/verify", verify);
    const { data } = await api.get(`/payments/verify?tx_ref=${reference}`)
    return data
  } catch (error) {
    throw handleError(error)
  }
}

// Fetch payment history for a user
export async function fetchPaymentHistory(userId) {
  try {
    // Backend: router.get('/user/:userId', ...)
    const { data } = await api.get(`/payments/user/${userId}`)
    return data
  } catch (error) {
    throw handleError(error)
  }
}

// Cancel payment (Note: backend seems to have a bug here, but adding for completeness)
// Backend: router.post("/cancel",cancelPayment) but controller expects req.params.paymentId
export async function cancelPayment(paymentId) {
  try {
    const { data } = await api.post(`/payments/cancel/${paymentId}`)
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
