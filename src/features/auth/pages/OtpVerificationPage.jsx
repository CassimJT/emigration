import React from 'react'
import OtpForm from '../components/OtpForm'

function OtpVerificationPage() {
  return (
    <div className="bg-mutted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
          <OtpForm/>
        </div>
      </div>
  )     
}

export default OtpVerificationPage