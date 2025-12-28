// features/notifications/components/NotificationList.jsx
import NotificationItem from "./NotificationItem"
import { useNotifications } from '../hooks/useNotifications'

export default function NotificationList() {
  // Get real notifications directly from the shared hook
  const { notifications = [] } = useNotifications()

  // If no notifications, return nothing (empty state is handled by NotificationsContent)
  if (notifications.length === 0) {
    return null
  }

  return (
    <div className="divide-y divide-border">
      {notifications.map((item) => (
        <NotificationItem
          key={item.id}
          id={item.id}                  // ← important for marking as read
          message={item.message || item.content || "New notification"}
          time={item.time || new Date(item.createdAt).toLocaleString([], {
            dateStyle: 'medium',
            timeStyle: 'short'
          })}
          isUnread={!item.read}         // ← map 'read' to 'isUnread' (your hook uses 'read')
          avatarUrl={item.sender?.avatar}
          senderInitial={item.sender?.name?.[0] || '?'}
        />
      ))}
    </div>
  )
}