import React from "react"
import { getApplicationStatus, getNotifications, getRecentActivities } from "../api/dashboard.api"



export function useDashboardOverview() {
    const [applications, setApplications] = React.useState(null)
    const [recentActivities, setRecentActivities] = React.useState([])
    const [notifications, setNotifications] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(null)
    const loadOverview = React.useCallback(async () => {
        setLoading(true)
        setError(null)
        try {
        const [appData, activitiesData, notifData] = await Promise.all([
            getApplicationStatus(),
            getRecentActivities(),
            getNotifications(),
        ])
        setApplications(appData)
        setRecentActivities(activitiesData)
        setNotifications(notifData)
        } catch (err) {
        console.error('Dashboard overview load error:', err)
        setError(err?.message || 'Failed to load dashboard data')
        } finally {
        setLoading(false)
        }
    }, [])

    React.useEffect(() => {
        loadOverview()
    }, [loadOverview])

    return {
        applications,
        recentActivities,
        notifications,
        loading,
        error,
        refreshOverview: loadOverview,
    }
}