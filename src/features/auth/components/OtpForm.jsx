import React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    InputOTP, 
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { cn } from "@/lib/utils"
import Logo from "@/assets/Logo.svg"
import {useLocation, useNavigate } from "react-router-dom"
import { Loader2 } from "lucide-react"
import { AUTH_FLOW } from "@/utils/constants"
import { useAuth } from "../hooks/useAuth"

<<<<<<< HEAD

export default function OtpForm() {
  const { verifyOtp } = useAuth()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { state } = useLocation()
  const [otp, setOtp] = useState("")

  const flowType = state?.flowType

  const handleVerify = (e) => {
    e.preventDefault()
    setLoading(true)
    verifyOtp({ otp })
      .then((data) => {
        if (data.status === "success") {
          if (flowType === AUTH_FLOW.DASHBOARD) {
            navigate("/dashboard")
          } else if (flowType === AUTH_FLOW.SIGNUP) {
            navigate("/signup")
          } 
        } else {
          alert("OTP verification failed. Please try again.")
        }
      })
      .catch((err) => {
        console.error("OTP verification error:", err)
        alert("An error occurred during OTP verification. Please try again.")
      })
      .finally(() => {
        setLoading(false)
      }).finally(() => {
        setLoading(false)
      })  
  }

=======
export default function OtpForm({
  onSubmit,
  loading,
  error,
  className,
  ...props
}) {
  
>>>>>>> ed3612eff1e47890ca40ffb7cce284e924e0fcc8
  function handleOTPResent(e){
    e.preventDefault()
    return null;
  }

  return (
    <form 
<<<<<<< HEAD
      onSubmit={handleVerify}
      className={cn("flex flex-col gap-6 p-6 md:p-8 pb-12 bg-gray-200 rounded-xl")} 
=======
      onSubmit={onSubmit}
      className={cn("flex flex-col gap-6 p-6 md:p-8 pb-12 bg-gray-200 rounded-xl", className)} 
      {...props}
>>>>>>> ed3612eff1e47890ca40ffb7cce284e924e0fcc8
    >
      <div className="flex flex-col items-center gap-1 text-center">
        <img
          src={Logo}
          alt="Government Logo"
          className="opacity-50 w-40 h-40 mx-auto"
        />
        <h1 className="text-xl font-bold">Verify Identity</h1>
        <p className="text-sm text-gray-600">Enter the OTP sent to your verified email</p>
      </div>
       {/* error message display */}
         {error && (
          <p className="text-sm text-red-600 mt-1">
            {error}
          </p>
        )}
      <div className="flex flex-col items-center justify-center gap-6 mt-6">
        <InputOTP 
        maxLength={6} 
        disabled={loading}
        onChange={(value) => setOtp(value)}
        >
          <InputOTPGroup className="flex gap-4">
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <InputOTPSlot 
                key={index}
                index={index} 
                className="h-14 w-14 rounded-xl border-2 border-black text-2xl "
              />
            ))}
          </InputOTPGroup>
        </InputOTP>
        
        <button 
          type="button"
          disabled={loading}
          className="text-sm font-semibold text-blue-600 hover:underline disabled:opacity-50"
          onClick={() => {handleOTPResent}}
        >
          Resend OTP
        </button>
      </div>
       
      <div className="flex items-center justify-center mt-12 mb-8">
        <Button 
          type="submit"
          disabled={loading}
          className="rounded-full text-base w-full max-w-[240px] h-12 bg-orange-500 hover:bg-orange-400 font-semibold" 
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Verifying...
            </>
          ) : (
            "Verify"
          )}
        </Button>
      </div> 
    </form>
  )
}
