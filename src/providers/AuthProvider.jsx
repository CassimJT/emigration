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
  const isDev = import.meta.env.DEV

  const [isAuthReady, setIsAuthReady] = useState(false)

  const [user, setUser] = useState(null)
  const [verificationSessionId, setVerificationSessionId] = useState(null)
  const [loginSessionId, setLoginSessionId] = useState(null)
  const [message, setMessage] = useState(null)

  /* ---------------- Hydrate auth state ---------------- */
  useEffect(() => {
    const storedUser = !isDev
      ? { id: 'dev-123', name: 'Dev User', role: 'admin', message:" sent to dev@example.com" }
      : getStoredUser()

    const storedTemp = getTempSession()

    if (storedUser) setUser(storedUser)
    if (storedTemp?.verificationSessionId)
      setVerificationSessionId(storedTemp.verificationSessionId)
    if (storedTemp?.loginSessionId)
      setLoginSessionId(storedTemp.loginSessionId)
    if (storedTemp?.message)
      setMessage(storedTemp.message)

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

  const startLoginSession = (sessionId, msg) => {
    setLoginSessionId(sessionId)
    setMessage(msg)
    setTempSession({
      verificationSessionId,
      loginSessionId: sessionId,
      message: msg
    })
  }

  const clearLoginSession = () => {
    setLoginSessionId(null)
    setMessage(null)
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

        message,

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
