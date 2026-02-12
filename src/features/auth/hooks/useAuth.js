import { useState, useEffect } from 'react'
import { useAuthContext } from '@/providers/AuthProvider'
import {
  login as apiLogin,
  signup as apiSignup,
  verifyOtp as apiVerifyOtp,
  forgotPassword as apiForgotPassword,
  resetPassword as apiResetPassword,
  changePassword as apiChangePassword,
  logout as apiLogout,
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

  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isAuthReady, setIsAuthReady] = useState(false)
  const [message, setMessage] = useState(null)
  
  // Mark auth as ready after initial render
  useEffect(() => {
    setIsAuthReady(true)
  }, [])

  const clearError = () => setError(null)
  const clearStatus = () => setStatus(null)

  /* ---------------- LOGIN ---------------- */
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
      if (!data || data.status !== 'success' || !data.loginSessionId) {
        throw new Error(data?.message || 'Login failed')
      }
      
      setMessage(data?.message)
      startLoginSession(data.loginSessionId)
      setStatus('success')
      return data
    } catch (err) {
      setStatus('failed')
      setError(err?.message || 'Login failed')
      throw err
    } finally {
      setLoading(false)
    }
  }

  /* ---------------- VERIFY OTP ---------------- */
  const verifyOtp = async ({ otp }) => {
    if (loading) return
    if (!loginSessionId) {
      setStatus('failed')
      setError('No active login session')
      return Promise.reject(new Error('No active login session'))
    }

    setLoading(true)
    setError(null)
    setStatus(null)

    try {
      const payload = { loginSessionId, otp }
      const data = await apiVerifyOtp(payload)

      if (!data || data.status !== 'success' || !data.accessToken) {
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
      setError(err?.message || 'OTP verification failed')
      throw err
    } finally {
      setLoading(false)
    }
  }

  /* ---------------- LOGOUT ---------------- */
  const logout = async () => {
    setLoading(true)
    setError(null)
    setStatus(null)

    try {
      await apiLogout()
      finalizeLogout()
      setStatus('success')
    } catch (err) {
      setError(err?.message || 'Logout failed')
      setStatus('failed')
      console.error('Logout error:', err)
      throw err // Consistency: throw error like other methods
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
        verificationSessionId: verificationSessionId
      }
      const data = await apiSignup(dataPayload)

      if (!data || data.status !== 'success') {
        setStatus(data?.status || 'failed')
        throw new Error(data?.message || 'Signup failed')
      }

      setStatus('success')
      setMessage(data?.message) // Added: set message when available
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
      setMessage(data?.message) // Added: set message when available
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
      setMessage(data?.message) // Added: set message when available
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
      setMessage(data?.message) // Added: set message when available
      return data
    } catch (err) {
      setStatus('failed')
      setError(err?.response?.data?.message || err.message || 'Change failed')
      throw err
    } finally {
      setLoading(false)
    }
  }

  return {
    // State
    user,
    isAuthenticated,
    isAuthReady,
    verificationSessionId,
    loginSessionId,
    loading,
    error,
    status,
    message,

    // Actions
    setMessage,
    clearError,
    clearStatus,
    
    login,
    verifyOtp,
    signup,
    forgotPassword,
    resetPassword,
    changePassword,
    logout,
  }
}