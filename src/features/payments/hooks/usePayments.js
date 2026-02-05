import { useState } from 'react'
import { initiatePayment, verifyPayment, fetchPaymentHistory } from '@/features/payments/api/payments.api'
import { useAuth } from '@/features/auth/hooks/useAuth'


export function usePayments() {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  

  // Start a new payment process
  const startPayment = async (payload) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await initiatePayment(payload)
      
      // Backend returns: 
      // return res.status(200).json({
      //   success: true,
      //   message: "Checkout session created",
      //   checkout_url: checkoutUrl,
      //   tx_ref,
      //   paymentId: newPayment._id 
      // });

      let redirectUrl = response?.checkout_url
      
      if (!redirectUrl) {
         throw new Error("Failed to get checkout URL from payment gateway.")
      }

      return { success: true, redirectUrl, tx_ref: response.tx_ref }
    } catch (err) {
      const errorMessage = err.message || err.error || "Unexpected error occurred."
      setError(errorMessage)
      console.error('Error starting payment:', err)
      throw err 
    } finally {
      setIsLoading(false)
    }
  }

  // Confirm or verify payment by reference
  const confirmPayment = async (reference) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await verifyPayment(reference)
      return response
    } catch (err) {
      const errorMessage = err.message || err.error || "Verification failed."
      setError(errorMessage)
      console.error('Error confirming payment:', err)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  // Fetch payment history
  const getPaymentHistory = async () => {
    if (!user?._id) return { success: false, message: 'User not authenticated' }
    
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetchPaymentHistory(user._id)
      return response
    } catch (err) {
      const errorMessage = err.message || err.error || "Failed to fetch history."
      setError(errorMessage)
      console.error('Error fetching payment history:', err)
      throw err
    } finally {
      setIsLoading(false)
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
