import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { Loader2 } from 'lucide-react'

export function RoleRoute({ allowedRoles }) {
  const { isAuthenticated, role, isAuthReaday } = useAuth()

  if (!isAuthReaday) return <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin" /> Loading...
    </div>
  if (!isAuthenticated) return <Navigate to="/" replace />
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />
  }

  return <Outlet />
}
