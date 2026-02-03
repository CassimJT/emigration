
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import Logo from "@/assets/Logo.svg"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"

export default function NationalIdForm({
  onSubmit,
  loading,
  className,
  error,
  nationalId,
  onChange,
  ...props
}) {
  
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
          className="opacity-50 w-40 h-40 mx-auto"
        />
        <h1 className="text-xl font-bold">Identity Verification</h1>
        <p className="text-sm text-gray-600">Please provide your National ID to verify your identity</p>
      </div>
      
      <div className="grid gap-2 mt-6">
        <Label htmlFor="nationalId" className="font-bold text-base">National ID</Label>
        <Input 
          className="rounded-xl border-opacity-30 border-black h-14 placeholder:text-gray-500 text-lg"
          id="nationalId" 
          name="nationalId"
          type="text" 
          placeholder="Enter National ID" 
          required 
          disabled={loading}
          onChange={onChange}
          value={nationalId}
        />
        {error && (
          <p className="text-sm text-red-600 mt-1">
            {error}
          </p>
        )}
      </div>

      <div className="flex items-center justify-center mt-12 mb-8">
        <Button 
          type="submit"
          disabled={loading}
          className="rounded-full text-base w-full max-w-[240px] h-12 bg-orange-500 hover:bg-orange-400 font-semibold" 
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Verifying...
            </>
          ) : (
            "Verify"
          )}
        </Button>
      </div> 
    </form>
  )
}