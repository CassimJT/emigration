import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const isDev = import.meta.env.DEV

  // Dev defaults
  const [user, setUser] = useState(
    isDev ? { id: 'dev-123', name: 'Dev User', role: 'admin' } : null
  )
  const [token, setToken] = useState(isDev ? 'dev-token-123' : null)

  /**
   * Update user and token after login
   * @param {Object} newUser - User object returned from API
   * @param {string} newToken - Token string returned from API
   */
  const login = (newUser, newToken) => {
    if (!isDev) {
      setUser(newUser)
      setToken(newToken)
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
  }

  const value = {
    user,
    token,
    isAuthenticated: Boolean(user),
    login,   // now expects (user, token) in prod
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
