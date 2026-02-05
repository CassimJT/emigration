import React from 'react'
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'


export default function PassportTypes() {
    const navigate = useNavigate();

    const passportTypes = [
        {
            id: 1,
            name: "Ordinary Passport",
            price: 25000,
            serviceType: "Basic processing",
            description: "Standard passport for regular travel purposes.",
            features: [
                "Valid for 5 years",
                "32 pages",
                "No expedited service",
            ],
            isPopular: false
        },
        {
            id: 2,
            name: "Official Passport",
            price: 50000,
            serviceType: "Priority processing",
            description: "Issued for government officials or official travel.",
            features: [
                "Valid for 5 years",
                "48 pages",
                "Includes official designation",
            ],
            isPopular: true
        },
        {
            id: 3,
            name: "Diplomatic Passport",
            price: 100000,
            serviceType: "Expedited processing",
            description: "Issued for diplomats and international representatives.",
            features: [
                "Valid for 5 years",
                "64 pages",
                "Diplomatic privileges included",
            ],
            isPopular: false
        }
    ]

    return (
        <div className="p-4 mt-8 space-y-6">
            <div className="flex flex-col gap-1">
                <h3 className="text-2xl font-bold text-slate-800">
                    Passport Types
                </h3>
                <p className="text-slate-500 text-sm">
                    Choose the passport type that best suits your travel needs.
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {passportTypes.map((type) => (
                    <Card 
                        key={type.id} 
                        className={`flex flex-col relative border-2 ${type.isPopular ? 'border-amber-500 shadow-xl scale-[1.02]' : 'border-slate-100 shadow-md'} rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl`}
                    >
                        {type.isPopular && (
                            <div className="absolute top-0 right-0 bg-amber-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                            Recommended
                            </div>
                        )}
                        <div className="h-2 w-full bg-amber-500/10" />
                        <div className="p-6 flex flex-col h-full">
                            <h4 className="text-xl font-bold text-slate-800 mb-1">
                            {type.name}
                            </h4>
                            <div className="flex items-baseline gap-1 mb-4">
                                <span className="text-xs font-semibold text-slate-400">MWK</span>
                                <span className="text-3xl font-black text-slate-900">
                                    {type.price.toLocaleString()}
                                </span>
                            </div>
                            
                            <p className="text-sm text-slate-600 mb-6 line-clamp-2">
                            {type.description}
                            </p>

                            <Separator className="mb-6 opacity-50" />

                            <ul className="space-y-3 mb-8 flex-grow">
                                {type.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-sm text-slate-600">
                                        <div className="mt-1 h-4 w-4 flex-shrink-0 rounded-full bg-emerald-100 flex items-center justify-center">
                                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                                        </div>
                                            <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Button
                                variant={type.isPopular ? "default" : "outline"}
                                className={`w-full py-6 rounded-xl font-bold transition-all ${
                                    type.isPopular 
                                    ? "bg-amber-500 hover:bg-amber-600 shadow-lg shadow-amber-200" 
                                    : "border-slate-200 hover:bg-slate-50 text-slate-700"
                                }`}
                                onClick={() => {
                                    const pagesFeature = type.features.find(f => f.toLowerCase().includes('pages'));
                                    navigate('/dashboard/passport/apply', { 
                                        state: { 
                                            selectedType: {
                                                type: type.name.split(' ')[0],
                                                serviceType: type.serviceType,
                                                pages: pagesFeature
                                            } 
                                        } 
                                    });
                                }}
                            >
                            Apply for {type.name.split(' ')[0]}
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}