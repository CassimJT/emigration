import { useState } from 'react'
import {
  submitNationalId,
} from '../api/identity.api'
import { useAuthContext } from '@/providers/AuthProvider'

export function useIdentityVerification() {
  const {
    verificationSessionId,
    startIdentitySession,
    clearIdentitySession,
  } = useAuthContext()

  const [status, setStatus] = useState(null) 
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const clearStatus = () => setStatus(null)

  const startVerification = async (payload) => {
    if (loading) return
    setLoading(true)
    setError(null)
    setStatus(null)

    try {
      const data = await submitNationalId(payload)
      console.log('startVerification response:', data)

      if (!data || data.status !== 'success' || !data.referenceId) {
        setStatus('failed')
        throw new Error(data?.message || 'Verification failed')
      }

      // Extract citizen profile from response
      const citizenProfile = data.profile ? {
        firstName: data.profile.firstName,
        surName: data.profile.surName,
        nationalId: payload.nationalId, // Use the nationalId from the request
      } : null

      startIdentitySession(data.referenceId, citizenProfile)
      setStatus('success') 
      return data
    } catch (err) {
      setStatus('failed')
      setError(err?.response?.data?.message || err.message || 'Verification failed')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const resetVerification = () => {
    clearIdentitySession()
    clearStatus()
    setError(null)
    setLoading(false)
  }

  return {
    verificationSessionId,
    status,
    loading,
    error,
    clearStatus,
    startVerification,
    resetVerification,
  }
}