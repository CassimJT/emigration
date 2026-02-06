import { Outlet, useNavigate } from 'react-router-dom'
import { Menu } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'
import DashboardNavBar from '../components/DashboardNavBar'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { useDashboard } from '../hooks/useDashboard'


function DashboardPage() {
  const { user, logout } = useAuth()
  const {profile} = useDashboard();
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  
  // //temp: Initialize with actual user role but allow frontend-only override
  const [tempRole, setTempRole] = useState(user?.role || 'client'); //temp
  
  const navigate = useNavigate()
  
  const handleSignOut = () => {
    logout()
    navigate('/')
  }

  // Mobile nav selection now just closes the sheet
  const handleNavSelect = () => {
    setIsMobileOpen(false)
  }

  // //temp: Toggle between client and officer for demonstration purposes
  const handleRoleToggle = () => { //temp
    setTempRole(prev => prev === 'officer' ? 'client' : 'officer'); //temp
  }; //temp

  return (
    <div className="flex h-screen bg-gray-50/30">
      
      {/* Desktop Sidebar */}
      <DashboardNavBar 
        className="hidden md:flex fixed left-0 top-0 h-screen z-30" 
        onSignOut={handleSignOut}
        user={user}
        currentRole={tempRole} //temp
        onRoleToggle={handleRoleToggle} //temp
        userProfile={profile} 
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
                  onSignOut={handleSignOut}
                  user={user}
                  currentRole={tempRole} //temp
                  onRoleToggle={handleRoleToggle} //temp
                  userProfile={profile}
                />
              </SheetContent>
            </Sheet>
            <span className="font-semibold text-lg text-gray-900">Dashboard</span>
          </div>
        </header>

        {/*Dashboard Content Area */}
        <main className="flex-1 overflow-auto p-4 md:p-8 w-full max-w-7xl mx-auto">
          {/* //temp: Pass currentRole and profile via Outlet context to child components */}
          <Outlet context={{ currentRole: tempRole, profile }} /> 
        </main>
      </div> 
    </div>
  )
}

export default DashboardPage
