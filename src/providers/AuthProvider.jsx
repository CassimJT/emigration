import { createContext, useContext, useState } from 'react'
import { setAuthSession, clearAuthSession, getStoredUser } from '@/lib/storage'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const isDev = import.meta.env.DEV

  const [user, setUser] = useState(
    isDev ? { id: 'dev-123', name: 'Dev User', role: 'admin' } : getStoredUser()
  )

  const login = (userData, tokens) => {
    setAuthSession({
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      user: userData,
    })
    setUser(userData)
  }

  const logout = () => {
    clearAuthSession()
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
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
