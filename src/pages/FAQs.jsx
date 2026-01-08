import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function FAQs() {
  const faqs = [
    {
      question: "How long does it take to get a passport?",
      answer: "Processing times vary by type. Normal passports take approximately 20 working days. Express passports take 2-5 working days, and Diplomatic/Service passports take about 2 working days."
    },
    {
      question: "What documents do I need to apply?",
      answer: "You typically need a valid National ID, proof of citizenship (for non-Malawians by birth), and a set of fingerprints collected at the passport office. For children, a birth certificate and parent's ID are required."
    },
    {
      question: "Can I apply for a passport if I am outside Malawi?",
      answer: "Yes, you can initiate the application online. However, biometric capture (fingerprints and photo) must currently be done at a designated Malawian Embassy or Passport Office."
    },
    {
      question: "How do I pay for my passport?",
      answer: "Payments can be made directly through the portal using mobile money (Airtel Money, Mpamba) or bank integration. Physical payments at the counter are also accepted but online payment is recommended for speed."
    },
    {
      question: "What happens if I lose my passport?",
      answer: "Report the loss immediately to the Police and get a Police Report. Then, apply for a replacement passport through this portal, attaching the Police Report as a supporting document."
    },
    {
      question: "Is my data secure?",
      answer: "Yes. The e-Passport system uses advanced encryption and is integrated with the National Registration Bureau to ensure data integrity and security."
    }
  ]

  return (
    <div className="w-full min-h-screen bg-background py-12 px-6">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-lg text-gray-600 text-center mb-12">
          Find answers to common questions about the passport application process.
        </p>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left text-base font-medium">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}