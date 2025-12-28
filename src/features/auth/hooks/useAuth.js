// src/hooks/useAuth.js
import { useAuthContext } from '@/providers/AuthProvider'
import { login as apiLogin, signup as apiSignup, verifyOtp as apiVerifyOtp, forgotPassword as apiForgotPassword } from '../api/auth.api'

export function useAuth() {
  const { user, token, isAuthenticated, login: setLogin, logout: setLogout } = useAuthContext()

  const login = async (credentials) => {
    const data = await apiLogin(credentials)
    if (data.status === 200) {
      setLogin(data.user, data.token) 
    }
    return data
  }

  const signup = async (payload) => {
    const data = await apiSignup(payload)
    return data
  }

  const verifyOtp = async (payload) => {
    const data = await apiVerifyOtp(payload)
    return data
  }

  const forgotPassword = async (payload) => {
    const data = await apiForgotPassword(payload)
    return data
  }

  const logout = () => {
    setLogout()
  }

  return {
    user,
    token,
    isAuthenticated,
    login,
    signup,
    verifyOtp,
    forgotPassword,
    logout,
  }
}
