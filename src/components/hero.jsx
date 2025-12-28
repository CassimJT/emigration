import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, CirclePlay } from "lucide-react";
import { Link } from "react-router-dom";
import home from "@/assets/home/home.png";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate()
  const moveToIdentityPage = ()=> {
    navigate("/identity/verify")
  }
  return (
    <div className="w-full flex items-center justify-center overflow-hidden py-12 md:py-20 lg:py-24">
      <div className="max-w-screen-xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 px-6">

        {/* Text Section */}
        <div className="flex flex-col justify-center text-center lg:text-left">
          <Badge variant="secondary" className="rounded-full py-1 px-3 border-border" asChild>
            <Link to="#">
              Just released v1.0.0 <ArrowUpRight className="ml-1 h-4 w-4 inline" />
            </Link>
          </Badge>

          <h1 className="mt-6 max-w-full sm:max-w-[24ch] md:max-w-[28ch] text-3xl sm:text-4xl md:text-5xl lg:text-[2.75rem] xl:text-[3.25rem] font-semibold leading-snug sm:leading-[1.2] tracking-tight">
            Welcome to the e-Passport Portal
          </h1>

          <p className="mt-4 sm:mt-6 max-w-full md:max-w-[60ch] text-base sm:text-lg md:text-xl text-foreground/80">
            Easily apply, pay, and monitor the status of your passport application online, ensuring a fast, safe, and hassle-free process.
          </p>

          <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <Button size="lg" className="rounded-full w-full sm:w-auto text-base bg-orange-400"
              onClick={moveToIdentityPage}
            >
              Get Started <ArrowUpRight className="h-5 w-5 inline ml-1" />
            </Button>
            <Button variant="outline" size="lg" className="rounded-full w-full sm:w-auto text-base shadow-none">
              <CirclePlay className="h-5 w-5 inline mr-1" /> Watch Demo
            </Button>
          </div>
        </div>

        {/* Image Section */}
        <div className="flex justify-center items-center bg-slate-100 rounded-xl overflow-hidden">
          <img src={home} alt="e-Passport" className="w-full max-w-md md:max-w-lg lg:max-w-full h-auto object-contain" />
        </div>

      </div>
    </div>
  );
}
