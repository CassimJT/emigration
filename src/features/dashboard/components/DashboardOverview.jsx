import { useAuth } from '@/features/auth/hooks/useAuth';
import ClientOverview from './ClientOverview';
import OfficerOverview from './OfficerOverview';
import React from 'react';
import { Navigate } from 'react-router-dom';

export default function DashboardOverview() {
    const { user } = useAuth();
    
    const role = (user?.role || 'client').toLowerCase();
    
    if (role === 'officer' || role === 'admin' || role === 'superadmin') {
        return <OfficerOverview />;
    }
    
    if (role === 'client') {
        return <ClientOverview />;
    }
    return <Navigate to="/unauthorized" replace />;
}
