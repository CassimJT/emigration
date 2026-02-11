// src/hooks/useAuth.js
import { useAuthContext } from '../providers/AuthProvider';

export function useAuth() {
  const context = useAuthContext();

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return {
    user: context.user ?? null,
    isAuthenticated: context.isAuthenticated ?? false,
    isAuthReady: context.isAuthReady ?? false,          
    role: context.user?.role ?? null,
    message: context.message,
    setMessage: context.setMessage,
    verificationSessionId: context.verificationSessionId,
    loginSessionId: context.loginSessionId,
    startIdentitySession: context.startIdentitySession,
    clearIdentitySession: context.clearIdentitySession,
    startLoginSession: context.startLoginSession,
    clearLoginSession: context.clearLoginSession,
    login: context.login,                              
    logout: context.logout,
  };
}