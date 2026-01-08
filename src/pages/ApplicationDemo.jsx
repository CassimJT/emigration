import { Button } from "@/components/ui/button"
import { 
  Dialog, 
  DialogContent, 
  DialogTrigger, 
  DialogHeader, 
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog"
import { PlayCircle, FileText, CreditCard, CalendarCheck, CheckCircle, Play, Sparkles } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function ApplicationDemo() {
  const navigate = useNavigate()

  return (
    <div className="w-full min-h-screen bg-background py-12 px-6">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            How to Apply
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Watch our step-by-step video guide or follow the simple process below to get your Malawi e-Passport.
          </p>
        </div>

        {/* Video Player Section */}
        <div className="relative group mb-16">
          <Dialog>
            <DialogTrigger asChild>
              <div className="relative w-full aspect-video bg-slate-900 rounded-2xl overflow-hidden shadow-2xl cursor-pointer ring-1 ring-white/10 hover:ring-orange-500/50 transition-all duration-500">
                {/* Custom Preview/Thumbnail */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent z-10" />
                <img 
                  src="src/assets/dashboard/passportApplication/applicationDemo.png" 
                  alt="Application Tutorial Thumbnail" 
                  className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                />
                
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <div className="h-16 w-16 sm:h-24 sm:w-24 rounded-full bg-orange-500/90 flex items-center justify-center shadow-[0_0_50px_-12px_rgba(249,115,22,0.5)] group-hover:scale-110 group-hover:bg-orange-500 transition-all duration-300">
                    <Play className="h-6 w-6 sm:h-10 sm:w-10 text-white fill-white ml-1" />
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8 z-20 text-white pr-4">
                  <div className="flex items-center gap-2 mb-2 sm:mb-3">
                    <span className="bg-orange-500 text-[10px] font-bold px-2 py-0.5 rounded tracking-wider uppercase">Video Guide</span>
                    <span className="text-xs text-slate-300 flex items-center gap-1 bg-white/10 backdrop-blur-md px-2 py-0.5 rounded">
                      <PlayCircle className="h-3 w-3" /> 3:45 
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-1 line-clamp-1 sm:line-clamp-none">Comprehensive Application Tutorial</h3>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-md line-clamp-2 sm:line-clamp-none">Learn the exact process of applying for your Malawian e-Passport from start to finish.</p>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-6 right-6 z-20">
                  <div className="flex gap-1">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-1 w-8 bg-white/20 rounded-full" />
                    ))}
                  </div>
                </div>
              </div>
            </DialogTrigger>
            
            <DialogContent className="sm:max-w-4xl p-0 overflow-hidden bg-black border-none ring-0">
              <DialogHeader className="sr-only">
                <DialogTitle>Application Tutorial Video</DialogTitle>
                <DialogDescription>
                  Watch our step-by-step guide on how to apply for a passport.
                </DialogDescription>
              </DialogHeader>
              <div className="aspect-video w-full">
                <iframe 
                  className="w-full h-full"
                  src="src/assets/dashboard/passportApplication/applicationDemo.mp4" 
                  title="Application Tutorial"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {[
            {
              title: "1. Fill Application",
              desc: "Complete the online form with your personal details and upload verified documents.",
              icon: FileText,
              color: "text-blue-500",
              bg: "bg-blue-50/50"
            },
            {
              title: "2. Make Payment",
              desc: "Pay securely using mobile money or bank transfer directly through the portal.",
              icon: CreditCard,
              color: "text-orange-500",
              bg: "bg-orange-50/50"
            },
            {
              title: "3. Schedule Visit",
              desc: "Book an appointment for biometric capture (fingerprints & photo) at your convenience.",
              icon: CalendarCheck,
              color: "text-green-500",
              bg: "bg-green-50/50"
            },
            {
              title: "4. Collect Passport",
              desc: "Receive notification when your passport is ready and collect it at the designated office.",
              icon: CheckCircle,
              color: "text-indigo-500",
              bg: "bg-indigo-50/50"
            }
          ].map((step, i) => (
            <Card key={i} className="border-none shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/50 backdrop-blur-sm ring-1 ring-black/5">
              <CardHeader className="pb-2">
                <div className={`w-12 h-12 rounded-xl ${step.bg} ${step.color} flex items-center justify-center mb-2 shadow-inner`}>
                  <step.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-lg">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center bg-orange-500 rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-16 relative overflow-hidden shadow-2xl shadow-orange-500/20">
          <div className="absolute top-0 right-0 p-8 text-white/10">
            <Sparkles className="h-32 w-32 rotate-12" />
          </div>
          <div className="relative z-10">
            <Badge variant="outline" className="text-white border-white/20 mb-6 px-4 py-1 rounded-full bg-white/5 backdrop-blur-sm">
              GET STARTED TODAY
            </Badge>
            <h2 className="text-2xl sm:text-4xl font-black mb-4 sm:mb-6 text-white tracking-tight leading-tight">Ready to get your<br className="sm:hidden" /> e-passport?</h2>
            <p className="text-orange-50 mb-8 sm:mb-10 max-w-xl mx-auto text-base sm:text-lg font-medium opacity-90 px-4 sm:px-0">
              Join thousands of Malawian citizens who have successfully applied for their e-passports online.
            </p>
            <Button size="lg" className="bg-white text-orange-600 hover:bg-white/90 rounded-full px-8 sm:px-12 h-12 sm:h-14 text-base sm:text-lg font-bold shadow-xl shadow-orange-900/10 transition-transform active:scale-95"
              onClick={() => navigate('/login')}
            >
              Start Application Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}