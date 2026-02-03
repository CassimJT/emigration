import React, { useEffect, useState } from 'react'
import NationalIdForm from '../components/NationalIdForm'
import home from '@/assets/home/home.png'
import { useNavigate } from 'react-router-dom'
import { useIdentityVerification } from '../hooks/useIdentityVerification'
import { useAuth } from '@/features/auth/hooks/useAuth'

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
    verificationSessionId,
    isReady,
  } = useIdentityVerification()

  const { isAuthenticated } = useAuth()

  const preparePayload = () => ({
    nationalId: formState.nationalId.trim(),
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await startVerification(preparePayload())
    } catch {
      // handled in hook
    }
  }

  /* -------- ROUTE GUARD -------- */
useEffect(() => {
  if (!isReady) return

  if (isAuthenticated) {
    navigate('/dashboard', { replace: true })
  } else if (!verificationSessionId) {
    resetVerification()
    navigate('/login', { replace: true })
  }

}, [isReady, isAuthenticated, verificationSessionId, resetVerification, navigate])

  /* -------- STATUS SIDE EFFECT -------- */
 useEffect(() => {
  if (status === 'success' && !isAuthenticated) {
    clearStatus()
    navigate('/login', { replace: true })
  }
}, [status, clearStatus, isAuthenticated, navigate])


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
