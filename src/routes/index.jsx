import { createBrowserRouter } from 'react-router-dom'

import AppLayout from '@/layouts/AppLayout'
import BareLayout from '@/layouts/BareLayout'

import LandingPage from '@/pages/LandingPage'
import About from '@/pages/About'
import Contacts from '@/pages/Contacts'
import ApplicationDemo from '@/pages/ApplicationDemo'
import FAQs from '@/pages/FAQs'
import UnauthorizedPage from '@/pages/UnauthorizedPage'
import NotFoundPage from '@/pages/NotFoundPage'

import LoginPage from '@/features/auth/pages/LoginPage'
import SignupPage from '@/features/auth/pages/SignupPage'
import OtpVerificationPage from '@/features/auth/pages/OtpVerificationPage'

import DashboardPage from '@/features/dashboard/pages/DashboardPage'
import DashboardOverview from '@/features/dashboard/components/DashboardOverview'
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
      { path: '/identity/verify', element: <IdentityVerificationPage /> },
    ],
  },

  {
    element: <AppLayout />,
    children: [
      // Public
      { path: '/', element: <LandingPage /> },
      { path: '/about', element: <About /> },
      { path: '/contacts', element: <Contacts /> },
      { path: '/demo', element: <ApplicationDemo /> },
      { path: '/faqs', element: <FAQs /> },
      

      // Protected routes
      // (Moved out to standalone layout)

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

  // Protected Dashboard Routes (Standalone Layout)
  {
    element: <PrivateRoute />,
    children: [
      { 
        path: '/dashboard', 
        element: <DashboardPage />,
        children: [
          { index: true, element: <DashboardOverview /> },
          { path: 'passport/apply', element: <PassportApplicationPage /> },
          { path: 'payments', element: <PaymentPage /> },
          { path: 'notifications', element: <NotificationsPage /> },
        ]
      },
    ],
  },
])

export default router
