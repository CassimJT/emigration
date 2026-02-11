import { useAuthContext } from "@/providers/AuthProvider"
import React from "react"

export function useDashboardNavigation() {
    const {getDashboardView, setDashboardView, clearDashboardView}= useAuthContext

    const [activeView, setActiveView] = React.useState(() => {
        getDashboardView() 
    })

        React.useEffect(() => {
        setDashboardView(activeView)

        return () => {
            clearDashboardView()
        }
    }, [activeView, clearDashboardView, setDashboardView])

    return { activeView, setActiveView }
}