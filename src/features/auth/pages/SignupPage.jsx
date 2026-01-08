import React from 'react'
import SignupForm from '../components/SignupForm'
import LoginAvatar from "@/assets/LoginAvatar.png"

function SignupPage() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex flex-col items-center justify-center p-6 md:p-10 bg-white">
        <div className="w-full max-w-xl">
          <SignupForm />
        </div>
      </div>
      <div className="hidden lg:flex sticky top-0 h-screen items-center justify-center bg-green-100">
        <img
          src={LoginAvatar}
          alt="e-passport"
          className="max-w-full max-h-full object-contain p-10"
        />
      </div>
    </div>
  )
}

export default SignupPage