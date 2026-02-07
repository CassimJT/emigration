import React from 'react'
import NotificationsHeader from '../components/NotificationsHeader'
import NotificationsContent from '../components/NotificationsContent'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { Navigate } from 'react-router-dom'


export function NotificationsPage() {
  const { user } = useAuth()
 
  const role = user?.role || ' '

  if (role !== 'client' && role !== 'admin' && role !== 'officer'&& role !== 'superadmin') {
    return (
      <Navigate to="*" replace />
    );
  }
  return (
    <div className="container mx-auto max-w-4xl px-4 py-6 sm:py-8 md:py-10">

      

      <NotificationsHeader />

      
      
      <div className="mt-6 sm:mt-8">
        <NotificationsContent />
      </div>
    </div>
  )

}

export default NotificationsPage;