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
  const isDev = import.meta.env.VITE_DEV

  const [isAuthReady, setIsAuthReady] = useState(false)
  const [user, setUser] = useState(null)
  const [verificationSessionId, setVerificationSessionId] = useState(null)
  const [loginSessionId, setLoginSessionId] = useState(null)

  /* ---------------- Hydrate auth state ---------------- */
  useEffect(() => {
  
    const storedUser = isDev === "true" ? { id: 'dev-123', name: 'Dev User', role: 'admin', message:" sent to dev@example.com" }
      : getStoredUser()
    const storedTemp = getTempSession()

    if (storedUser) setUser(storedUser)
    if (storedTemp?.verificationSessionId)
      setVerificationSessionId(storedTemp.verificationSessionId)
    if (storedTemp?.loginSessionId)
      setLoginSessionId(storedTemp.loginSessionId)

    setIsAuthReady(true)
  }, [isDev])

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
        user,
        isAuthenticated: Boolean(user),
        isAuthReady,

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

export function useAuthContext() {
  return useContext(AuthContext)
}
