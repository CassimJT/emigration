import { useState } from 'react'
import {
  fetchNotifications,
  markAsRead,
  markAllAsRead,
} from '../api/notifications.api'

export function useNotifications() {
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Load all notifications
  const loadNotifications = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchNotifications()
      setNotifications(data || [])
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  // Mark a single notification as read and update state
  const readNotification = async (notificationId) => {
    try {
      const data = await markAsRead(notificationId)
      setNotifications((prev) =>
        prev.map((n) =>
          n.id === notificationId ? { ...n, read: true } : n
        )
      )
      return data
    } catch (err) {
      setError(err)
    }
  }

  // Optional: mark all as read
  const readAllNotifications = async () => {
    try {
      const data = await markAllAsRead()
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
      return data
    } catch (err) {
      setError(err)
    }
  }

  return {
    notifications,
    loading,
    error,
    loadNotifications,
    readNotification,
    readAllNotifications,
  }
}
