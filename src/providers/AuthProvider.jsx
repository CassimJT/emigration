import { createContext, useContext, useState } from 'react'
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
  const isDev = import.meta.env.DEV

  const storedTemp = getTempSession()

  const [user, setUser] = useState(
    isDev ? { id: 'dev-123', name: 'Dev User', role: 'admin' } : getStoredUser()
  )

  const [verificationSessionId, setVerificationSessionId] = useState(
    storedTemp?.verificationSessionId || null
  )

  const [loginSessionId, setLoginSessionId] = useState(
    storedTemp?.loginSessionId || null
  )

  /* ---------------- Identity phase ---------------- */

  const startIdentitySession = (sessionId) => {
    setVerificationSessionId(sessionId)
    setTempSession({ verificationSessionId: sessionId })
  }

  const clearIdentitySession = () => {
    setVerificationSessionId(null)
    setTempSession({})
  }

  /* ---------------- Login / OTP phase ---------------- */

  const startLoginSession = (sessionId) => {
    setLoginSessionId(sessionId)
    setTempSession({
      verificationSessionId,
      loginSessionId: sessionId,
    })
  }

  const clearLoginSession = () => {
    setLoginSessionId(null)
    setTempSession({ verificationSessionId })
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
