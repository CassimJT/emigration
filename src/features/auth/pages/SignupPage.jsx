import React from 'react'
import SignupForm from '../components/SignupForm'
import LoginAvatar from "@/assets/LoginAvatar.png"

function SignupPage() {
  return (
    
       <div className="grid min-h-svh lg:grid-cols-2">
          <div className="flex flex-col gap-40 p-6 md:p-10">
           
            <div className="flex flex-1 items-center justify-center ">
              <div className="w-full max-w-xl ">
                <SignupForm />
              </div>
            </div>
          </div>
          <div className="relative hidden lg:flex items-center justify-center bg-green-100 bg-center">
            <img
              src={LoginAvatar}
              alt="e-passport"
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>
    
  )
}

export default SignupPage