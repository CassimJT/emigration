// features/notifications/components/NotificationsContent.jsx
'use client' // ← important for client-side hook usage

import { useNotifications } from '../hooks/useNotifications'
import NotificationList from './NotificationList'
import { Bell } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'

export default function NotificationsContent() {
  // Get real data + states from your existing hook
  const {
    notifications,
    loading,
    error,
    // loadNotifications,     // optional - use if you want manual refresh button later
  } = useNotifications()

  // Loading state – shows skeleton placeholders
  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton
            key={i}
            className="h-20 w-full rounded-lg"
          />
        ))}
      </div>
    )
  }

  // Error state – nice user-friendly message
  if (error) {
    return (
      <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-8 text-center">
        <p className="text-destructive font-medium">
          Failed to load notifications
        </p>
        <p className="text-muted-foreground mt-2 text-sm">
          {error.message || 'Please try again later'}
        </p>
      </div>
    )
  }

  // Empty state – no notifications
  if (notifications.length === 0) {
    return (
      <div className="py-20 sm:py-24 text-center">
        <Bell className="mx-auto h-14 w-14 sm:h-16 sm:w-16 text-muted-foreground/40" />
        <h3 className="mt-6 text-lg font-medium sm:text-xl text-foreground">
          You're all caught up!
        </h3>
        <p className="mt-3 text-sm text-muted-foreground">
          New notifications will appear here when you receive them
        </p>
      </div>
    )
  }

  // Success state – show real notifications list
  return (
    <div className="rounded-xl border bg-card shadow-sm">
      <NotificationList notifications={notifications} />
    </div>
  )
}