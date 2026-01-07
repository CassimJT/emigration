import { Button }from "@/components/ui/button";
import {
    InputOTP, 
    InputOTPGroup,
    InputOTPSlot,
    InputOTPSeparator, 
} from "@/components/ui/input-otp";
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Logo from "@/assets/Logo.svg"
import { useNavigate } from "react-router-dom"
import home from "@/assets/home/home.png"


export default function LoginForm({
  className,
  ...props

}) {
  const navigate = useNavigate()
  const moveToDashboardPage = ()=> {
    navigate("/dashboard")
  }  
  return (

      <form className={cn("flex flex-col gap-6 p-6 md:p-8 pb-12 bg-gray-200 rounded-xl", className)} {...props}>
        
          <div className="flex flex-col items-center gap-1 text-center">
           <img
            src={Logo}
            alt="coart of arm logo"
            className="opacity-50 w-40 h-40 mx-auto"
          />
            <h1 className="text-lg font-semibold">Lets verify who you are</h1>
          </div>
          
          <div className="grid gap-2 mt-6 items-center justify-center">
              <div className="flex items-center flex-col gap-2">
                  <p>Enter the OTP we sent you via email</p>
                 <InputOTP maxLength={4}>
                  <InputOTPGroup className="flex gap-4" >
                     <InputOTPSlot 
                      index={0} 
                       style={{ 
                        borderRadius: '8px',
                        border: '2px solid black',
                        height: '56px',
                        width: '56px',
                        fontSize: '32px',
                     }}
                    />
                   <InputOTPSlot
                      index={1} 
                    style={{ 
                       borderRadius: '8px',
                        border: '2px solid black',
                        height: '56px',
                        width: '56px',
                         fontSize: '32px'
                     }}
                    />
                    <InputOTPSlot 
                      index={2}  
                     style={{ 
                      borderRadius: '8px',
                       border: '2px solid black',
                       height: '56px',
                       width: '56px',
                       fontSize: '32px'
                     }}
                   />
                  <InputOTPSlot 
                    index={3}  
                     style={{ 
                      borderRadius: '8px',
                      border: '2px solid black',
                      height: '56px',
                      width: '56px',
                      fontSize: '32px'
                     }}
                   />
               </InputOTPGroup>
                </InputOTP>
                 </div>
              </div>
           
            <div className="flex items-center justify-center gap-8 mt-20 mb-36">
                <Button 
                  onClick={moveToDashboardPage}
                  type="submit"
                  className="rounded-full text-base w-60 h-12 bg-orange-500 hover:bg-orange-400" >
                  Verify
                </Button>
              {/* link to be implemented */}
            </div> 
      </form>
  )
}