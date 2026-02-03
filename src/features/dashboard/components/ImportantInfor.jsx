import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Info, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from '@/components/ui/button'
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

export default function ImportantInformation() {
    const [isOpen, setIsOpen] = useState(false);

    const importantInformation = [
        {
            id: 1,
            information: 'A Malawi Passport is issued to a Malawian citizen Only',
        },
        {
            id: 2,
            information: 'A Passport can only be issued to a Malawian who is in possession of Malawi National Identity Card',
        },  
        {
            id: 3,
            information: 'Applicants must be verified by National Registration bureau',
        },
        {
            id: 4,
            information: 'Children under 10 year of age will be issued passports valid for 5 years. Failure to provide all required information and supporting documents can delay issuance of the passport',
        },
        {
            id: 5,
            information: 'The normal passport will be processed within 20 working days',
        },
        {
            id: 6,
            information: 'Urgent passport will be processed within 5 working days',
        },
        {
            id: 7,
            information: 'The Express passport will be processed within 2 working days',
        },
        {
            id: 8,
            information: 'The Diplomatic/Service will be processed within 2 working days',
        },
        {
            id: 9,
            information: 'A full set of fingerprints will be required when collecting the passport. Supporting documents of citizenship will be required from applicants who are not Malawian by birth',
        },
        {
            id: 10,
            information: 'A child will be issued with his/her own passport. If not in the possession of national identity card , parent\'s/guardian\'s national identity card will be used.',
        }
    ]

    return (
        <Card className="w-full border-l-4 border-l-amber-500 shadow-lg overflow-hidden transition-all duration-300 bg-white">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-6 bg-slate-50/50 hover:bg-slate-50 transition-colors text-left group"
            >
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-amber-100/50 text-amber-600 group-hover:scale-110 transition-transform">
                        <Info className="h-5 w-5" />
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-800">Essential Information</h3>
                        <p className="text-xs text-slate-500 font-medium">Read before you start your application</p>
                    </div>
                </div>
                {isOpen ? (
                    <ChevronUp className="h-5 w-5 text-slate-400" />
                ) : (
                    <ChevronDown className="h-5 w-5 text-slate-400" />
                )}
            </button>
            
            <div 
                className={`
                    grid transition-all duration-300 ease-in-out
                    ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}
                `}
            >
                <div className="overflow-hidden">
                    <div className="p-6 pt-0 space-y-4">
                        <Separator className="bg-slate-100 mb-6" />
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                            {importantInformation.map((info) => (
                                <li key={info.id} className="flex gap-4 text-[13px] text-slate-600 leading-relaxed group/item">
                                    <span className="flex-shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-[10px] font-bold text-slate-500 group-hover/item:bg-amber-100 group-hover/item:text-amber-600 transition-colors">
                                        {info.id}
                                    </span>
                                    <span className="pt-0.5">{info.information}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </Card>
    );
}

///////////////////////////////PASSPORT TYPES COMPONENT/////////////////////////////////////

export function PassportTypes() {
    const navigate = useNavigate();

    const passportTypes = [
        {
            id: 1,
            name: "Ordinary Passport",
            price: 25000,
            description: "Standard passport for regular travel purposes.",
            features: [
                "Valid for 5 years",
                "32 pages",
                "Basic processing",
                "No expedited service",
            ],
            isPopular: false
        },
        {
            id: 2,
            name: "Official Passport",
            price: 50000,
            description: "Issued for government officials or official travel.",
            features: [
                "Valid for 5 years",
                "48 pages",
                "Priority processing",
                "Includes official designation",
            ],
            isPopular: true
        },
        {
            id: 3,
            name: "Diplomatic Passport",
            price: 100000,
            description: "Issued for diplomats and international representatives.",
            features: [
                "Valid for 5 years",
                "64 pages",
                "Expedited processing",
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
                                onClick={() => navigate('/dashboard/passport/apply')}
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
    