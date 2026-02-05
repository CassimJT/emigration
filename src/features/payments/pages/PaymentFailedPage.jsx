import React from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { XCircle, RefreshCcw, LayoutDashboard } from 'lucide-react'
import { Button } from '@/components/ui/button'

function PaymentFailedPage() {
  const [searchParams] = useSearchParams()
  const tx_ref = searchParams.get('tx_ref')
  const status = searchParams.get('status') || 'failed'

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <div className="mb-6 flex justify-center">
          <div className="bg-red-50 p-4 rounded-full">
            <XCircle className="h-16 w-16 text-red-500" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Payment Failed</h1>
        <p className="text-slate-600 mb-8">
          We couldn't process your payment. This might be due to insufficient funds, or a temporary issue with the payment gateway.
        </p>

        <div className="bg-slate-50 rounded-xl p-4 mb-8 text-left space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Transaction Ref:</span>
            <span className="font-mono font-medium text-slate-800">{tx_ref || 'N/A'}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Error Status:</span>
            <span className="font-medium text-red-600 capitalize">{status}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button asChild variant="outline" className="rounded-full py-6 border-orange-500 text-orange-500 hover:bg-orange-50 font-bold transition-all transform hover:-translate-y-0.5 active:scale-[0.98]">
            <Link to="/dashboard/payments">
              <RefreshCcw className="mr-2 h-4 w-4" /> Try Again
            </Link>
          </Button>
          <Button asChild className="bg-orange-500 hover:bg-orange-400 text-white rounded-full py-6 font-bold shadow-lg transition-all transform hover:-translate-y-0.5 active:scale-[0.98]">
            <Link to="/dashboard">
              <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard Overview
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default PaymentFailedPage
