// passport/components/PassportTypeStep.jsx
import React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function PassportTypeStep({
  passportType = "Ordinary",
  serviceType = "Normal",
  bookletType = "36 Pages",
  onChange,   // now expects (id, value)
  onSubmit,   // expects to receive full step data object
  loading = false,
  className,
}) {
  const handleChange = (e) => {
    const { id, value } = e.target;
    onChange(id, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send full step data to parent/hook
    onSubmit(e, {
      passportType,
      serviceType,
      bookletType,
    });
  };

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-6", className)}>
      <h2 className="text-xl font-semibold text-gray-800">Passport Details</h2>

      <div className="space-y-4">
        <div>
          <label htmlFor="passportType" className="block text-sm font-medium text-gray-700">
            Passport Type <span className="text-red-500">*</span>
          </label>
          <select
            id="passportType"
            value={passportType}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-lg border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          >
            <option value="">Select passport type</option>
            <option value="Ordinary">Ordinary</option>
            <option value="Diplomatic">Diplomatic</option>
            <option value="Service">Service</option>
            <option value="Temporary">Temporary</option>
          </select>
        </div>

        <div>
          <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700">
            Service Type <span className="text-red-500">*</span>
          </label>
          <select
            id="serviceType"
            value={serviceType}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-lg border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          >
            <option value="">Select service type</option>
            <option value="Normal">Normal</option>
            <option value="Express">Express</option>
            <option value="Urgent">Urgent</option>
          </select>
        </div>

        <div>
          <label htmlFor="bookletType" className="block text-sm font-medium text-gray-700">
            Booklet Type <span className="text-red-500">*</span>
          </label>
          <select
            id="bookletType"
            value={bookletType}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-lg border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          >
            <option value="">Select booklet type</option>
            <option value="36 Pages">36 Pages</option>
            <option value="48 Pages">48 Pages</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-orange-500 px-8 py-3 font-medium text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-70"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin inline" />
              Processing...
            </>
          ) : (
            "Next"
          )}
        </button>

      </div>
    </form>
  );
}