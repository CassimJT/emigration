import { Outlet, useNavigate } from 'react-router-dom'
import { Menu } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'
import DashboardNavBar from '../components/DashboardNavBar'
import PaymentPage from '@/features/payments/pages/PaymentPage'
import NotificationsPage from '@/features/notifications/pages/NotificationsPage'
import PassportApplicationPage from '@/features/passport/pages/PassportApplicationPage'
import DashboardOverview from '../components/DashboardOverview'
import { useDashboard } from '../hooks/useDashboard'
import { useAuth } from '@/features/auth/hooks/useAuth'

/*
 * Main Container Page for the Dashboard Feature.
 * Implements a responsive layout with a sidebar navigation (collapsible on mobile)
 * and a dynamic content area that renders different views based on user selection.
 * Handles user authentication context and logout functionality.
 */
function DashboardPage() {
  const { activeView, setActiveView } = useDashboard()
  const { user, logout } = useAuth()
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const navigate = useNavigate()
  
  const handleSignOut = () => {
    logout()
    navigate('/login')
  }

  const handleNavSelect = (view) => {
    setActiveView(view)
    setIsMobileOpen(false)
  }
  
  const renderContent = () => {
    switch(activeView) {
      case 'overview': return <DashboardOverview />;
      case 'Notifications': return <NotificationsPage />;
      case 'Payments': return <PaymentPage />;
      case 'Passport Apply': return <PassportApplicationPage />;
      case 'How to Apply': return <div className="p-6"><h1 className="text-2xl font-bold">How to Apply</h1><p>Coming soon...</p></div>;
      case 'FAQs': return <div className="p-6"><h1 className="text-2xl font-bold">FAQs</h1><p>Coming soon...</p></div>;
      case 'Contact Support': return <div className="p-6"><h1 className="text-2xl font-bold">Contact Support</h1><p>Coming soon...</p></div>;
      case 'Payment History': return <div className="p-6"><h1 className="text-2xl font-bold">Payment History</h1><p>Coming soon...</p></div>;
      default: return <DashboardOverview />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50/30">
      <Outlet />
      
      {/* Desktop Sidebar */}
      <DashboardNavBar 
        className="hidden md:flex fixed left-0 top-0 h-screen z-30" 
        onSelect={(item) => setActiveView(item)} 
        activeView={activeView} 
        onSignOut={handleSignOut}
        user={user}
      />

      {/* Main Layout */}
      <div className="flex-1 flex flex-col min-h-screen md:ml-64 transition-all duration-300 ease-in-out">
        
        {/* Mobile Header */}
        <header className="md:hidden sticky top-0 z-40 bg-white border-b border-gray-200 px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-64 border-r-0">
                <SheetTitle className="sr-only">Mobile Navigation Menu</SheetTitle>
                <DashboardNavBar 
                  className="h-full w-full"
                  onSelect={handleNavSelect} 
                  activeView={activeView} 
                  onSignOut={handleSignOut}
                  user={user}
                />
              </SheetContent>
            </Sheet>
            <span className="font-semibold text-lg text-gray-900">Dashboard</span>
          </div>
        </header>

        {/*Dashboard Content Area */}
        <main className="flex-1 overflow-auto p-4 md:p-8 w-full max-w-7xl mx-auto">
          {renderContent()}
        </main>
      </div> 
    </div>
  )
}

export default DashboardPage
