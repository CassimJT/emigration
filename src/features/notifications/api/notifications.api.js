import api from '@/lib/axios'

// Fetch all notifications for the logged-in user
export async function fetchNotifications() {
  try {
    const { data } = await api.get('/notifications')
    return data
  } catch (error) {
    return handleError(error)
  }
}

// Mark a single notification as read
export async function markAsRead(notificationId) {
  try {
    const { data } = await api.post(`/notifications/${notificationId}/read`)
    return data
  } catch (error) {
    return handleError(error)
  }
}

// Mark all notifications as read
export async function markAllAsRead() {
  try {
    const { data } = await api.post('/notifications/read-all')
    return data
  } catch (error) {
    return handleError(error)
  }
}

// Shared error handler
function handleError(error) {
  if (error.response) {
    return error.response.data
  } else if (error.request) {
    return { status: 500, statusText: 'Failed', message: 'No response from server' }
  } else {
    return { status: 500, statusText: 'Failed', message: error.message }
  }
}
