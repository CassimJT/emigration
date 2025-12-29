import { useState } from 'react'
import { Bell } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useNotifications } from '../hooks/useNotifications'
import NotificationList from './NotificationList'

export default function NotificationBell() {
  const { 
    notifications = [], 
    loading, 
    readAllNotifications 
  } = useNotifications()

  const [open, setOpen] = useState(false)

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <Popover open={open} onOpenChange={setOpen}>
      {/* Bell trigger with badge */}
      <PopoverTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative"
        >
          <Bell className="h-5 w-5" />
          
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="
                absolute -top-1 -right-1 
                h-5 min-w-[20px] px-1.5 
                text-xs font-bold 
                rounded-full flex items-center justify-center
              "
            >
              {unreadCount > 99 ? '99+' : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>

      {/* Popover content */}
      <PopoverContent 
        align="end"
        className="w-96 p-0 shadow-xl border-0"
        sideOffset={8}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b">
          <h4 className="font-semibold text-base">Notifications</h4>
          
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-xs text-primary hover:text-primary/80"
              onClick={() => {
                readAllNotifications()
                // Optional: keep popover open or close it
              }}
            >
              Mark all as read
            </Button>
          )}
        </div>

        {/* Main content area */}
        <div className="max-h-[70vh] overflow-y-auto">
          {loading ? (
            <div className="p-8 text-center text-muted-foreground">
              Loading notifications...
            </div>
          ) : notifications.length === 0 ? (
            <div className="py-12 px-6 text-center text-muted-foreground">
              <Bell className="mx-auto h-12 w-12 opacity-40 mb-4" />
              <p className="text-sm font-medium">No new notifications</p>
              <p className="text-xs mt-2">
                When you get notifications, they'll appear here
              </p>
            </div>
          ) : (
            <NotificationList notifications={notifications} />
          )}
        </div>

        {/* Footer */}
        <div className="border-t px-5 py-3 text-center">
          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-primary hover:text-primary/80"
            onClick={() => {
              setOpen(false)
              // Add navigation to full page later if needed
              // e.g. router.push('/notifications')
            }}
          >
            View all notifications →
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}