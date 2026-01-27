import { useState } from 'react'
import {
  submitNationalId,
  fetchVerificationStatus,
} from '../api/identity.api'

export function useIdentityVerification() {
  const [referenceId, setReferenceId] = useState(null)
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const startVerification = async (payload) => {
    setLoading(true)
    setError(null)

    const data = await submitNationalId(payload)
    console.log("startVerification response:", data)

    if (data?.status === 'success') {
      setReferenceId(data.referenceId)
      setStatus('PENDING')
    } else {
      setStatus('FAILED')
      setError(data?.message || 'Verification failed')
    }

    setLoading(false)
    return data
  }

  const checkStatus = async () => {
    if (!referenceId) return null

    setLoading(true)
    setError(null)

    const data = await fetchVerificationStatus(referenceId)

    if (data?.status !== 'success') {
      setError(data?.message || 'Failed to fetch status')
    }

    setStatus(data?.status || null)
    setLoading(false)
    return data
  }

  const resetVerification = () => {
    setReferenceId(null)
    setStatus(null)
    setError(null)
    setLoading(false)
  }

  return {
    referenceId,
    status,
    loading,
    error,
    startVerification,
    checkStatus,
    resetVerification,
  }
}
