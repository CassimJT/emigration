import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const isDev = import.meta.env.DEV

  const [user, setUser] = useState(
    isDev ? { id: 'dev-123', name: 'Dev User', role: 'admin' } : null
  )
  const [token, setToken] = useState(isDev ? 'dev-token-123' : null)

  const login = async (credentials) => {
    // orchestrated by feature hook
  }

  const logout = () => {
    setUser(null)
    setToken(null)
  }

  const value = {
    user,
    token,
    isAuthenticated: Boolean(user),
    login,
    logout,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  return useContext(AuthContext)
}
