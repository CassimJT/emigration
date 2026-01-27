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

  // Start a new verification session
  const startVerification = async (payload) => {
    setLoading(true)
    setError(null)
    try {
      const data = await submitNationalId(payload)

      if (data?.status === 'success') {
        setReferenceId(data.referenceId)
        setStatus('PENDING')
      } else {
        setStatus('FAILED')
      }

      return data
    } catch (err) {
      setError(err)
      return err
    } finally {
      setLoading(false)
    }
  }

  // Poll verification status
  const checkStatus = async () => {
    if (!referenceId) return null

    setLoading(true)
    setError(null)
    try {
      const data = await fetchVerificationStatus(referenceId)
      setStatus(data.status)
      return data
    } catch (err) {
      setError(err)
      return err
    } finally {
      setLoading(false)
    }
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
