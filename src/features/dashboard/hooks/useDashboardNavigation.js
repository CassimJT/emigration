import { useAuth } from "@/hooks/useAuth"
import React from "react"

export function useDashboardNavigation() {
    const { isAuthenticated} = useAuth()
    const [activeView, setActiveView] = React.useState(() => {
        return localStorage.getItem('dashboardView') || 'overview'
    })

        React.useEffect(() => {
        localStorage.setItem('dashboardView', activeView)
        
        if (!isAuthenticated) setActiveView(null);
        setActiveView(null)
    }, [activeView, isAuthenticated])

    return { activeView, setActiveView }
}