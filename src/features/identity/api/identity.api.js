import api from '@/lib/axios'

// Start identity verification
export async function submitNationalId(payload) {
  try {
    const { data } = await api.post('/verfy-national-id', payload)
    return data
  } catch (error) {
    return handleError(error)
  }
}

// Fetch verification status
export async function fetchVerificationStatus(referenceId) {
  try {
    const { data } = await api.get(`/identity/status/${referenceId}`)
    return data
  } catch (error) {
    return handleError(error)
  }
}

// Generic error handler
function handleError(error) {
  if (error.response) {
    return error.response.data
  } else if (error.request) {
    return {
      status: 'failed',
      message: 'No response from server',
    }
  } else {
    return {
      status: 'failed',
      message: error.message,
    }
  }
}
