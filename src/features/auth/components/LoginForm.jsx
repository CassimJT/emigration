<<<<<<< HEAD
import React from "react"
import { useState } from "react"
=======
>>>>>>> ed3612eff1e47890ca40ffb7cce284e924e0fcc8
import { cn } from "@/lib/utils"
import Logo from "@/assets/Logo.svg"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { Loader2 } from "lucide-react"
import { AUTH_FLOW } from "@/utils/constants"
import { useAuth } from "../hooks/useAuth"

<<<<<<< HEAD

export default function LoginForm() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [emailAddress, setEmailAddress] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)  

  const handleLogin = (e) => {
    e.preventDefault()
    console.log("Logging in with:", { emailAddress, password })
    setLoading(true)
     login({ emailAddress, password })
      .then((data) => {
        if (data.status === "success") {
          navigate("/otp",
            { state: { flowType: AUTH_FLOW.DASHBOARD } }
          )
        } else {
          alert("Login failed. Please check your credentials and try again.")
        }
      })
      .catch((err) => {
        console.error("Login error:", err)
        alert("An error occurred during login. Please try again.")
      }).finally(() => {
        setLoading(false)
      })     
  }

   

  return (
    <form 
      onSubmit={handleLogin}
      className={cn("flex flex-col gap-6 p-6 md:p-8 pb-12 bg-gray-200 rounded-xl")} 
=======
export default function LoginForm({
  values,
  onChange,
  onSubmit,
  error,
  loading,
  className,
  ...props
}) {
  return (
    <form
      onSubmit={onSubmit}
      className={cn(
        "flex flex-col gap-6 p-6 md:p-8 pb-12 bg-gray-200 rounded-xl",
        className
      )}
      {...props}
>>>>>>> ed3612eff1e47890ca40ffb7cce284e924e0fcc8
    >
      <div className="flex flex-col items-center gap-1 text-center">
        <img
          src={Logo}
          alt="Government Logo"
          className="opacity-50 w-32 h-32 mx-auto"
        />
        <h1 className="text-xl font-bold">Log In</h1>
        <p className="text-sm text-gray-600">
          Enter your credentials to access your account
        </p>
      </div>

      <div className="grid gap-3 mt-4">
        {error && (
          <p className="text-sm text-red-600 mt-1 text-center">{error}</p>
        )}

        <div className="grid gap-1.5">
<<<<<<< HEAD
          <Label htmlFor="username" className="font-bold text-base">Username</Label>
          <Input 
            className="rounded-xl border-opacity-30 border-black h-12 placeholder:text-gray-500 text-lg"
            onChange={(e) => setEmailAddress(e.target.value)}
            id="emailAddress" 
            name="emailAddress"
            type="text" 
            placeholder="Enter email address" 
            required 
=======
          <Label htmlFor="email" className="font-bold text-base">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Enter email"
            autoComplete="email"
            required
>>>>>>> ed3612eff1e47890ca40ffb7cce284e924e0fcc8
            disabled={loading}
            value={values.email}
            onChange={onChange}
            className="rounded-xl border-opacity-30 border-black h-12 placeholder:text-gray-500 text-lg"
          />
        </div>

        <div className="grid gap-1.5">
<<<<<<< HEAD
          <Label htmlFor="password" className="font-bold text-base">Password</Label>
          <Input 
            className="rounded-xl border-opacity-30 border-black h-12 placeholder:text-gray-500 text-lg"
            onChange={(e) => setPassword(e.target.value)}
            id="password" 
=======
          <Label htmlFor="password" className="font-bold text-base">
            Password
          </Label>
          <Input
            id="password"
>>>>>>> ed3612eff1e47890ca40ffb7cce284e924e0fcc8
            name="password"
            type="password"
            placeholder="Enter password"
            autoComplete="current-password"
            required
            disabled={loading}
            value={values.password}
            onChange={onChange}
            className="rounded-xl border-opacity-30 border-black h-12 placeholder:text-gray-500 text-lg"
          />
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 mt-4">
        <Button
          size="lg"
          type="submit"
          disabled={loading}
          className="rounded-full text-base w-full max-w-[200px] h-12 bg-orange-500 hover:bg-orange-400 font-semibold"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Logging in...
            </>
          ) : (
            "Log in"
          )}
        </Button>

        <div className="text-sm">
          <span>Don't have an account? </span>
<<<<<<< HEAD
          <Link 
            to="/otp"
            state={{ flowType: AUTH_FLOW.SIGNUP }}
=======
          <Link
            to="/signup"
>>>>>>> ed3612eff1e47890ca40ffb7cce284e924e0fcc8
            className="font-semibold text-blue-600 hover:underline"
          >
            Create account
          </Link>
        </div>
      </div>
    </form>
  )
}
