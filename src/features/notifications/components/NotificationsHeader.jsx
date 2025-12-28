import { Button } from "@/components/ui/button"
import { CheckCheck } from "lucide-react"
import { useNotifications } from '../hooks/useNotifications'

export default function NotificationsHeader() {
  // Get real data and actions from the hook
  const {
    notifications = [],           // Real array from API
    loading,                      // Not used here, but available
    readAllNotifications          // Function to mark all as read
  } = useNotifications()

  // Calculate unread count dynamically from real data
  const unreadCount = notifications.filter(n => !n.read).length
  const totalCount = notifications.length

  // Handle "Mark all as read" click
  const handleMarkAll = () => {
    if (unreadCount > 0) {
      readAllNotifications()  // Calls the real API via hook
    }
  }

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Left side - title + real stats */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Notifications
        </h1>
        <p className="text-muted-foreground mt-1.5">
          {loading ? '...' : `${unreadCount} unread • ${totalCount} total`}
        </p>
      </div>

      {/* Right side - action button (only when there are unread) */}
      {unreadCount > 0 && (
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={handleMarkAll}
          disabled={loading} // Disable while loading to prevent spam
        >
          <CheckCheck className="h-4 w-4" />
          Mark all as read
        </Button>
      )}
    </div>
  )
}