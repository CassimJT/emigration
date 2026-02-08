import { useDashboardOverview } from './useDashboardOverview'
import { useUserManagement } from './useUserManagement'
import { useUserProfile } from './useUserProfile'
import { useDashboardNavigation } from './useDashboardNavigation'
import { useLoanSimulation } from './useLoanSimulation'   
import { useState, useEffect, useMemo } from 'react'
import { PGARRY } from '@/utils/constants'
import { 
  userProfile, 
  getRecentActivities, 
  getNotifications, 
  getApplicationStatus,
  getAllUsers as getAllUsersAPI,
  updateUser as updateUserAPI,
  deleteUser as deleteUserAPI,
  updateUserProfile as updateUserProfileAPI,
  promoteUser as promoteUserAPI
} from '@/features/dashboard/api/dashboard.api'

export function useDashboard() {
  const overview = useDashboardOverview()
  const userMgmt = useUserManagement()
  const profile = useUserProfile()
  const navigation = useDashboardNavigation()
  const simulation = useLoanSimulation()

  //promote user
  const promoteUser = async (userId) => {
    try {
      await promoteUserAPI(userId)
      await loadDashboard()
    } catch (err) {
      console.error('Promote user error:', err)
      setError(err?.message || 'Failed to promote user')
    }
  }

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