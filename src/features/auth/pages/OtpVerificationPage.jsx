import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import OtpForm from "../components/OtpForm"
import home from "@/assets/home/home.png"
import { useAuth } from "../hooks/useAuth"

function OtpVerificationPage() {
  const navigate = useNavigate()
  const {
    verifyOtp,
    loading,
    error,
    status,
    loginSessionId,
    verificationSessionId,
    isAuthenticated,
    clearStatus,
    isAuthReady,
  } = useAuth()

  /* -------- ROUTE GUARD -------- */
  useEffect(() => {
    if (!isAuthReady) return

    if (isAuthenticated) {
      navigate("/dashboard", { replace: true })
    } else if (!verificationSessionId) {
      navigate("/identity", { replace: true })
    } else if (!loginSessionId) {
      navigate("/login", { replace: true })
    }
  }, [
    isAuthReady,
    isAuthenticated,
    verificationSessionId,
    loginSessionId,
    navigate,
  ])

  /* -------- STATUS SIDE EFFECT -------- */
  useEffect(() => {
    if (status === "success") {
      clearStatus()
      navigate("/dashboard", { replace: true })
    }
  }, [status, navigate, clearStatus])

  const handleSubmit = async ({ otp }) => {
    try {
      await verifyOtp({ otp })
    } catch {
      // handled by hook
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
