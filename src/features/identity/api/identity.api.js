// src/features/identity/api/identity.api.js
import api from '@/lib/axios'

// Submit National ID for verification
export async function submitNationalId(payload) {
  try {
    const { data } = await api.post('/auth/verfy-national-id', payload)
    return data
  } catch (error) {
    return handleError(error)
  }
}

// Verify National ID using reference ID
export async function verifyNationalId(referenceId) {
  try {
    const { data } = await api.get(`/identity/verify/${referenceId}`)
    return data
  } catch (error) {
    return handleError(error)
  }
}

// Fetch verification status for a reference ID
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
    return { status: 500, statusText: 'Failed', message: 'No response from server' }
  } else {
    return { status: 500, statusText: 'Failed', message: error.message }
  }
}
