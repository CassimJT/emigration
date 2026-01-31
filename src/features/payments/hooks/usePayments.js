import { useState } from 'react'
import { initiatePayment, verifyPayment, fetchPaymentHistory } from '@/features/payments/api/payments.api'


export function usePayments() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  

  // Start a new payment process
  const startPayment = async (payload) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await initiatePayment(payload)
      
      // Extract redirect URL
      let redirectUrl = null
      if (response?.data?.checkout_url) {
        redirectUrl = response.data.checkout_url
      } else if (response?.checkout_url) {
        redirectUrl = response.checkout_url
      } else if (response?.url) {
        redirectUrl = response.url
      }

      if (!redirectUrl) {
         throw new Error("Unexpected error occurred.")
      }

      return { success: true, redirectUrl }

    } catch (err) {
      const errorMessage = err.message || "Unexpected error occurred."
      setError(errorMessage)
      console.error('Error starting payment:', err)
      throw err 
    } finally {
      setIsLoading(false)
    }
  }

  // Confirm or verify payment by reference
  const confirmPayment = async (reference) => {
    try {
      const response = await verifyPayment(reference)
      return response
    } catch (error) {
        console.error('Error confirming payment:', error)
      throw error
    }
  }

  // Fetch payment history
  const getPaymentHistory = async () => {
    try {
      const response = await fetchPaymentHistory()
      return response
    } catch (error) {
      console.error('Error fetching payment history:', error)
      throw error
    }
  }

  // Cancel current payment 
  const cancelPayment = () => {
    setIsLoading(false)
    setError(null)
    console.log('Payment canceled')
  }

  return {
    startPayment,
    confirmPayment,
    getPaymentHistory,
    cancelPayment,
    isLoading,
    error
  }
}
