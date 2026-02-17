// passport/components/ReviewStep.jsx
import React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export default function ReviewStep({
  data = {},
  onBack,
  onClick,
  loading = false,
  className,
  ...props
}) {
  const display = (value) => value || "—";

  return (
    <div className={cn("space-y-8", className)} {...props}>
      <h2 className="text-2xl font-bold text-gray-800 text-center">
        Review Your Application
      </h2>

      {/* Passport Details */}
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Passport Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-600">Passport Type:</span>
            <p className="mt-1">{display(data.passportType)}</p>
          </div>
          <div>
            <span className="font-medium text-gray-600">Service Type:</span>
            <p className="mt-1">{display(data.serviceType)}</p>
          </div>
          <div>
            <span className="font-medium text-gray-600">Booklet Type:</span>
            <p className="mt-1">{display(data.bookletType)}</p>
          </div>
        </div>
      </div>

      {/* Personal Information – all fields visible (NRB + user-entered) */}
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Personal Information (Verified & Entered)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-600">First Name:</span>
            <p className="mt-1">{display(data.name)}</p>
          </div>
          <div>
            <span className="font-medium text-gray-600">Surname:</span>
            <p className="mt-1">{display(data.surname)}</p>
          </div>
          <div>
            <span className="font-medium text-gray-600">National ID:</span>
            <p className="mt-1 font-mono">{display(data.nationalId)}</p>
          </div>
          <div>
            <span className="font-medium text-gray-600">Email:</span>
            <p className="mt-1">{display(data.email)}</p>
          </div>
          <div>
            <span className="font-medium text-gray-600">Height:</span>
            <p className="mt-1">{data.height ? `${data.height} cm` : "—"}</p>
          </div>
          <div>
            <span className="font-medium text-gray-600">Mother's Place of Birth:</span>
            <p className="mt-1">{display(data.mothersPlaceOfBirth)}</p>
          </div>
          <div>
            <span className="font-medium text-gray-600">Residential Status:</span>
            <p className="mt-1">{display(data.residentialStatus)}</p>
          </div>
          <div>
            <span className="font-medium text-gray-600">Occupation:</span>
            <p className="mt-1">{display(data.occupation)}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <button
          type="button"
          onClick={onBack}
          className="rounded-full border border-gray-300 px-8 py-3 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300"
        >
          Back
        </button>

        <button
          type="button"
          onClick={onClick}
          disabled={loading}
          className="flex items-center justify-center gap-2 rounded-full bg-green-600 px-10 py-3 font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-70"
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {loading ? "Creating..." : "Create Application"}
        </button>
      </div>

      <p className="text-center text-sm text-gray-500 mt-6">
        Please review all information before final submission
      </p>
    </div>
  );
}