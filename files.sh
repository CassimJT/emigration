#!/bin/bash

# Ensure src directory exists
mkdir -p src

# ---------------------------
# FEATURES
# ---------------------------

# Auth
mkdir -p src/features/auth/{api,components,hooks,pages}
touch src/features/auth/api/auth.api.js
touch src/features/auth/components/{LoginForm.jsx,SignupForm.jsx,OtpForm.jsx}
touch src/features/auth/hooks/useAuth.js
touch src/features/auth/pages/{LoginPage.jsx,SignupPage.jsx,OtpVerificationPage.jsx}
touch src/features/auth/index.js

# Identity (NRB verification)
mkdir -p src/features/identity/{api,components,hooks,pages}
touch src/features/identity/api/identity.api.js
touch src/features/identity/components/NationalIdForm.jsx
touch src/features/identity/hooks/useIdentityVerification.js
touch src/features/identity/pages/IdentityVerificationPage.jsx
touch src/features/identity/index.js

# Passport
mkdir -p src/features/passport/{api,components,hooks,pages}
touch src/features/passport/api/passport.api.js
touch src/features/passport/components/{PassportTypeStep.jsx,PersonalInfoStep.jsx,ReviewStep.jsx,ProgressIndicator.jsx}
touch src/features/passport/hooks/usePassportApplication.js
touch src/features/passport/pages/PassportApplicationPage.jsx
touch src/features/passport/index.js

# Payments
mkdir -p src/features/payments/{api,components,hooks,pages}
touch src/features/payments/api/payments.api.js
touch src/features/payments/components/{PaymentOptions.jsx,PaymentSummary.jsx}
touch src/features/payments/hooks/usePayments.js
touch src/features/payments/pages/PaymentPage.jsx
touch src/features/payments/index.js

# Notifications
mkdir -p src/features/notifications/{api,components,hooks,pages}
touch src/features/notifications/api/notifications.api.js
touch src/features/notifications/components/NotificationList.jsx
touch src/features/notifications/hooks/useNotifications.js
touch src/features/notifications/pages/NotificationsPage.jsx
touch src/features/notifications/index.js

# Dashboard
mkdir -p src/features/dashboard/{api,components,hooks,pages}
touch src/features/dashboard/api/dashboard.api.js
touch src/features/dashboard/components/{StatusCard.jsx,QuickActions.jsx}
touch src/features/dashboard/hooks/useDashboard.js
touch src/features/dashboard/pages/DashboardPage.jsx
touch src/features/dashboard/index.js

# ---------------------------
# APP-LEVEL STRUCTURE
# ---------------------------

mkdir -p src/providers
touch src/providers/{AuthProvider.jsx,QueryClientProvider.jsx}

mkdir -p src/lib
touch src/lib/{axios.js,queryClient.js,storage.js}

mkdir -p src/routes
touch src/routes/index.jsx

mkdir -p src/components
touch src/components/{Navbar.jsx,Footer.jsx,Loader.jsx,ErrorMessage.jsx}

mkdir -p src/hooks
touch src/hooks/{useAuth.js,useOnlineStatus.js}

mkdir -p src/utils
touch src/utils/{helpers.js,validators.js,constants.js}

echo "Feature-based React structure created successfully."

