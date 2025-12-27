import { createBrowserRouter } from 'react-router-dom'

import AppLayout from '@/layouts/AppLayout'
import BareLayout from '@/layouts/BareLayout'

import LandingPage from '@/pages/LandingPage'
import UnauthorizedPage from '@/pages/UnauthorizedPage'
import NotFoundPage from '@/pages/NotFoundPage'

import LoginPage from '@/features/auth/pages/LoginPage'
import SignupPage from '@/features/auth/pages/SignupPage'
import OtpVerificationPage from '@/features/auth/pages/OtpVerificationPage'

import DashboardPage from '@/features/dashboard/pages/DashboardPage'
import IdentityVerificationPage from '@/features/identity/pages/IdentityVerificationPage'
import PassportApplicationPage from '@/features/passport/pages/PassportApplicationPage'
import PaymentPage from '@/features/payments/pages/PaymentPage'
import NotificationsPage from '@/features/notifications/pages/NotificationsPage'

import { PrivateRoute } from './PrivateRoute'
import { RoleRoute } from './RoleRoute'

export const router = createBrowserRouter([

  // BARE LAYOUT (NO NAV / NO FOOTER)
  {
    element: <BareLayout />,
    children: [
      { path: '/login', element: <LoginPage /> },
      { path: '/signup', element: <SignupPage /> },
      { path: '/otp', element: <OtpVerificationPage /> },
      { path: '/unauthorized', element: <UnauthorizedPage /> },
      { path: '/dashboard/identity/verify', element: <IdentityVerificationPage /> },
    ],
  },

  // APP LAYOUT (NAV + FOOTER)
  {
    element: <AppLayout />,
    children: [
      // Public
      { path: '/', element: <LandingPage /> },

      // Protected routes
      {
        element: <PrivateRoute />,
        children: [
          { path: '/dashboard', element: <DashboardPage /> },
          { path: '/dashboard/passport/apply', element: <PassportApplicationPage /> },
          { path: '/dashboard/payments', element: <PaymentPage /> },
          { path: '/dashboard/notifications', element: <NotificationsPage /> },
        ],
      },

      // Role-based routes
      {
        element: <RoleRoute allowedRoles={['admin', 'officer']} />,
        children: [
          { path: '/admin', element: <DashboardPage /> },
        ],
      },

      // System
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])

export default router
