import { useState } from 'react'
import { useAuthContext } from '@/providers/AuthProvider'
import {
  login as apiLogin,
  signup as apiSignup,
  verifyOtp as apiVerifyOtp,
  forgotPassword as apiForgotPassword,
  refreshToken as apiRefreshToken,
  resetPassword as apiResetPassword,
  changePassword as apiChangePassword,
} from '../api/auth.api'

export function useAuth() {
  const {
    user,
    isAuthenticated,

    // Identity phase
    verificationSessionId,

    // Login / OTP phase
    loginSessionId,
    startLoginSession,
    clearLoginSession,

    // Final auth
    login: finalizeLogin,
    logout: finalizeLogout,
  } = useAuthContext()

  const [status, setStatus] = useState(null) // null | 'success' | 'failed'
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const clearError = () => setError(null)
  const clearStatus = () => setStatus(null)

  /* ---------------- LOGIN (credentials + verificationSessionId → OTP) ---------------- */

  const login = async ({ credentials }) => {
  if (loading) return
  if (!verificationSessionId) {
    setStatus('failed')
    setError('Identity verification required before login')
    return Promise.reject(new Error('Missing verification session'))
  }

  setLoading(true)
  setError(null)
  setStatus(null)

  try {
    const payload = {
      emailAddress: credentials.emailAddress,
      password: credentials.password,
      verificationSessionId,
    }

    const data = await apiLogin(payload)

    // Defensive: handle both thrown and returned errors
    if (!data || data.status !== 'success' || !data.loginSessionId) {
      const msg = data?.message || 'Login failed'
      throw new Error(msg)
    }

    startLoginSession(data.loginSessionId)
    setStatus('success')
    return data
  } catch (err) {
    const message =
      err?.message ||
      err?.response?.data?.message ||
      err?.message ||
      'Login failed'

    setStatus('failed')
    setError(message)
    throw err
  } finally {
    setLoading(false)
  }
}

  /* ---------------- VERIFY OTP (loginSessionId + otp → tokens) ---------------- */

  const verifyOtp = async ({ otp }) => {
    if (loading) return
    if (!loginSessionId) {
      setStatus('failed')
      setError('No active login session')
      return
    }

    setLoading(true)
    setError(null)
    setStatus(null)

    try {
      const payload = {
        loginSessionId,
        otp,
      }

      const data = await apiVerifyOtp(payload)

      if (!data || data.status !== 'success' || !data.accessToken) {
        setStatus(data?.status || 'failed')
        throw new Error(data?.message || 'OTP verification failed')
      }

      finalizeLogin(data.user ?? user, {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      })

      clearLoginSession()
      setStatus('success')
      return data
    } catch (err) {
      setStatus('failed')
      setError(err?.response?.data?.message || err.message || 'OTP verification failed')
      throw err
    } finally {
      setLoading(false)
    }
  }

  /* ---------------- REGISTER ---------------- */

  const signup = async (payload) => {
    if (loading) return

    setLoading(true)
    setError(null)
    setStatus(null)

    try {
      const dataPayload = {
        emailAddress: payload.emailAddress,
        password: payload.password,
        confirmPassword: payload.confirmPassword,
        verificationSessionId,
      }
      console.log('Signup payload:', dataPayload)

      const data = await apiSignup(dataPayload)

      if (!data || data.status !== 'success') {
        setStatus(data?.status || 'failed')
        throw new Error(data?.message || 'Signup failed')
      }

      setStatus('success')
      return data
    } catch (err) {
      setStatus('failed')
      setError(err?.response?.data?.message || err.message || 'Signup failed')
      throw err
    } finally {
      setLoading(false)
    }
  }

  /* ---------------- FORGOT PASSWORD ---------------- */

  const forgotPassword = async (payload) => {
    if (loading) return

    setLoading(true)
    setError(null)
    setStatus(null)

    try {
      const data = await apiForgotPassword(payload)

      if (!data || data.status !== 'success') {
        setStatus(data?.status || 'failed')
        throw new Error(data?.message || 'Request failed')
      }

      setStatus('success')
      return data
    } catch (err) {
      setStatus('failed')
      setError(err?.response?.data?.message || err.message || 'Request failed')
      throw err
    } finally {
      setLoading(false)
    }
  }

  /* ---------------- RESET PASSWORD ---------------- */

  const resetPassword = async (payload) => {
    if (loading) return

    setLoading(true)
    setError(null)
    setStatus(null)

    try {
      const data = await apiResetPassword(payload)

      if (!data || data.status !== 'success') {
        setStatus(data?.status || 'failed')
        throw new Error(data?.message || 'Reset failed')
      }

      setStatus('success')
      return data
    } catch (err) {
      setStatus('failed')
      setError(err?.response?.data?.message || err.message || 'Reset failed')
      throw err
    } finally {
      setLoading(false)
    }
  }

  /* ---------------- CHANGE PASSWORD ---------------- */

  const changePassword = async (payload) => {
    if (loading) return

    setLoading(true)
    setError(null)
    setStatus(null)

    try {
      const data = await apiChangePassword(payload)

      if (!data || data.status !== 'success') {
        setStatus(data?.status || 'failed')
        throw new Error(data?.message || 'Change failed')
      }

      setStatus('success')
      return data
    } catch (err) {
      setStatus('failed')
      setError(err?.response?.data?.message || err.message || 'Change failed')
      throw err
    } finally {
      setLoading(false)
    }
  }

  /* ---------------- REFRESH TOKEN ---------------- */

  const refreshToken = async (payload) => {
    if (loading) return

    setLoading(true)
    setError(null)
    setStatus(null)

    try {
      const data = await apiRefreshToken(payload)

      if (!data || data.status !== 'success' || !data.accessToken) {
        setStatus(data?.status || 'failed')
        throw new Error(data?.message || 'Token refresh failed')
      }

      finalizeLogin(data.user ?? user, {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      })

      setStatus('success')
      return data
    } catch (err) {
      setStatus('failed')
      setError(err?.response?.data?.message || err.message || 'Token refresh failed')
      throw err
    } finally {
      setLoading(false)
    }
  }

  /* ---------------- LOGOUT ---------------- */

  const logout = () => {
    finalizeLogout()
    setStatus('success')
  }

  return {
    user,
    isAuthenticated,
    isAuthReady,
    verificationSessionId,
    loginSessionId,

    loading,
    error,
    status,
    clearError,
    clearStatus,

    login,
    verifyOtp,
    signup,
    forgotPassword,
    resetPassword,
    changePassword,
    refreshToken,
    logout,
  }
}
