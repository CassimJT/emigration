import { useAuth } from '@/features/auth/hooks/useAuth';
import ClientOverview from './ClientOverview';
import OfficerOverview from './OfficerOverview';
import React from 'react';
import { Navigate, useOutletContext } from 'react-router-dom'; //temp

export default function DashboardOverview() {
    const { user } = useAuth();
    // //temp: Get the frontend-overridden role from DashboardPage context
    const { currentRole } = useOutletContext(); //temp

    const role = (currentRole || user?.role || 'client').toLowerCase(); //temp
    
    if (role === 'officer' || role === 'admin' || role === 'superadmin') {
        return <OfficerOverview />;
    }
    
    if (role === 'client') {
        return <ClientOverview />;
    }
    return <Navigate to="/unauthorized" replace />;
}
