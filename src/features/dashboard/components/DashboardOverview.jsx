import React from 'react'
import StatusCard from './StatusCard'
import CheckList from './DashboardCheckList'
import QuickActions from './QuickActions'
import ImportantInfor from './ImportantInfor'

/*
 * Dashboard Overview Layout Component.
 * Serves as the landing view for the dashboard, aggregating key widgets:
 * - StatusCard (Application progress)
 * - DashboardCheckList (Pending items)
 * - QuickActions (Shortcuts)
 * Implements a responsive grid layout.
 */
export default function DashboardOverview() {
    return (
        <div className="flex flex-col gap-6 w-full">
            <section className="w-full">
                <ImportantInfor />
            </section>
            <section className="w-full">
                <StatusCard />
            </section>
            
            <section className="grid grid-cols-1 xl:grid-cols-3 gap-6 w-full">
                <div className="xl:col-span-2 w-full">
                    <CheckList />
                </div>
                <div className="xl:col-span-1 w-full">
                    <QuickActions />
                </div>
            </section>
        </div>
    )
}
