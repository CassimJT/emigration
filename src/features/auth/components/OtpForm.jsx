import { Button }from "@/components/ui/button";
import {
    InputOTP, 
    InputOTPGroup,
    InputOTPSlot,
    InputOTPSeparator, 
} from "@/components/ui/input-otp";
import home from "@/assets/home/home.png";
import { Card } from "@/components/ui/card"
import Logo from "@/assets/Logo.svg"
// w-full h-full rounded-2xl bg-gray-200 p-10 shadow-lg

export default function OTPPage() {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 ">

      {/* LEFT HALF */}
      <div className="flex items-center justify-center ">
        <Card className=" overflow-hidden p-0 mx-auto max-w-2xl w-full bg-gray-300 h-auto">
            <img
             src={Logo}
             alt="coart of arm logo"
             className="opacity-50 w-32 h-40 mx-auto"
            />
          <h2 className="mb-10 text-center text-lg font-semibold">
            Lets verify how you are
          </h2>

          {/* OTP */}
          {/* spacing card elements */}
          <div className="mt-20"></div> 

          <div className="flex justify-center mb-12 flex-col items-center gap-4" >
            <h2 className="text-center">Enter the OTP you received  via email</h2>
            <InputOTP maxLength={4}>
              <InputOTPGroup className="gap-2">
                <InputOTPSlot index={0} className="h-16 w-16 text-xl " />
                <InputOTPSlot index={1} className="h-16 w-16 text-xl" />
              </InputOTPGroup>  
                <InputOTPSeparator className="" />
              <InputOTPGroup className="gap-1">
                 <InputOTPSlot index={2} className="h-16 w-16 text-xl" />
                <InputOTPSlot index={3} className="h-16 w-16 text-xl" />
              </InputOTPGroup>
            </InputOTP>
             {/* Button */}
             <p>
                {/* resending OTP to be implemented */}
                Didn't receive the code? <a href="#" className="text-blue-500 hover:underline">Resend</a>
             </p>
          <div className="mt-10"></div>
          <div className="space-y-10 mt-20 ">
            <Button className="h-16 min-w-80 rounded-full bg-orange-400 text-black hover:bg-orange-500 text-lg font-bold">
                Verify Code
             </Button>
           </div>
          <div className="mt-32"></div>

          </div>

         
        </Card>
      </div>

      {/* RIGHT HALF */}
      <div className="flex items-center justify-center bg-slate-400 ">
        <img
          src={home}
          alt="Passport image"
          className="max-w-xl"
        />
      </div>

    </div>
  )
}
