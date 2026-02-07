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
import PaymentSuccessPage from '@/features/payments/pages/PaymentSuccessPage'
import PaymentFailedPage from '@/features/payments/pages/PaymentFailedPage'
import PendingReviewsPage from '@/features/dashboard/pages/PendingReviewsPage'
import StatisticsPage from '@/features/dashboard/pages/StatisticsPage'
import { RoleRoute } from './RoleRoute'
import ManageUsersPage from '@/features/dashboard/pages/ManageUsersPage'

export const router = createBrowserRouter([

  // BARE LAYOUT (NO HEADER / NO FOOTER)
  {
    element: <BareLayout />,
    children: [
      { path: '/login', element: <LoginPage /> },
      { path: '/signup', element: <SignupPage /> },
      { path: '/otp', element: <OtpVerificationPage /> },
      { path: '/unauthorized', element: <UnauthorizedPage /> },
      { path: '/identity/verify', element: <IdentityVerificationPage /> },
      { path: '/payment/success', element: <PaymentSuccessPage /> },
      { path: '/payment/failed', element: <PaymentFailedPage /> },
    ],
  },

  // Header & Footer Layout
  {
    element: <AppLayout />,
    children: [
      // Public
      { path: '/', element: <LandingPage /> },
      { path: '/about', element: <About /> },
      { path: '/contacts', element: <Contacts /> },
      { path: '/demo', element: <ApplicationDemo /> },
      { path: '/faqs', element: <FAQs /> },
      
    ],
  },

  // Role-based routes(no header / no footer)
  {
    element: <RoleRoute allowedRoles={['admin', 'officer','client',]} />,
    children: [
      { 
        path: '/dashboard', 
        element: <DashboardPage />,
        children: [
          { index: true, element: <DashboardOverview /> },
          { path: 'passport/apply', element: <PassportApplicationPage /> },
          { path: 'payments', element: <PaymentPage /> },
          { path: 'payment/success', element: <PaymentSuccessPage /> },
          { path: 'payment/failed', element: <PaymentFailedPage /> },
          { path: 'notifications', element: <NotificationsPage /> },
          { path: 'reviews', element: <PendingReviewsPage />, allowedRoles: ['officer'] },
          { path: 'stats', element: <StatisticsPage />, allowedRoles: ['officer'] },
          { path: 'admin/users', element: <ManageUsersPage />, allowedRoles: ['admin']}
        ]
      },
    ],
  },
   // System
  { path: '*', element: <NotFoundPage /> }
])

export default router
