import React from 'react'
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

function PaymentSummary({ passportType = 'Official Passport', amount = 0, serviceFee = 0 }) {
  const total = amount + serviceFee

  return (
    <Card className="h-fit sticky top-6 shadow-md border-slate-200 overflow-hidden">
      <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-3 sm:pb-4">
        <CardTitle className="text-lg sm:text-xl font-bold text-slate-800">Payment Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 sm:space-y-4 pt-4 sm:pt-6 text-xs sm:text-base">
        <div className="flex justify-between group">
          <span className="text-slate-500 group-hover:text-slate-700 transition-colors">
            Passport type :
          </span>
          <span className="font-medium text-slate-900">{passportType}</span>
        </div>
        <div className="flex justify-between group">
          <span className="text-slate-500 group-hover:text-slate-700 transition-colors">
            Application Fee :
          </span>
          <span className="font-medium text-slate-900">MK {amount.toLocaleString()}</span>
        </div>
        <div className="flex justify-between group">
          <span className="text-slate-500 group-hover:text-slate-700 transition-colors">
            Service Charge :
          </span>
          <span className="font-medium text-slate-900">
            MK {serviceFee.toLocaleString()}
          </span>
        </div>
        
        <Separator className="my-3 sm:my-4 bg-slate-100" />
        
        <div className="flex justify-between items-start">
          <span className="font-semibold text-slate-700">
            Total Amount :
          </span>
          <div className="text-right">
            <span className="block font-bold text-amber-600">MK {total.toLocaleString()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default PaymentSummary
