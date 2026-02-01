import { createContext, useContext, useEffect, useState } from 'react'
import {
  setAuthSession,
  clearAuthSession,
  getStoredUser,
  setTempSession,
  getTempSession,
  clearTempSession,
} from '@/lib/storage'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [isAuthReady, setIsAuthReady] = useState(false)

  const [user, setUser] = useState(null)
  const [verificationSessionId, setVerificationSessionId] = useState(null)
  const [loginSessionId, setLoginSessionId] = useState(null)

  // Hydrate from storage ONCE
  useEffect(() => {
    const storedUser = getStoredUser()
    const storedTemp = getTempSession()

    setUser(storedUser || null)
    setVerificationSessionId(storedTemp?.verificationSessionId || null)
    setLoginSessionId(storedTemp?.loginSessionId || null)

    setIsAuthReady(true)
  }, [])

  /* ---------------- Identity phase ---------------- */

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

  /* ---------------- Login / OTP phase ---------------- */

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

  /* ---------------- Authenticated phase ---------------- */

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
        // Readiness
        isAuthReady,

        // Authenticated state
        user,
        isAuthenticated: Boolean(user),

        // Identity flow
        verificationSessionId,
        startIdentitySession,
        clearIdentitySession,

        // Login/OTP flow
        loginSessionId,
        startLoginSession,
        clearLoginSession,

        // Final auth
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  return useContext(AuthContext)
}
