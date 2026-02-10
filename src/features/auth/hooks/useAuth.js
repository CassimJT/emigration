import { useState, useEffect } from 'react'
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

    //message state from context
    message,
    setMessage, 

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
        identitySessionId: verificationSessionId,
      }

      const data = await apiLogin(payload)
      if (!data || data.status !== 'success' || !data.loginSessionId) {
        throw new Error(data?.message || 'Login failed')
      }
      //setting the message
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
      return
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
  const logout = () => {
    finalizeLogout() // call AuthProvider logout
    setStatus('success')
  }

  return {
    user,
    isAuthenticated,
    isAuthReady,
    verificationSessionId,
    loginSessionId,
    message,
    setMessage,

    loading,
    error,
    status,
    clearError,
    clearStatus,

    login,
    verifyOtp,
    signup: apiSignup,
    forgotPassword: apiForgotPassword,
    resetPassword: apiResetPassword,
    changePassword: apiChangePassword,
    refreshToken: apiRefreshToken,
    logout, 
  }
}
