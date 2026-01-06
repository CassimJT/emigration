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
  const moveToLoginPage = ()=> {
    navigate("/login")
  }  
  return (
   
    <div className={cn("flex flex-col gap-6 h-screen ", className)} {...props}>
      <Card className="h-screen w-screen">
        <CardContent className="grid p-0 md:grid-cols-2 h-0">
          <form className="p-6 md:p-8 pb-12 bg-gray-300">
            <div className="flex flex-col gap-6 pb-20 justify-between">
              <div className="flex flex-col gap-8 items-center text-center ">
                 <img
                   src={Logo}
                   alt="coart of arm logo"
                   className="opacity-50 w-32 h-40 mx-auto"
                />
                <h1 className="text-lg font-bold">Lets verify who you are</h1>
                <p>Enter the OTP received via your email</p>
                <div className="flex items-center">
               
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
              
              <div className="flex items-center justify-center gap-8 mt-6 mb-8">
                <Button 
                  onClick={moveToLoginPage}
                  type="submit"
                  className="h-16 w-64 rounded-full bg-orange-400 text-black hover:bg-orange-500 text-lg font-bold" >
                  Verify
                </Button>
                {/* link to be implemented */}
               
              </div>
            </div>
          </form>
        
          <div className="md:flex items-center justify-center bg-muted p-8 h- bg-blue-600">
            <img
              src={home}
              alt="e-passport"
              className="max-w-full max-h-full object-contain" />
          </div>
        </CardContent>
      </Card> 
    </div>
  )
}