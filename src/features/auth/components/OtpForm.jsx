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
            {/* <Label htmlFor="Username" className="font-bold text-lg">National ID</Label>
              <Input className="rounded-xl border-opacity-30 border-black h-14 w-80 placeholder:text-lg placeholder:text-gray-500 text-lg"
                id="nationalId" type="nationalId" 
                placeholder="Enter National ID" 
                required /> */}
                  <div className="flex items-center flex-col gap-2">
                  <p>Enter the OTP we sent via your email</p>
                 <InputOTP maxLength={4}>
                  <InputOTPGroup className="flex gap-4" >
                     <InputOTPSlot 
                      index={0} 
                       style={{ 
                        borderRadius: '8px',
                        border: '2px solid black',
                       height: '64px',
                       width: '64px',
                       fontSize: '32px',
                     }}
                    />
                   <InputOTPSlot
                      index={1} 
                    style={{ 
                       borderRadius: '8px',
                        border: '2px solid black',
                        height: '64px',
                        width: '64px',
                         fontSize: '32px'
                     }}
                    />
                    <InputOTPSlot 
                      index={2}  
                     style={{ 
                        borderRadius: '8px',
                        border: '2px solid black',
                     height: '64px',
                       width: '64px',
                        fontSize: '32px'
                     }}
                   />
                  <InputOTPSlot 
                    index={3}  
                     style={{ 
                       borderRadius: '8px',
                       border: '2px solid black',
                     height: '64px',
                      width: '64px',
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
                  className="h-14 w-60 rounded-full bg-yellow-500 text-black hover:bg-yellow-600 text-xl font-bold" >
                  Verify
                </Button>
              {/* link to be implemented */}
            </div> 
      </form>
  )
}