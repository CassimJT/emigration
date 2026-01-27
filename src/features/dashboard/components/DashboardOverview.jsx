import StatusCard from '@/features/dashboard/components/StatusCard'
import CheckList from '@/features/dashboard/components/DashboardCheckList'
import QuickActions from '@/features/dashboard/components/QuickActions'
import ImportantInformation from '@/features/dashboard/components/ImportantInfor';

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
                <ImportantInformation />
            </section>
            <section className="w-full">
                <StatusCard />
            </section>
            <section className="w-full">
                
            </section>
            
            <section className="flex flex-col sm:flex-row gap-10 w-full">
                <div className="">
                    <CheckList />
                </div>
                <div className="">
                    <QuickActions />
                </div>
            </section>
        </div>
    )
}
