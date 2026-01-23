import React from 'react'
import NationalIdForm from '../components/NationalIdForm'
import home from "@/assets/home/home.png"

function IdentityVerificationPage() {
  return (

    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex flex-col items-center justify-center p-6 md:p-10 bg-white">
        <div className="w-full max-w-xl">
          <NationalIdForm />
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

export default IdentityVerificationPage