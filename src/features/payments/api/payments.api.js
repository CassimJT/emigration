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
  if (!reference || typeof reference !== 'string' || reference.trim() === '') {
    throw new Error('Payment reference is required');
  }

  try {
    const response = await api.get(`/payments/verify?tx_ref=${encodeURIComponent(reference)}`);

    const data = response.data;

    if (!data.success) {
      throw new Error(data.message || 'Payment verification failed');
    }

    if (data.payment && data.payment.status === 'failed') {
      throw new Error('Payment was marked as failed');
    }

    return {
      success: data.success,
      message: data.message,
      payment: data.payment,
      verification: data.verification,
      redirectURL: data.redirectURL
    };
  } catch (error) {
    const handled = handleError(error);

    throw new Error(
      handled?.message ||
      `Failed to verify payment for reference: ${reference}`
    );
  }
}

// Fetch payment history for a user
export async function fetchPaymentHistory(userId) {
  try {

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
