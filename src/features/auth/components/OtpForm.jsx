import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { cn } from "@/lib/utils"
import Logo from "@/assets/Logo.svg"
import { Loader2 } from "lucide-react"

export default function OtpForm({
  onSubmit,
  onResend,
  loading,
  error,
  className,
  ...props
}) {
  const [otp, setOtp] = useState("")

  const isComplete = otp.length === 4 && !otp.includes("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!isComplete || loading) return
    onSubmit({ otp })
  }

  const handleResend = (e) => {
    e.preventDefault()
    if (loading) return
    onResend?.()
  }

  // Optional UX: clear OTP when backend error changes
  useEffect(() => {
    if (error) setOtp("")
  }, [error])

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "flex flex-col gap-6 p-6 md:p-8 pb-12 bg-gray-200 rounded-xl",
        className
      )}
      {...props}
    >
      <div className="flex flex-col items-center gap-1 text-center">
        <img
          src={Logo}
          alt="Government Logo"
          className="opacity-50 w-40 h-40 mx-auto"
        />
        <h1 className="text-xl font-bold">Verify Identity</h1>
        <p className="text-sm text-gray-600">
          Enter the OTP sent to your verified email
        </p>
      </div>

      {/* Error */}
      {error && (
        <p className="text-sm text-red-600 text-center">{error}</p>
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
                className="h-14 w-14 rounded-xl border-2 border-black text-2xl"
              />
            ))}
          </InputOTPGroup>
        </InputOTP>

        <button
          type="button"
          disabled={loading}
          className="text-sm font-semibold text-blue-600 hover:underline disabled:opacity-50"
          onClick={handleResend}
        >
          Resend OTP
        </button>
      </div>

      <div className="flex items-center justify-center mt-12 mb-8">
        <Button
          type="submit"
          disabled={loading || !isComplete}
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