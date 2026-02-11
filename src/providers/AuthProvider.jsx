import { createContext, useContext, useEffect, useState } from 'react'
import {
  setAuthSession,
  clearAuthSession,
  getStoredUser,
  setTempSession,
  getTempSession,
  clearTempSession,
  setDashboardView,
} from '@/lib/storage'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const isDev = import.meta.env.VITE_DEV 

  const [isAuthReady, setIsAuthReady] = useState(false)
  const [user, setUser] = useState(null)
  const [verificationSessionId, setVerificationSessionId] = useState(null)
  const [loginSessionId, setLoginSessionId] = useState(null)
  const [message, setMessage] = useState(null)

  /* ---------------- Hydrate auth state ---------------- */
  useEffect(() => {
  const hydrateAuthState = () => {
    try {
      const storedUser = isDev === 'true'
        ? { id: 'dev-123', name: 'Dev User', role: 'admin', message: "sent to dev@example.com" }
        : getStoredUser();

      const storedTemp = getTempSession();

      if (storedUser) setUser(storedUser);
      if (storedTemp?.verificationSessionId) setVerificationSessionId(storedTemp.verificationSessionId);
      if (storedTemp?.loginSessionId) setLoginSessionId(storedTemp.loginSessionId);
    } catch (err) {
      console.error("Auth hydration failed:", err);
    } finally {
      setIsAuthReady(true);  
    }
  };

  hydrateAuthState();
}, [isDev]);

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

  const clearCurrentDashboardView = () => {
    setDashboardView(null)
  }

  const logout = () => {
    clearAuthSession()
    clearTempSession()
    clearCurrentDashboardView()
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

        message,
        setMessage, 

        verificationSessionId,
        startIdentitySession,
        clearIdentitySession,

        loginSessionId,
        startLoginSession,
        clearLoginSession,

        login,
        logout,
        finalizeLogin: login,
        finalizeLogout: logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  return useContext(AuthContext)
}
