// components/SubmitPage.jsx
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils"



export default function SubmitApplicationPage({
  title = "Submit Application",
  description = "Review your details before submission.",
  summaryData = [],
  isSubmitting = false,
  className,
  onSubmit,
  onBack,
  ...props
  
}) {
  return (
    <div className={cn("space-y-8",className)} {...props}>
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
            <Button
              type="button"
              onClick={onBack}
              className="rounded-full border border-gray-300 px-8 py-3 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
                Back
            </Button>

            <Button
                type="button"
                onClick={onSubmit}
                className="rounded-full bg-green-600 px-10 py-3 font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                disabled={isSubmitting} >
                {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Application"
              )}
        </Button>
          </div>

        </CardContent>
      </Card>
    </div>
  )
}
