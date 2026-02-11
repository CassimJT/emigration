import { getDashboardView, setDashboardView } from "@/lib/storage"
import React from "react"

export function useDashboardNavigation() {
    const [activeView, setActiveView] = React.useState(() => {
        getDashboardView() 
    })

        React.useEffect(() => {
        setDashboardView(activeView)
    }, [activeView])

    return { activeView, setActiveView }
}