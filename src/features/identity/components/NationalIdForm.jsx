import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import Logo from "@/assets/Logo.svg"
import { useNavigate } from "react-router-dom"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"

export default function LoginForm({
  className,
  ...props

}) {
  const navigate = useNavigate()
  const moveToLoginPage = ()=> {
    navigate("/login")
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
          <Label htmlFor="Username" className="font-bold text-lg">National ID</Label>
            <Input className="rounded-xl border-opacity-30 border-black h-14 w-80 placeholder:text-lg placeholder:text-gray-500 text-lg"
              id="nationalId" type="nationalId" 
              placeholder="Enter National ID" 
              required />
         </div>
          <div className="flex items-center justify-center gap-8 mt-20 mb-36">
              <Button 
                onClick={moveToLoginPage}
                type="submit"
                className="rounded-full text-base w-60 h-12 bg-orange-500 hover:bg-orange-400" >
                Verify
              </Button>
            {/* link to be implemented */}
          </div> 
    </form>
  )
}