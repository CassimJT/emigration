import React, { useEffect, useState } from 'react'
import NationalIdForm from '../components/NationalIdForm'
import home from '@/assets/home/home.png'
import { useNavigate } from 'react-router-dom'
import { useIdentityVerification } from '../hooks/useIdentityVerification'

function IdentityVerificationPage() {
  const [formState, setFormState] = useState({ nationalId: '' })
  const navigate = useNavigate()

  const {
    startVerification,
    loading,
    error,
    status,
    clearStatus,
    resetVerification,
  } = useIdentityVerification()

  const preparePayload = () => ({
    nationalId: formState.nationalId.trim(),
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await startVerification(preparePayload())
  }

  useEffect(() => {
  if (status === 'success') {
    navigate('/login')
    // clearStatus AFTER navigation
    setTimeout(() => clearStatus(), 0)
  }
}, [status, navigate, clearStatus])


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
