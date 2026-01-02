import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Logo from "@/assets/Logo.svg"
import LoginAvatar from "@/assets/LoginAvatar.png"
import { Link } from "react-router-dom"

export function LoginForm({
  className,
  ...props

}) {
   
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8 pb-12 bg-gray-300">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                 <img
                   src={Logo}
                   alt="coart of arm logo"
                   className="opacity-50 w-32 h-40 mx-auto"
                />

                <h1 className="text-2xl font-bold">Log In</h1>
               
              </div>
              <div className="grid gap-2">
                <Label htmlFor="Username" className="font-bold text-lg">Email</Label>
                <Input 
                    className="rounded-xl border-opacity-30 border-black h-14 placeholder:text-lg placeholder:text-gray-500"
                    id="email" type="email" 
                    placeholder="Enter username" 
                    required />
              </div>
              <div className="grid gap-4">
                <div className="flex items-center">
                  <Label htmlFor="password" className="font-bold text-lg">Password</Label>
                  <a href="#" className="ml-16 text-blue-500 text-sm underline-offset-2 hover:underline">
                    Forgot your password?
                  </a>
                </div>
                <Input 
                  className="rounded-xl border-opacity-30 border-black h-14 placeholder:text-lg placeholder:text-gray-500"
                  id="password" 
                  type="password" 
                  placeholder="Enter password"
                  required 
                />
              </div>
            
              <div className="flex items-center justify-center gap-8 mt-6 mb-8">
                <Button 
                  type="submit"
                  className="h-12 w-32 rounded-full bg-orange-400 text-black hover:bg-orange-500 text-lg font-bold" >
                  Log In
                </Button>
                {/* link to be implemented */}
                <Link
                 to ="/signup" 
                  className="ml-16 text-lg text-blue-500 hover:underline"
                >
                  Create account
                </Link>
              </div>
            </div>
          </form>
        
          <div className="md:flex items-center justify-center bg-muted p-8">
            <img
              src={LoginAvatar}
              alt="Login avatar"
              className="max-w-full max-h-full object-contain" />
          </div>
        </CardContent>
      </Card> 
    
    </div>
  );
}
