import { useDashboardOverview } from './useDashboardOverview'
import { useUserManagement } from './useUserManagement'
import { useUserProfile } from './useUserProfile'
import { useDashboardNavigation } from './useDashboardNavigation'
import { useLoanSimulation } from './useLoanSimulation'   

export function useDashboard() {
  const overview = useDashboardOverview()
  const userMgmt = useUserManagement()
  const profile = useUserProfile()
  const navigation = useDashboardNavigation()
  const simulation = useLoanSimulation()

  return {
    // Overview data
    applications: overview.applications,
    recentActivities: overview.recentActivities,
    notifications: overview.notifications,
    loading: overview.loading,
    error: overview.error,
    refreshOverview: overview.refreshOverview,

    // User management
    users: userMgmt.users,
    promoteUser : userMgmt.promoteUser,
    loadingUsers: userMgmt.loadingUsers,
    usersError: userMgmt.usersError,
    getAllUsers: userMgmt.getAllUsers,
    updateUser: userMgmt.updateUser,
    deleteUser: userMgmt.deleteUser,

    // Current user profile
    profile: profile.profile,
    profileLoading: profile.profileLoading,
    profileError: profile.profileError,
    fetchProfile: profile.fetchProfile,
    updateUserProfile: profile.updateUserProfile,

    // Navigation
    activeView: navigation.activeView,
    setActiveView: navigation.setActiveView,

    progress: simulation.progress,
    mainStage: simulation.mainStage,
    pgarry: simulation.pgarry,
  }
}