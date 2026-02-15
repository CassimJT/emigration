// components/SubmitApplicationPage.jsx
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SubmitApplicationPage({
  title = "Submit Application",
  description = "Review your details before submission.",
  summaryData = [],
  isSubmitting = false,
  onSubmit,
  onBack,
  className,
  ...props
}) {
  // Helper to format values nicely
  const formatValue = (value) => {
    if (value == null || value === "") return "—";
    if (typeof value === "number") return `${value} cm`; // height
    if (typeof value === "object" && value.district) {
      return `${value.district}, ${value.village || ""}`.trim() || "—"; // placeOfBirth if nested
    }
    return value;
  };

  // Group fields for better readability
  const passportFields = summaryData.filter(item =>
    ["passportType", "serviceType", "bookletType"].includes(item.label.toLowerCase())
  );

  const personalFields = summaryData.filter(item =>
    ["name", "surname", "email", "nationalid", "height", "placeofbirth", "mothersplaceofbirth", "residentialstatus", "occupation"].includes(item.label.toLowerCase())
  );

  return (
    <div className={cn("space-y-8", className)} {...props}>
      <Card className="w-full max-w-2xl shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Passport Details */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-700">Passport Details</h3>
            {passportFields.map((item, index) => (
              <div
                key={index}
                className="flex justify-between border-b pb-2 text-sm"
              >
                <span className="font-medium text-muted-foreground">
                  {item.label}
                </span>
                <span>{formatValue(item.value)}</span>
              </div>
            ))}
            {passportFields.length === 0 && (
              <p className="text-gray-500 text-center">No passport details provided</p>
            )}
          </div>

          {/* Personal Information */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-700">Personal Information</h3>
            {personalFields.map((item, index) => (
              <div
                key={index}
                className="flex justify-between border-b pb-2 text-sm"
              >
                <span className="font-medium text-muted-foreground">
                  {item.label}
                  {["nationalid", "height", "mothersplaceofbirth"].includes(item.label.toLowerCase()) && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </span>
                <span className="font-mono">{formatValue(item.value)}</span>
              </div>
            ))}
            {personalFields.length === 0 && (
              <p className="text-gray-500 text-center">No personal information provided</p>
            )}
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
              disabled={isSubmitting}
              className="rounded-full bg-green-600 px-10 py-3 font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-70 flex items-center gap-2"
            >
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
  );
}