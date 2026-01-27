// src/hooks/useAuth.js
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

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const clearError = () => setError(null)

  /* ---------------- LOGIN (credentials + verificationSessionId → OTP) ---------------- */

  const login = async ({ emailAddress, password }) => {
    setLoading(true)
    setError(null)

    const payload = {
      emailAddress,
      password,
      verificationSessionId,
    }

    const data = await apiLogin(payload)

    if (data?.status === 'success') {
      startLoginSession(data.loginSessionId)
    } else {
      setError(data?.message || 'Login failed')
    }

    setLoading(false)
    return data
  }

  /* ---------------- VERIFY OTP (loginSessionId + otp → tokens) ---------------- */

  const verifyOtp = async ({ otp }) => {
    setLoading(true)
    setError(null)

    const payload = {
      loginSessionId,
      otp,
    }

    const data = await apiVerifyOtp(payload)

    if (data?.status === 'success') {
      finalizeLogin(data.user, {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      })
      clearLoginSession()
    } else {
      setError(data?.message || 'OTP verification failed')
    }

    setLoading(false)
    return data
  }

  /* ---------------- REGISTER ---------------- */

  const signup = async (payload) => {
    setLoading(true)
    setError(null)

    const data = await apiSignup(payload)

    if (data?.status !== 'success') {
      setError(data?.message || 'Signup failed')
    }

    setLoading(false)
    return data
  }

  /* ---------------- FORGOT PASSWORD ---------------- */

  const forgotPassword = async (payload) => {
    setLoading(true)
    setError(null)

    const data = await apiForgotPassword(payload)

    if (data?.status !== 'success') {
      setError(data?.message || 'Request failed')
    }

    setLoading(false)
    return data
  }

  /* ---------------- RESET PASSWORD ---------------- */

  const resetPassword = async (payload) => {
    setLoading(true)
    setError(null)

    const data = await apiResetPassword(payload)

    if (data?.status !== 'success') {
      setError(data?.message || 'Reset failed')
    }

    setLoading(false)
    return data
  }

  /* ---------------- CHANGE PASSWORD ---------------- */

  const changePassword = async (payload) => {
    setLoading(true)
    setError(null)

    const data = await apiChangePassword(payload)

    if (data?.status !== 'success') {
      setError(data?.message || 'Change failed')
    }

    setLoading(false)
    return data
  }

  /* ---------------- REFRESH TOKEN ---------------- */

  const refreshToken = async (payload) => {
    setLoading(true)
    setError(null)

    const data = await apiRefreshToken(payload)

    if (data?.status === 'success') {
      finalizeLogin(user, {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      })
    } else {
      setError(data?.message || 'Token refresh failed')
    }

    setLoading(false)
    return data
  }

  /* ---------------- LOGOUT ---------------- */

  const logout = () => {
    finalizeLogout()
  }

  return {
    user,
    isAuthenticated,
    verificationSessionId,
    loginSessionId,

    loading,
    error,
    clearError,

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
