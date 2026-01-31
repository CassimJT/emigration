import { cn } from "@/lib/utils"
import Logo from "@/assets/Logo.svg"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { Loader2 } from "lucide-react"
import { AUTH_FLOW } from "@/utils/constants"
import { useAuth } from "../hooks/useAuth"

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
            disabled={loading}
            value={values.email}
            onChange={onChange}
            className="rounded-xl border-opacity-30 border-black h-12 placeholder:text-gray-500 text-lg"
          />
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="password" className="font-bold text-base">
            Password
          </Label>
          <Input
            id="password"
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
          <Link
            to="/signup"
            className="font-semibold text-blue-600 hover:underline"
          >
            Create account
          </Link>
        </div>
      </div>
    </form>
  )
}
