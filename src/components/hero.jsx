import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, CirclePlay, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import home from "@/assets/home/home.png";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate()
  const moveToIdentityPage = ()=> {
    navigate("/identity/verify")
  }

  return (
    <div className="relative w-full flex items-center justify-center overflow-hidden py-20 lg:py-32 bg-slate-50/50 min-h-[650px] lg:min-h-0">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-100/20 via-transparent to-transparent -z-10" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl opacity-50" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl opacity-50" />

      {/* Background Image for Mobile Only */}
      <div className="absolute inset-0 lg:hidden overflow-hidden pointer-events-none">
        <img 
          src={home} 
          alt="" 
          className="w-full h-full object-cover opacity-[0.5] scale-110 blur-[1px]" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-transparent to-slate-50" />
      </div>

      <div className="max-w-screen-xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 px-6 relative z-10">

        {/* Text Section */}
        <div className="flex flex-col justify-center text-center lg:text-left order-2 lg:order-1 relative z-20">
          <div className="flex flex-col items-center lg:items-start gap-4 mb-8">
            <Badge variant="secondary" className="rounded-full py-1 px-4 border-border w-fit shadow-sm text-foreground/70" asChild>
              <Link to="#">
                Just released v1.0.0 <ArrowUpRight className="ml-1 h-3.5 w-3.5 inline" />
              </Link>
            </Badge>
            <Badge variant="outline" className="rounded-full py-1.5 px-4 border-orange-200 bg-orange-50 text-orange-700 font-medium flex items-center gap-2 animate-fade-in shadow-sm w-fit">
              <Sparkles className="h-3.5 w-3.5 fill-orange-500 text-orange-500" />
              <span>Modernizing Malawian Identity</span>
            </Badge>
          </div>

          <h1 className="max-w-full sm:max-w-xl md:max-w-2xl text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-slate-900 leading-[1.1] tracking-tight">
            Secure Your Future with the <span className="text-orange-500">e-Passport</span>
          </h1>

          <p className="mt-8 max-w-full md:max-w-[55ch] text-lg sm:text-xl text-slate-600 leading-relaxed font-medium">
            Experience the next generation of identity services. Apply, pay, and track your passport application with unparalleled ease and security.
          </p>

          <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center sm:items-start gap-5">
            <button 
              className="inline-flex items-center justify-center rounded-full w-full sm:w-auto px-10 h-14 text-lg font-bold bg-orange-500 text-white hover:bg-orange-600 shadow-xl shadow-orange-500/20 transition-all active:scale-95 group"
              onClick={moveToIdentityPage}
            >
              Get Started Now <ArrowUpRight className="h-5 w-5 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
            <Button variant="ghost" size="lg" className="rounded-full w-full sm:w-auto h-14 px-8 text-lg font-semibold text-slate-700 hover:bg-slate-100 transition-all flex items-center justify-center gap-2">
              <CirclePlay className="h-6 w-6 text-orange-500" /> Watch Demo
            </Button>
          </div>
        </div>

        {/* Image Section - Desktop Only or Specialized Mobile Layout */}
        <div className="hidden lg:flex relative justify-center items-center order-1 lg:order-2 group">
          <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/10 to-transparent rounded-[2.5rem] rotate-3 group-hover:rotate-6 transition-transform duration-500" />
          <div className="relative w-full max-w-lg lg:max-w-full aspect-square sm:aspect-auto sm:h-[500px] bg-white rounded-3xl overflow-hidden shadow-2xl ring-1 ring-slate-200 backdrop-blur-sm">
            <img 
              src={home} 
              alt="Malawi e-Passport Display" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
            />
            {/* Overlay Gradient for Image */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent pointer-events-none" />
          </div>
          
          {/* Decorative Tag */}
          <div className="absolute -bottom-6 -right-6 hidden sm:flex bg-white p-4 rounded-2xl shadow-2xl ring-1 ring-slate-100 animate-bounce-slow">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                <ArrowUpRight className="h-6 w-6" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Processing Time</p>
                <p className="text-sm font-black text-slate-900">5-7 Working Days</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
