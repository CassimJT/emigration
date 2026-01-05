import React from 'react'
import { Button } from '@/components/ui/button'
import { Lightbulb } from 'lucide-react'
import PaymentOptions from '@/features/payments/components/PaymentOptions'
import PaymentSummary from '@/features/payments/components/PaymentSummary'
import PayChangu from '@/assets/PayChangu.png'

function PaymentPage() {

  return (
    <div className="container mx-auto p-2 sm:p-6 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Passort Payment</h1>
        <p className="flex items-center text-sm text-muted-foreground mt-2">
         <Lightbulb size={25} 
                    strokeWidth={2.25} 
                    className="mr-1 h-5 w-5  text-amber-500" /> 
         You will be redirected to PayChangu to make your payment.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-2 sm:p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-xs sm:text-lg font-black mb-4 text-slate-600">
              PayChangu Payment Methods
            </h3>
            <PaymentOptions />
            
            <div className="mt-8 pt-6 border-t border-slate-100">
              <Button 
                className="w-full rounded-xl min-h-[10px] sm:min-h-[60px] h-auto text-xs sm:text-lg 
                          font-bold shadow-lg bg-amber-500 hover:bg-amber-600 text-white transition-all 
                          transform hover:-translate-y-0.5 active:scale-[0.98] flex flex-row items-center justify-center gap-2"
                onClick={() => {}}
              >
                <div className="bg-white/20 p-1.5 rounded-lg flex items-center justify-center backdrop-blur-sm">
                  <img src={PayChangu} alt="PayChangu" className="h-6 sm:h-8 w-auto object-contain" />
                </div>
                <span className="whitespace-normal text-center">Proceed to Payment</span>
              </Button>
              <p className="text-xs text-center text-muted-foreground mt-4 flex items-center justify-center gap-1">
                Powered by <span className="font-bold text-slate-700">PayChangu</span>
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <PaymentSummary 
            amount={50000} 
            serviceFee={1000} 
          />
        </div>
      </div>
    </div>
  )
}

export default PaymentPage