import StatusCard from '@/features/dashboard/components/StatusCard'
import CheckList from '@/features/dashboard/components/DashboardCheckList'
import QuickActions from '@/features/dashboard/components/QuickActions'
import ImportantInfor from '@/features/dashboard/components/ImportantInfor'
import { useDashboard } from '@/features/dashboard/hooks/useDashboard';

/*
 * Dashboard Overview Layout Component.
 * Serves as the landing view for the dashboard, aggregating key widgets:
 * - StatusCard (Application progress)
 * - DashboardCheckList (Pending items)
 * - QuickActions (Shortcuts)
 * Implements a responsive grid layout.
 */
export default function DashboardOverview() {
        const {applications: applicationData, summary} = useDashboard();

    return (
        <div className="flex flex-col gap-6 w-full">
            <section className="w-full">
                <ImportantInfor />
            </section>
            <section className="w-full">
                <StatusCard />
            </section>
            <section className="w-full">
                    {summary}
                {applicationData}
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
