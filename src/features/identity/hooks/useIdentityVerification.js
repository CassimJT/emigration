import { useState } from 'react'
import {
  submitNationalId,
  fetchVerificationStatus,
} from '../api/identity.api'
import { useAuthContext } from '@/providers/AuthProvider'

export function useIdentityVerification() {
  const { 
    verificationSessionId, 
    startIdentitySession, 
    clearIdentitySession 
  } = useAuthContext()

  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const startVerification = async (payload) => {
    setLoading(true)
    setError(null)

    const data = await submitNationalId(payload)
    console.log('startVerification response:', data)

    if (data?.status === 'success') {
      startIdentitySession(data.referenceId) 
      setStatus('PENDING')
    } else {
      setStatus('FAILED')
      setError(data?.message || 'Verification failed')
    }

    setLoading(false)
    return data
  }

  const checkStatus = async () => {
    if (!verificationSessionId) return null

    setLoading(true)
    setError(null)

    const data = await fetchVerificationStatus(verificationSessionId)

    if (data?.status !== 'success') {
      setError(data?.message || 'Failed to fetch status')
    }

    setStatus(data?.status || null)
    setLoading(false)
    return data
  }

  const resetVerification = () => {
    clearIdentitySession()
    setStatus(null)
    setError(null)
    setLoading(false)
  }

  return {
    verificationSessionId,
    status,
    loading,
    error,
    startVerification,
    checkStatus,
    resetVerification,
  }
}
