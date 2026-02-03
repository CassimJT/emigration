import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Lightbulb, Loader2, AlertCircle } from 'lucide-react'
import PaymentOptions from '@/features/payments/components/PaymentOptions'
import PaymentSummary from '@/features/payments/components/PaymentSummary'
import PayChangu from '@/assets/dashboard/payment/PayChangu.png'
import { usePayments } from '../hooks/usePayments'
import { useAuth } from '@/features/auth/hooks/useAuth'

function PaymentPage() {
  const { user } = useAuth()
  const [paymentState, setPaymentState] = useState({ amount: 0, passportID: '' })
  const [errorMsg, setErrorMsg] = useState('')
  
  const { 
    startPayment, 
    isLoading, 
    error: paymentError
  } = usePayments()

    const preparePaymentPayload = () => {
    return {
      passportFee: paymentState.amount,
      passportID: paymentState.passportID,
    }
  }

  // Handle payment initiation
  const handlePayment = async (e) => {
    e.preventDefault() 
    setErrorMsg('')
    
    if (!paymentState.passportID) {
      setErrorMsg("No active passport application found. Please apply first.")
      return
    }
    
    try {
      const payload = preparePaymentPayload()
      
      const result = await startPayment(payload)
      
      if (result && result.redirectUrl) {
        // Redirect to PayChangu
        window.location.href = result.redirectUrl
      }
    } catch (error) {
      setErrorMsg(error.message || "Failed to initiate payment. Please try again.")
      console.error("Payment initiation error:", error)
    }
  }
  const initialPaymentState = React.useMemo(() => {
    let passportFees = 50000;
    try {
      const feesStr = import.meta.env.VITE_PASSPORT_FEES;
      if (feesStr) {
        const fees = typeof feesStr === 'string' ? JSON.parse(feesStr) : feesStr;
        passportFees = parseInt(fees.standard || 50000);
      }
    } catch (e) {
      console.warn("Failed to parse passport fees from env:", e);
    }
    return {
      amount: passportFees,
      passportID: user?.nationalId || '',
    };
  }, [user?.nationalId]);

  useEffect(() => {
    setPaymentState(initialPaymentState);
  }, [initialPaymentState]);

  return (
    <div className="container mx-auto p-2 sm:p-6 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">Passport Payment</h1>
        <p className="flex items-center text-sm text-muted-foreground mt-2">
          <Lightbulb className="mr-2 h-5 w-5 text-amber-500 animate-pulse" /> 
          You will be redirected to PayChangu to securely complete your payment.
        </p>
      </div>

      {(errorMsg || paymentError) && (
        <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3 text-red-700 text-sm">
          <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
          <p>{errorMsg || paymentError}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-4 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-sm sm:text-lg font-bold mb-6 text-slate-800 border-b border-slate-100 pb-4">
                Payment Method supported by PayChangu
            </h3>
            <PaymentOptions />
            
            <div className="flex flex-col items-center justify-center mt-10 pt-8 border-t border-slate-100">
              <Button 
                disabled={isLoading || !paymentState.amount}
                className="w-full sm:w-2/3 rounded-xl py-6 text-base sm:text-lg 
                          font-bold shadow-xl bg-[rgb(22,168,179)] hover:bg-[rgb(18,140,150)] text-white transition-all 
                          transform hover:-translate-y-1 active:scale-[0.98] flex items-center justify-center gap-3"
                onClick={handlePayment}
              >
                {isLoading ? (
                  <Loader2 className="h-6 w-6 animate-spin text-white" />
                ) : (
                  <div className="p-1 rounded">
                    <img src={PayChangu} alt="PayChangu" className="h-6 w-auto object-contain" />
                  </div>
                )}
                <span>
                  {isLoading ? 'Preparing Secure Checkout...' : 'Proceed to PayChangu'}
                </span>
              </Button>
              
              <div className="mt-6 flex flex-col items-center gap-2">
                <p className="text-xs text-muted-foreground flex items-center gap-1.5 font-medium">
                  Protected & Secured by <span className="font-bold text-slate-700">PayChangu</span>
                </p>
                <p className="text-[10px] text-slate-400 max-w-[280px] text-center">
                  By clicking, you will be redirected to a secure payment gateway to finish your transaction.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-6">
            <PaymentSummary 
              amount={paymentState.amount} 
              serviceFee={1000} 
            />
            
            <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-200 border-dashed">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Notice</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Payment is required to move your application to the "Under Review" stage. 
                Refunds are subject to our terms and conditions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentPage