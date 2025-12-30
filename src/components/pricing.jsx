import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { CircleCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

const passports = [
  {
    name: "Ordinary Passport",
    price: 25000, // MWK
    description: "Standard passport for regular travel purposes.",
    features: [
      "Valid for 5 years",
      "32 pages",
      "Basic processing",
      "No expedited service",
    ],
    buttonText: "Apply for Ordinary Passport",
  },
  {
    name: "Official Passport",
    price: 50000, // MWK
    isRecommended: true,
    description: "Issued for government officials or official travel.",
    features: [
      "Valid for 5 years",
      "48 pages",
      "Priority processing",
      "Includes official designation",
    ],
    buttonText: "Apply for Official Passport",
    isPopular: true,
  },
  {
    name: "Diplomatic Passport",
    price: 100000, // MWK
    description: "Issued for diplomats and international representatives.",
    features: [
      "Valid for 5 years",
      "64 pages",
      "Expedited processing",
      "Diplomatic privileges included",
    ],
    buttonText: "Apply for Diplomatic Passport",
  },
];

const Pricing = () => {

  const navigate = useNavigate()
  const moveToIdentityPage = ()=> {
    navigate("/identity/verify")
    
  }
  return (
    <div className="flex flex-col items-center justify-center py-5 px-6 bg-gradient-to-b from-gray-50 to-white">
      <h2 className="text-5xl font-bold text-center tracking-[-0.03em] text-gray-900">
        Passport Types
      </h2>
      <p className="mt-3 text-lg md:text-xl text-center text-gray-600 max-w-2xl">
        Choose your passport type and apply securely online. Easy, fast, and safe processing for all applicants.
      </p>

      <div className="mt-12 sm:mt-16 max-w-7xl w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
        {passports.map((passport) => (
          <div
            key={passport.name}
            className={cn(
              "relative border rounded-2xl p-8 flex flex-col transition-transform duration-300 hover:scale-105 shadow-lg hover:shadow-2xl bg-white",
              { "border-2 border-primary bg-gradient-to-tr from-indigo-50 to-indigo-100": passport.isPopular }
            )}
          >
            {passport.isPopular && (
              <Badge className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-indigo-600 text-white px-3 py-1 rounded-full shadow-lg">
                Most Popular
              </Badge>
            )}
            <h3 className="text-xl font-semibold text-gray-900">{passport.name}</h3>
            <p className="mt-2 text-3xl font-bold text-gray-800"> MWK {passport.price.toLocaleString()} </p>
            <p className="mt-4 text-gray-600">{passport.description}</p>
            <Separator className="my-6" />
            <ul className="space-y-3">
              {passport.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <CircleCheck className="h-5 w-5 mt-1 text-green-500" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
            <Button
              variant={passport.isPopular ? "default" : "outline"}
              size="lg"
              className="w-full mt-8 rounded-xl text-base sm:text-lg break-words"
              onClick={moveToIdentityPage}
            >
              {passport.buttonText}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
