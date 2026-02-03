import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import OtpForm from "../components/OtpForm"
import home from "@/assets/home/home.png"
import { useAuth } from "../hooks/useAuth"
//import { useAuth } from '@/features/auth/hooks/useAuth'


function OtpVerificationPage() {
  const navigate = useNavigate()
  const {
    verifyOtp,
    user,
    loading,
    error,
    status,
    loginSessionId,
    clearStatus,
    isAuthReady,
  } = useAuth()

  // Guard: no active OTP session → redirect to login
  useEffect(() => {
    if (isAuthReady && !loginSessionId) {
     // navigate("/login", { replace: true })
    }
  }, [isAuthReady, loginSessionId, navigate])

  // Side effects based on backend status
  useEffect(() => {
    if (status === "success") {
      navigate("/dashboard", { replace: true })
      clearStatus()
    }
  }, [status, navigate, clearStatus])

  const handleSubmit = async ({ otp }) => {
    try {
      await verifyOtp({ otp })
    } catch {
      // errors handled by useAuth
    }
  }

  const handleResend = async () => {
    console.log("Resend OTP requested")
  }


  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex flex-col items-center justify-center p-6 md:p-10 bg-white">
        <div className="w-full max-w-xl">
          <OtpForm
            onSubmit={handleSubmit}
            onResend={handleResend}
            loading={loading}
            error={error}
            user={user}
          />
        </div>
      </div>

      <div className="hidden lg:flex sticky top-0 h-screen items-center justify-center bg-green-100">
        <img
          src={home}
          alt="e-passport"
          className="max-w-full max-h-full object-contain p-10"
        />
      </div>
    </div>
  )
}

export default OtpVerificationPage
