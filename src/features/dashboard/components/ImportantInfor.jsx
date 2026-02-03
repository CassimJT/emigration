import { useState } from 'react'
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Info, ChevronDown, ChevronUp } from "lucide-react"

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



    