// components/SubmitPage.jsx
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Loader2 } from "lucide-react"

export default function SubmitApplicationPage({
  title = "Submit Application",
  description = "Review your details before submission.",
  summaryData = [],
  isSubmitting = false,
  onSubmit,
  onBack,
  submitText = "Submit",
  backText = "Back"
}) {
  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-muted/40">
      <Card className="w-full max-w-2xl shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">

          {/* Summary Section */}
          <div className="space-y-3">
            {summaryData.map((item, index) => (
              <div
                key={index}
                className="flex justify-between border-b pb-2 text-sm"
              >
                <span className="font-medium text-muted-foreground">
                  {item.label}
                </span>
                <span>{item.value}</span>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex justify-between pt-4">
            {onBack && (
              <Button variant="outline" onClick={onBack}>
                {backText}
              </Button>
            )}

            <Button onClick={onSubmit} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  {submitText}
                </>
              )}
            </Button>
          </div>

        </CardContent>
      </Card>
    </div>
  )
}
