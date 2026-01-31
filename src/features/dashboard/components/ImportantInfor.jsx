import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Info, ChevronDown, ChevronUp } from "lucide-react"
import passport from "@/assets/dashboard/overview/passport.png"
import { Button } from '@/components/ui/button'
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

export default function ImportantInformation() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

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

    const passportTypes = [
        {
            id: 1,
            name: 'Ordinary',
            description: 'Normal passport will be processed within 20 working days',
            price: 50000,
        },
        {
            id:2,
            name: 'Diplomatic',
            description: 'Diplomatic passport will be processed within 2 working days',
            price: 200000,
        },
        {
            id: 3,
            name: 'Express',
            description: 'Express passport will be processed within 2 working days',
            price: 150000,
        }
    ]

    return (
        <Card className="w-full border-l-4 border-l-amber-500 shadow-sm overflow-hidden transition-all duration-300">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center gap-4 p-4 bg-amber-50/50 hover:bg-amber-50 transition-colors text-left"
            >
                <div className="flex items-center gap-2">
                    <Info className="h-5 w-5 text-amber-600" />
                    <h3 className="font-semibold text-gray-900">Click here for more Information</h3>
                </div>
                {isOpen ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
            </button>
            
            <div 
                className={`
                    grid transition-all duration-300 ease-in-out
                    ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}
                `}
            >
                <div className="overflow-hidden">
                    <div className="p-4 pt-0 space-y-3 bg-amber-50/30">
                        <Separator className="bg-amber-200/50 mb-3" />
                        <ul className="space-y-3">
                            {importantInformation.map((info) => (
                                <li key={info.id} className="flex gap-3 text-sm text-gray-700 leading-relaxed">
                                    <span className="flex-shrink-0 flex h-5 w-5 items-center justify-center rounded-full bg-amber-100 text-xs font-medium text-amber-700 mt-0.5">
                                        {info.id}
                                    </span>
                                    <span>{info.information}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    
                </div>
            </div>

            <div className="p-4 pt-0 space-y-3 bg-amber-50/30">
                        <Separator className="bg-amber-200/50 mb-3" />
                        <h3 className="text-lg font-semibold mb-4 text-slate-600">
                            Passport Types
                        </h3>
                    <div className='flex flex-col sm:flex-row gap-y-4 items-center sm:justify-between'>
                    <ScrollArea className="w-full whitespace-nowrap rounded-md pb-4">
                    <div className="flex w-full space-x-2 py-4">
                    {passportTypes.map((type) => (
                    <div key={type.id} className="flex-shrink-0 flex gap-2 flex-col items-center text-sm text-gray-700 leading-relaxed min-w-[150px]">
                        <span className="flex h-5 w-auto justify-center rounded-full text-xs font-black text-slate-500 mt-0.5">
                            {type.name}
                        </span>
                        <img src={passport} 
                            alt="passport" 
                            className="w-18 h-18 object-cover rounded-md shadow-sm" />
                        <span className='font-bold bg-slate-200 px-3 py-1 rounded-full border border-amber-500 text-slate-500'>
                            MK {type.price.toLocaleString()}
                        </span>
                        </div>
                    ))}
                    </div>
                            <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                        <Button
                            variant="default"
                            className=" sm:w-1/3 bg-amber-500 hover:bg-amber-600 rounded-full mr-[20%]"
                            onClick={() => navigate('/dashboard/passport/apply')}
                        >
                            Apply Now
                        </Button>
                    </div>
                </div>
        </Card>
    );
}
