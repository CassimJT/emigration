import { Button } from "@/components/ui/button"
import { ShieldAlert, ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"

function UnauthorizedPage() {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        <div className="mx-auto h-24 w-24 rounded-full bg-red-100 flex items-center justify-center mb-6">
          <ShieldAlert className="h-12 w-12 text-red-600" />
        </div>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Access Denied
        </h1>
        <p className="mt-4 text-muted-foreground text-lg">
          Sorry, you don't have permission to access this page. Please contact your administrator if you believe this is a mistake.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button 
            variant="outline" 
            onClick={() => navigate(-1)}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" /> Go Back
          </Button>
          <Button 
            onClick={() => navigate('/login')}
          >
            Log in with different account
          </Button>
        </div>
      </div>
    </div>
  )
}

export default UnauthorizedPage