import { createContext, useContext, useState } from 'react'
import {
  setAuthSession,
  clearAuthSession,
  getStoredUser,
  setTempSession,
  getTempSession,
  clearTempSession,
} from '@/lib/storage'

export function AuthProvider({ children }) {
  const storedTemp = getTempSession()

  const [user, setUser] = useState(getStoredUser())
  const [verificationSessionId, setVerificationSessionId] = useState(
    storedTemp?.verificationSessionId || null
  )
  const [loginSessionId, setLoginSessionId] = useState(
    storedTemp?.loginSessionId || null
  )

  const startIdentitySession = (sessionId) => {
    setVerificationSessionId(sessionId)
    setTempSession((prev) => ({
      ...prev,
      verificationSessionId: sessionId,
    }))
  }

  const clearIdentitySession = () => {
    setVerificationSessionId(null)
    setTempSession((prev) => ({
      ...prev,
      verificationSessionId: null,
    }))
  }

  const startLoginSession = (sessionId) => {
    setLoginSessionId(sessionId)
    setTempSession((prev) => ({
      ...prev,
      loginSessionId: sessionId,
    }))
  }

  const clearLoginSession = () => {
    setLoginSessionId(null)
    setTempSession((prev) => ({
      ...prev,
      loginSessionId: null,
    }))
  }

  const login = (userData, tokens) => {
    setAuthSession({
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      user: userData,
    })
    setUser(userData)
    clearTempSession()
  }

  const logout = () => {
    clearAuthSession()
    clearTempSession()
    setUser(null)
    setVerificationSessionId(null)
    setLoginSessionId(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),

        verificationSessionId,
        startIdentitySession,
        clearIdentitySession,

        loginSessionId,
        startLoginSession,
        clearLoginSession,

        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
