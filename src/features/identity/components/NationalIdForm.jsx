import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Logo from "@/assets/Logo.svg"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import home from "@/assets/home/home.png"

export default function LoginForm({
  className,
  ...props

}) {
  const navigate = useNavigate()
  const moveToOtpPage = ()=> {
    navigate("/otp")
  }  
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8 pb-12 bg-gray-300">
            <div className="flex flex-col gap-6 pb-20">
              <div className="flex flex-col gap-8 items-center text-center ">
                 <img
                   src={Logo}
                   alt="coart of arm logo"
                   className="opacity-50 w-32 h-40 mx-auto"
                />
                <h1 className="text-lg font-bold">Lets verify who you are</h1>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="Username" className="font-bold text-lg">National ID</Label>
                <Input 
                    className="rounded-xl border-opacity-30 border-black h-14 placeholder:text-lg placeholder:text-gray-500"
                    id="nationalId" type="nationalId" 
                    placeholder="Enter National ID" 
                    required />
              </div>
            
              {/* text-center text-sm flex flex-row gap-4 mb-20 */}
              <div className="flex items-center justify-center gap-8 mt-6 mb-8">
                <Button 
                  onClick={moveToOtpPage}
                  type="submit"
                  className="h-16 w-64 rounded-full bg-orange-400 text-black hover:bg-orange-500 text-lg font-bold" >
                  Verify
                </Button>
                {/* link to be implemented */}
               
              </div>
            </div>
          </form>
        
          <div className="md:flex items-center justify-center bg-muted p-8">
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
