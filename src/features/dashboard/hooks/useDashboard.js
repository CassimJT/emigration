import { useState, useEffect, useMemo } from 'react'
import { PGARRY } from '@/utils/constants'
import { 
  userProfile, 
  getRecentActivities, 
  getNotifications, 
  getApplicationStatus,
  getAllUsers,
  updateUser as updateUserAPI,
  deleteUser as deleteUserAPI,
} from '@/features/dashboard/api/dashboard.api'

export function useDashboard() {
  const [profile, setProfile] = useState(null)
  const [users, setUsers] = useState(null)
  const [applications, setApplications] = useState(null)
  const [recentActivities, setRecentActivities] = useState([])
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  
  // for loan processing simulation
  const [progress, setProgress] = useState(0)
  const [mainStage, setMainStage] = useState(0)
  const pgarry = useMemo(() => PGARRY, [])

  // for navigation tracking 
  const [activeView, setActiveView] = useState(() => {
    return localStorage.getItem('dashboardView') || 'overview'
  })

  useEffect(() => {
    localStorage.setItem('dashboardView', activeView)
  }, [activeView])

  // for loan processing simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 20 : 100))
      for (let i = 0; i < 100; i += 20) {
        if (progress === i) {
          let stage = mainStage + 1
          setMainStage(stage)
        }
      }
    }, 2000)
    return () => clearInterval(interval)
  }, [progress, mainStage])

  // For fetching data from the backend via API methods calls
  const loadDashboard = async () => {
    setLoading(true)
    setError(null)

    try {
      const allUsersData = await getAllUsers() 
      const userProfileData = await userProfile()
      const applicationData = await getApplicationStatus()
      const activitiesData = await getRecentActivities()
      const notificationsData = await getNotifications()

      setUsers(allUsersData)
      setProfile(userProfileData)
      setApplications(applicationData)
      setRecentActivities(activitiesData)
      setNotifications(notificationsData)
    } catch (err) {
      console.error('Dashboard load error:', err)
      setError(err?.message || 'Failed to load dashboard')
    } finally {
      setLoading(false)
    }
  }

  // Load dashboard data on mount
  useEffect(() => {
    loadDashboard()
  }, [])

  const updateUser = async (userId, userData) => {
    try {
      await updateUserAPI(userId, userData)
      await loadDashboard() 
    } catch (err) {
      console.error('Update user error:', err)
      setError(err?.message || 'Failed to update user')
    }
  }

  const deleteUser = async (userId) => {
    try {
      await deleteUserAPI(userId)
      await loadDashboard() 
    } catch (err) {
      console.error('Delete user error:', err)
      setError(err?.message || 'Failed to delete user')
    }
  }

  return {
    users,
    profile,
    updateUser,
    deleteUser,

    activeView,
    setActiveView,

    applications,
    recentActivities,
    notifications,
    
    loading,
    error,
    progress,
    mainStage,
    pgarry,
    
  }
}
