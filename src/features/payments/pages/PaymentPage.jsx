import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Lightbulb, Loader2 } from 'lucide-react'
import PaymentOptions from '@/features/payments/components/PaymentOptions'
import PaymentSummary from '@/features/payments/components/PaymentSummary'
import PayChangu from '@/assets/dashboard/payment/PayChangu.png'
import { usePayments } from '../hooks/usePayments'

function PaymentPage() {
  const [paymentState, setPaymentState] = useState({ amount: 0, passportID: '' })
  
  const { 
    startPayment, 
    isLoading, 
  } = usePayments()

  //prepare payment payload
  const preparePayload = () => {
    return {
      passportFee: paymentState.amount,
      passportID: paymentState.passportID,
    }
  } 
  
  //handle payment initiation
  const handlePayment = async (e) => {
    e.preventDefault() 
    try {
      // if (!paymentState.passportID) {
      //   console.log("Please apply for a passport first.")
      //   return;
      // }

      const payload = preparePayload()
      const result = await startPayment(payload)

      if (result && result.redirectUrl) {
        window.location.href = result.redirectUrl
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  //set payment state on component mount
  React.useEffect(() => {
    let passportFee = 50000
    try {
      const feesStr = import.meta.env.VITE_PASSPORT_FEES
      if (feesStr) {
        // If it's a string (expected), parse it. If somehow already an object, use it.
        const fees = typeof feesStr === 'string' ? JSON.parse(feesStr) : feesStr
        passportFee = parseInt(fees.standard) 
      }
    } catch (e) {
      console.warn("Failed to parse passport fees from env:", e)
    }
    setPaymentState({ amount: passportFee, passportID: 'dev_002' })
  }, [])
  
  return (
    <div className="container mx-auto p-2 sm:p-6 max-w-5xl">
      <div className="mb-8">
        <h1 className=" text-xl sm:text-2xl font-bold tracking-tight">Passport Payment</h1>
        <p className="flex items-center text-sm text-muted-foreground mt-2">
         <Lightbulb 
                    className="mr-1 h-12 w-12  text-amber-500 shadow-lg shadow-amber-500" /> 
         You will be redirected to PayChangu to make your payment.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-2 sm:p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-sm sm:text-lg font-black mb-4 text-slate-600">
              PayChangu Payment Methods
            </h3>
            <PaymentOptions />
            
            <div className="flex flex-col items-center justify-center mt-8 pt-6 border-t border-slate-100">
              <Button 
                disabled={isLoading || !paymentState.amount}
                className="w-[61%] rounded-full max-h-[40px] h-auto text-xs sm:text-lg 
                          font-bold shadow-lg bg-[rgb(22,168,179)] hover:bg-[rgb(82,217,226)] text-white transition-all 
                          transform hover:-translate-y-0.5 active:scale-[0.98] flex flex-row items-center justify-center gap-2"
                onClick={handlePayment}
              >
                <div className=" p-1.5 rounded-lg flex items-center justify-center backdrop-blur-sm">
                  {isLoading ? (
                    <Loader2 className="h-4 sm:h-6 w-auto animate-spin" />
                  ) : (
                    <img src={PayChangu} alt="PayChangu" className="h-4 sm:h-6 w-auto object-contain" />
                  )}
                </div>
                <span className="whitespace-normal text-center">
                  {isLoading ? 'Processing...' : 'Proceed to Payment'}
                </span>
              </Button>
              <p className="text-xs text-center text-muted-foreground mt-4 flex items-center justify-center gap-1">
                Powered by <span className="font-bold text-slate-700">PayChangu</span>
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <PaymentSummary 
            amount={paymentState.amount} 
            serviceFee={1000} 
          />
        </div>
      </div>
    </div>
  )
}

export default PaymentPage