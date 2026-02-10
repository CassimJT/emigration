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
import PassportReviewDemo from '@/pages/PassportReviewDemo'
import ManageUsersDemo from '@/pages/ManageUsersDemo'

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
      { path: '/passport/review/demo', element: <PassportReviewDemo /> },
      { path: '/users/manage/demo', element: <ManageUsersDemo /> },
      
    ],
  },

  // Role-based routes(no header / no footer)
  {
    element: <RoleRoute allowedRoles={['superadmin', 'admin', 'officer','client']} />,
    children: [
      { 
        path: '/dashboard', 
        element: <DashboardPage />,
        children: [
          { index: true, element: <DashboardOverview />, allowedRoles: ['client','officer', 'admin','superadmin'] },
          { path: 'passport/apply', element: <PassportApplicationPage />, allowedRoles: ['client'] },
          { path: 'payments', element: <PaymentPage />, allowedRoles: ['client'] },
          { path: 'payment/success', element: <PaymentSuccessPage />, allowedRoles: ['client'] },
          { path: 'payment/failed', element: <PaymentFailedPage />, allowedRoles: ['client'] },
          { path: 'notifications', element: <NotificationsPage />, allowedRoles: ['officer','client', 'admin', 'superadmin']},
          { path: 'reviews', element: <PendingReviewsPage />, allowedRoles: ['officer','admin','superadmin'] },
          { path: 'stats', element: <StatisticsPage />, allowedRoles: ['officer','admin','superadmin'] },
          { path: 'admin/users', element: <ManageUsersPage />, allowedRoles: ['admin','superadmin']}
        ]
      },
    ],
  },
   // System
  { path: '*', element: <NotFoundPage /> }
])

export default router
