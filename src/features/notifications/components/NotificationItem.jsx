// features/notifications/components/NotificationItem.jsx
import { useNotifications } from '../hooks/useNotifications'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

export default function NotificationItem(props) {
  const { readNotification } = useNotifications()

  const {
    id,                     // ← required for marking as read
    message,
    time,
    read = false,           // ← real field from your API/hook (default false)
    avatarUrl,
    senderInitial = "?",
    createdAt               // optional fallback if time is not provided
  } = props

  // Invert 'read' to 'isUnread' for UI consistency
  const isUnread = !read

  const handleClick = () => {
    if (isUnread && id) {
      readNotification(id)  // ← calls the real API via hook
    }
    // Optional: add navigation later
    // if (props.link) router.push(props.link)
  }

  // Format time dynamically if createdAt is provided
  const displayTime = time || (createdAt 
    ? new Date(createdAt).toLocaleString([], {
        dateStyle: 'medium',
        timeStyle: 'short'
      })
    : 'Just now')

  return (
    <div
      onClick={handleClick}
      className={cn(
        "flex items-start gap-4 px-4 py-3.5 cursor-pointer", // ← makes whole row clickable
        "border-b last:border-b-0",
        isUnread && "bg-primary/5",
        "hover:bg-muted/40 transition-colors"
      )}
    >
      {/* Avatar */}
      <Avatar className="h-10 w-10">
        {avatarUrl ? (
          <AvatarImage src={avatarUrl} alt="Sender" />
        ) : (
          <AvatarFallback>{senderInitial}</AvatarFallback>
        )}
      </Avatar>

      {/* Content */}
      <div className="flex-1 min-w-0 space-y-1">
        <p className={cn(
          "text-sm",
          isUnread && "font-medium"
        )}>
          {message || "New notification"} {/* fallback if missing */}
        </p>
        <p className="text-xs text-muted-foreground">
          {displayTime}
        </p>
      </div>

      {/* Unread indicator */}
      {isUnread && (
        <div className="mt-1.5 h-2.5 w-2.5 rounded-full bg-primary flex-shrink-0" />
      )}
    </div>
  )
}