import React from 'react'
import { useSearchParams, Link, useNavigate } from 'react-router-dom'
import { CheckCircle2, ArrowRight, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { usePayment } from '../hooks/usePayments'

function PaymentSuccessPage() {
 const { confirmPayment, isLoading, error, setError } = usePayment();
  const [searchParams] = useSearchParams();
  const tx_ref = searchParams.get('tx_ref');
  const [paymentData, setPaymentData] = React.useState(null)
  const navigate = useNavigate()

  React.useEffect(() => {
    if (!tx_ref) {
      setError('Missing payment reference');
      return;
    }

    const verify = async () => {
      try {
        const result = await confirmPayment(tx_ref);

        if (result.success) {
          setPaymentData(result)
          setTimeout(() => {
            navigate('/dashboard')
          }, 5000)
        }
        
      } catch (err) {
        setError(err.message || 'Payment verification failed.');
        console.error('Payment verification error:', err);
      }
    };

    verify();
  }, [confirmPayment, error, navigate, setError, tx_ref]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        {isLoading ? (
          <div className="flex flex-col items-center py-8">
            <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
            <p className="text-slate-600 font-medium">Verifying your payment...</p>
          </div>
        ) : (
          <>
            <div className="mb-6 flex justify-center">
              <div className="bg-green-50 p-4 rounded-full">
                <CheckCircle2 className="h-16 w-16 text-green-500" />
              </div>
            </div>
            
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Payment Successful!</h1>
            <p className="text-slate-600 mb-8">
              Thank you for your payment. Your passport application is now being processed.
            </p>

            <div className="bg-slate-50 rounded-xl p-4 mb-8 text-left space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Transaction Ref:</span>
                <span className="font-mono font-medium text-slate-800">{tx_ref}</span>
              </div>
              {paymentData?.payment && (
                <>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Amount Paid:</span>
                    <span className="font-medium text-slate-800">
                      {paymentData.payment.currency} {paymentData.payment.amount}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Status:</span>
                    <span className="font-medium text-green-600 capitalize">
                      {paymentData.payment.status}
                    </span>
                  </div>
                </>
              )}
            </div>

            <div className="space-y-3">
              <Button asChild className="w-full bg-orange-500 hover:bg-orange-400 text-white rounded-full py-6 font-bold shadow-lg transition-all transform hover:-translate-y-0.5 active:scale-[0.98]">
                <Link to="/dashboard">
                  Dashboard Overview <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default PaymentSuccessPage
