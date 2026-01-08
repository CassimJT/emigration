import { Separator } from "@/components/ui/separator"
import { CheckCircle2, Globe, ShieldCheck, Zap, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import homeImage from "@/assets/home/home.png"

export default function About() {
  return (
    <div className="w-full min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative w-full flex items-center justify-center overflow-hidden py-20 lg:py-32 bg-slate-50/50 min-h-[600px] lg:min-h-0">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-100/20 via-transparent to-transparent -z-10" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl opacity-50" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl opacity-50" />

        {/* Background Image for Mobile Only */}
        <div className="absolute inset-0 lg:hidden overflow-hidden pointer-events-none">
          <img 
            src={homeImage} 
            alt="" 
            className="w-full h-full object-cover opacity-[0.5] scale-110 blur-[1px]" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-transparent to-slate-50" />
        </div>

        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <div className="flex flex-col justify-center text-center lg:text-left order-2 lg:order-1 relative z-20">
            <div className="flex justify-center lg:justify-start">
              <Badge variant="outline" className="rounded-full py-1.5 px-4 border-orange-200 bg-orange-50 text-orange-700 font-medium flex items-center gap-2 mb-8 animate-fade-in shadow-sm">
                <Sparkles className="h-3.5 w-3.5 fill-orange-500 text-orange-500" />
                <span>Malawi Digital Transformation</span>
              </Badge>
            </div>
            
            <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl leading-[1.1]">
              About the <span className="text-orange-500">e-Passport</span> System
            </h1>
            <p className="mt-8 text-lg sm:text-xl leading-relaxed text-slate-600 font-medium max-w-2xl mx-auto lg:mx-0">
              Revolutionizing identity management in Malawi. Our mission is to provide secure, efficient, and accessible passport services to every citizen through digital innovation.
            </p>
          </div>

          {/* Image Section - Desktop Only */}
          <div className="hidden lg:flex relative justify-center items-center order-1 lg:order-2 group">
            <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/10 to-transparent rounded-[2.5rem] rotate-3 group-hover:rotate-6 transition-transform duration-500" />
            <div className="relative w-full aspect-square bg-white rounded-3xl overflow-hidden shadow-2xl ring-1 ring-slate-200 backdrop-blur-sm">
              <img 
                src={homeImage} 
                alt="Malawian Passport Identity" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Why Digital?</h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              We are transitioning from manual processing to a fully integrated digital ecosystem.
            </p>
          </div>
          
          <dl className="mt-16 grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-3">
            {[
              {
                name: 'Secure Identity',
                description: 'Biometric integration with the National Registration Bureau ensures that every passport verification is accurate and fraud-proof.',
                icon: ShieldCheck,
              },
              {
                name: 'Global Standards',
                description: 'Our e-passports are compliant with ICAO standards, facilitating easier travel and global recognition for Malawian citizens.',
                icon: Globe,
              },
              {
                name: 'Fast Processing',
                description: 'Automated workflows reduce waiting times from months to days. Apply online, track status in real-time, and get notified instantly.',
                icon: Zap,
              },
            ].map((feature) => (
              <div key={feature.name} className="flex flex-col items-start text-left">
                <div className="rounded-lg bg-slate-100 p-2 ring-1 ring-slate-200">
                  <feature.icon className="h-6 w-6 text-indigo-600" aria-hidden="true" />
                </div>
                <dt className="mt-4 font-semibold text-gray-900">{feature.name}</dt>
                <dd className="mt-2 leading-7 text-gray-600">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      
      <Separator className="my-10 max-w-7xl mx-auto" />

      {/* Values Section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-10 pb-24">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Core Values</h3>
          <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {['Integrity', 'Efficiency', 'Accessibility', 'Security', 'Innovation', 'Customer Focus'].map((value) => (
              <li key={value} className="flex items-center space-x-3 bg-white p-4 rounded-lg border shadow-sm">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span className="text-gray-700 font-medium">{value}</span>
              </li>
            ))}
          </ul>
      </div>
    </div>
  )
}
