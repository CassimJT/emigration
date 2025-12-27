import { useState } from 'react'
import { fetchDashboardSummary, fetchApplicationStatus, fetchPaymentStatus } from '../api/dashboard.api'

export function useDashboard() {
  const [summary, setSummary] = useState(null)
  const [applications, setApplications] = useState(null)
  const [payments, setPayments] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const loadDashboard = async () => {
    setLoading(true)
    setError(null)

    try {
      const summaryData = await fetchDashboardSummary()
      const applicationData = await fetchApplicationStatus()
      const paymentData = await fetchPaymentStatus()

      setSummary(summaryData)
      setApplications(applicationData)
      setPayments(paymentData)
    } catch (err) {
      setError(err?.message || 'Failed to load dashboard')
    } finally {
      setLoading(false)
    }
  }

  return {
    summary,
    applications,
    payments,
    loading,
    error,
    loadDashboard,
  }
}
