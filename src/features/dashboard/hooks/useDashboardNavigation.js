import React from "react"

export function useDashboardNavigation() {
    const [activeView, setActiveView] = React.useState(() => {
        return localStorage.getItem('dashboardView') || 'overview'
    })

        React.useEffect(() => {
        localStorage.setItem('dashboardView', activeView)
    }, [activeView])

    return { activeView, setActiveView }
}