import { initiatePayment, verifyPayment, fetchPaymentHistory } from '../api/payments.api'

export function usePayments() {
  // Start a new payment process
  const startPayment = async (payload) => {
    try {
      const response = await initiatePayment(payload)
      return response
    } catch (error) {
      console.error('Error starting payment:', error)
      throw error
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

  // Cancel current payment (reset any local state if needed)
  const cancelPayment = () => {
    // Reset any temporary payment state here
    console.log('Payment canceled')
  }

  return {
    startPayment,
    confirmPayment,
    getPaymentHistory,
    cancelPayment,
  }
}
