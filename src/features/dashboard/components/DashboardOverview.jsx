import { useAuth } from '@/features/auth/hooks/useAuth';
import ClientOverview from './ClientOverview';
import OfficerOverview from './OfficerOverview';

export default function DashboardOverview() {
    const { user } = useAuth();
    const role = user?.role?.toLowerCase() || 'client';

    if (role === 'officer' || role === 'admin') {
        return <OfficerOverview />;
    }

    return <ClientOverview />;
}
