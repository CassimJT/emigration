import CheckList from '@/features/dashboard/components/DashboardCheckList';
import QuickActions from '@/features/dashboard/components/QuickActions';
import ImportantInformation from '@/features/dashboard/components/ImportantInfor';
import PassportTypes from '@/features/dashboard/components/PassportTypes';
import MyApplicationsTable from '@/features/passport/components/MyApplicationsTable';

export default function ClientOverview() {
    return (
        <div className="flex flex-col gap-6 w-full">
            <section className="w-full">
                <ImportantInformation />
                <PassportTypes />
            </section>
            <section className="w-full">
                <MyApplicationsTable />
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
