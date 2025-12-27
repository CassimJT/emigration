// src/hooks/useAuth.js
import { useAuthContext } from '../providers/AuthProvider'

export function useAuth() {
  const context = useAuthContext()

  return {
    user: context?.user ?? null,
    isAuthenticated: context?.isAuthenticated ?? false,
    role: context?.user?.role ?? null,
    login: context?.login,
    logout: context?.logout,
  }
}
