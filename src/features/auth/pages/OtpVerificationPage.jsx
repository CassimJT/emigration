import { useEffect } from "react"
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
    clearStatus,
    isAuthReady,
    isAuthenticated,
  } = useAuth()

  /* ---------------- Guard ---------------- */
  useEffect(() => {
    if (!isAuthReady) return

    if (!loginSessionId && !isAuthenticated) {
      navigate("/login", { replace: true })
    }
  }, [isAuthReady, loginSessionId, isAuthenticated, navigate])

  /* ---------------- Success ---------------- */
  useEffect(() => {
    if (!isAuthReady) return

    if (status === "success") {
      navigate("/dashboard", { replace: true })
      clearStatus()
    }
  }, [status, isAuthReady, navigate, clearStatus])

  const handleSubmit = async ({ otp }) => {
    await verifyOtp({ otp })
  }

  const handleResend = async () => {
    console.log("Resend OTP requested")
  }

  if (!isAuthReady) return null

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
