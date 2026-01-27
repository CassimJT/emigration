import React, { useEffect, useState } from 'react'
import NationalIdForm from '../components/NationalIdForm'
import home from "@/assets/home/home.png"
import { useNavigate } from 'react-router-dom'
import { useIdentityVerification } from '../hooks/useIdentityVerification'

function IdentityVerificationPage() {
  //form state
  const [formState, setFormState] = useState({ nationalId: '' })
  const navigate = useNavigate()
  //custom hooks
  const { 
    verifyIdentity, 
    loading, 
    error,
    checkStatus,
    startVerification,
    nationalId,
    status,
    resetVerification
    
  } = useIdentityVerification()

  //payload reshaping
  const preparePayload = () => {
    return {
      nationalId: formState.nationalId.trim()
    }
  }
  //handle input change
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }
  //handle submit
  const handleSubmit = (e) => {
    e.preventDefault()
    const payload = preparePayload()
    //console.log("Submitting National ID:", payload.nationalId)
    startVerification(payload)
  }
  //side effects
  useEffect(() => {
    if (!status) return
    if (status === 'success') {
      console.log("Verification successful")
      navigate('/login')
    } else if (status === 'expired') {
      //on expired
      console.error("Verification expired")
      resetVerification
    }
  }, [status])
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex flex-col items-center justify-center p-6 md:p-10 bg-white">
        <div className="w-full max-w-xl">
          <NationalIdForm 
            nationalId={formState.nationalId}
            onSubmit={handleSubmit} 
            loading={loading}
            onChange={handleChange}
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

export default IdentityVerificationPage