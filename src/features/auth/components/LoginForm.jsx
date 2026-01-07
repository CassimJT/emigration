import React from "react"
import { cn } from "@/lib/utils"
import Logo from "@/assets/Logo.svg"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {Card, CardContent} from "@/components/ui/card"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"

export default function LoginForm({ phoneNumber, onChange, onSubmit, loading , className, ...props }) {

  const navigate = useNavigate()
  const moveToOtpPage = ()=> {
    navigate("/otp")
  }

  return (
    
        <form className={cn("flex flex-col gap-6 p-6 md:p-8 pb-12 bg-gray-200 rounded-xl", className)} {...props}>
          
            <div className="flex flex-col items-center gap-1 text-center">
             <img
              src={Logo}
              alt="coart of arm logo"
              className="opacity-50 w-40 h-40 mx-auto"
            />
              <h1 className="text-lg font-semibold">Log In</h1>
            </div>
            
            <div className="grid gap-4 mt-6 items-center justify-center">
              <Label htmlFor="Username" className="font-bold text-lg">Username</Label>
                <Input className="rounded-xl border-opacity-30 border-black h-14 w-80 placeholder:text-lg placeholder:text-gray-500 text-lg"
                  id="nationalId" type="nationalId" 
                  placeholder="Enter username" 
                  required />

              <Label htmlFor="Username" className="font-bold text-lg">Password</Label>
                <Input className="rounded-xl border-opacity-30 border-black h-14 w-80 placeholder:text-lg placeholder:text-gray-500 text-lg"
                  id="nationalId" type="nationalId" 
                  placeholder="Enter password" 
                  required />
             </div>
              <div className="flex flex-row items-center justify-center gap-8 mt-6 mb-20">
                <Button size="lg"
                  onClick={moveToOtpPage}
                  type="submit"
                  className="rounded-full text-base w-40 h-12 bg-orange-500 hover:bg-orange-400" >
                     
                  Log in
                </Button>
                 <Link 
                  to="/signup"
                  className=" text-sm font-semibold text-blue-600 hover:underline">
                  Create account
                 </Link>
                {/* link to be implemented */}
              </div> 
        </form>
 )
}       