import api from '@/lib/axios'

// LOGIN
export async function login(credentials) {
  try {
    const { data } = await api.post('/auth/login', credentials)
    return data
  } catch (error) {
    return handleError(error)
  }
}

// SIGNUP / REGISTER
export async function signup(payload) {
  try {
    const { data } = await api.post('/auth/register', payload)
    return data
  } catch (error) {
    return handleError(error)
  }
}

// OTP VERIFICATION
export async function verifyOtp(payload) {
  try {
    const { data } = await api.post('/auth/verify-otp', payload)
    return data
  } catch (error) {
    return handleError(error)
  }
}

// RESEND OTP
export async function resendOtp(payload) {
  try {
    const { data } = await api.post('/auth/resend-otp', payload)
    return data
  } catch (error) {
    return handleError(error)
  }
}

// REFRESH TOKEN
export async function refreshToken(payload) {
  try {
    const { data } = await api.post('/auth/refresh-token', payload)
    return data
  } catch (error) {
    return handleError(error)
  }
}

// FORGOT PASSWORD
export async function forgotPassword(payload) {
  try {
    const { data } = await api.post('/auth/request-reset', payload)
    return data
  } catch (error) {
    return handleError(error)
  }
}

// RESET PASSWORD
export async function resetPassword(payload) {
  try {
    const { data } = await api.post('/auth/reset-password', payload)
    return data
  } catch (error) {
    return handleError(error)
  }
}

// CHANGE PASSWORD
export async function changePassword(payload) {
  try {
    const { data } = await api.post('/auth/change-password', payload)
    return data
  } catch (error) {
    return handleError(error)
  }
}

// VERIFY NATIONAL ID
export async function verifyNationalId(payload) {
  try {
    const { data } = await api.post('/auth/verfy-national-id', payload)
    return data
  } catch (error) {
    return handleError(error)
  }
}

// ERROR HANDLER
function handleError(error) {
  if (error.response) {
    // API returned a response (400/404/500)
    return error.response.data
  } else if (error.request) {
    // Request made but no response
    return { status: 500, statusText: 'Failed', message: 'No response from server' }
  } else {
    // Other error
    return { status: 500, statusText: 'Failed', message: error.message }
  }
}
