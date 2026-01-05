import React from 'react'
import { CreditCard, Banknote, Smartphone, Building, Building2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import TnmIcon from '../../../assets/tnm.svg'
import AirtelIcon from '../../../assets/airtel.png'

function PaymentOptions() {
  const methods = [
    {
      id: 'card',
      title: 'Cards',
      description: 'Visa, Mastercard',
      icon: CreditCard,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      id: 'TNM',
      title: 'Mpamba',
      description: 'TNM Money',
      icon: () => <img src={TnmIcon} className='w-[20px]' alt="TNM Icon" />,
      color: 'bg-green-500 text-green-600'
    },
    {
      id: 'Airtel',
      title: 'Airtel',
      description: 'Airtel Money',
            icon: () => <img src={AirtelIcon} className='w-[20px]' alt="Airtel Icon" />,
      color: 'bg-red-100 text-red-600'
    },
    {
      id: 'Bank',
      title: 'Bank',
      description: 'Bank Transfer',
      icon: Building2,
      color: 'bg-purple-100 text-purple-600'
    }

  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {methods.map((method) => {
        const Icon = method.icon
        
        return (
          <div 
            key={method.id}
            className="group flex flex-col items-center justify-center p-6 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-default select-none"
          >
            <div className={cn("h-10 w-10 sm:h-12 sm:w-12 flex items-center justify-center rounded-full mb-2 sm:mb-3 transition-colors duration-300", method.color)}>
              <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <span className="text-sm sm:text-base font-semibold text-slate-800 mb-0.5 sm:mb-1 group-hover:text-slate-900">{method.title}</span>
            <span className="text-[10px] sm:text-xs text-slate-500 text-center leading-relaxed max-w-[120px] sm:max-w-[140px]">{method.description}</span>
          </div>
        )
      })}
    </div>
  )
}

export default PaymentOptions
