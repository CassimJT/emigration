import React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Logo from "@/assets/Logo.svg"
import { Link } from "react-router-dom"
import { useState } from "react"
import { Loader2, Eye, EyeOff } from "lucide-react"


export default function SignupForm({
  onSubmit,
  values,
  loading,
  className,
  onChange,
  error,
  ...props
}) {

  //state for password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  return (
    <form 
      onSubmit={onSubmit}
      className={cn("flex flex-col gap-6 p-6 md:p-8 pb-12 bg-gray-200 rounded-xl", className)} 
      {...props}
    >
      <div className="flex flex-col items-center gap-1 text-center">
        <img
          src={Logo}
          alt="Government Logo"
          className="opacity-50 w-32 h-32 mx-auto"
        />
        <h1 className="text-xl font-bold">Create Account</h1>
        <p className="text-sm text-gray-600">Join us to start your application process</p>
      </div>
       {/* error message display */}
         {error && (
          <p className="text-sm text-red-600 mt-1">
            {error}
          </p>
        )}
      <div className="grid gap-3 mt-4">
        <div className="grid gap-1.5">
          <Label htmlFor="email" className="font-bold text-base">Email</Label>
          <Input 
            className="rounded-xl border-opacity-30 border-black h-12 placeholder:text-gray-500 text-lg"
            id="email" 
            name="email"
            type="email"
            value={values.email}
            placeholder="Enter your email" 
            required 
            disabled={loading}
            onChange={onChange}
          />
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="password" className="font-bold text-base">Password</Label>

          <div className="relative">
           <Input 
            className="rounded-xl border-opacity-30 border-black h-12 placeholder:text-gray-500 text-lg" 
            id="password" 
            name="password"
            type={showPassword ? "text" : "password"} 
            value={values.password}
            placeholder="Create a password" 
            required 
            disabled={loading}
            onChange={onChange}
          />
          <button
              type="button"
              variant="ghost"
              onClick={togglePasswordVisibility}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        
        </div>
          
        <div className="grid gap-1.5">
          <Label htmlFor="confirmPassword" className="font-bold text-base">Confirm Password</Label>
          <div className="relative"> 
          <Input 
            className="rounded-xl border-opacity-30 border-black h-12 placeholder:text-gray-500 text-lg"
            id="confirmPassword" 
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"} 
            value={values.confirmPassword}
            placeholder="Confirm your password" 
            required 
            disabled={loading}
            onChange={onChange}
          />
          <button
              type="button"
              variant="ghost"
              onClick={toggleConfirmPasswordVisibility}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 "
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
         
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 mt-4">
        <Button 
          size="lg"
          type="submit"
          disabled={loading}
          className="rounded-full text-base w-full max-w-[240px] h-12 bg-orange-500 hover:bg-orange-400 font-semibold" 
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating Account...
            </>
          ) : (
            "Sign Up"
          )}
        </Button>

        <div className="text-sm">
          <span>Already have an account? </span>
          <Link 
            to="/login"
            className="font-semibold text-blue-600 hover:underline"
          >
            Log in
          </Link>
        </div>
      </div> 
    </form>
  )
}

  