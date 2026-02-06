import { useState, useEffect, useMemo } from 'react'
import { PGARRY } from '@/utils/constants'
import { fetchApplicationStatus, userProfile } from '@/features/dashboard/api/dashboard.api'


export function useDashboard() {
  const [profile, setProfile] = useState(null)
  const [applications, setApplications] = useState(null)
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


//For fetching data from the backend via api methods calls
  const loadDashboard = async () => {
    setLoading(true)
    setError(null)

    try {
      const userProfileData = await userProfile()
      const applicationData = await fetchApplicationStatus()

      setProfile(userProfileData)
      setApplications(applicationData)
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


  return {
    activeView,
    setActiveView,
    profile,
    applications,
    loading,
    error,
    loadDashboard,
    progress,
    mainStage,
    pgarry,
  }
}
