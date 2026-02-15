// passport/components/PersonalInfoStep.jsx
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function PersonalInfoStep({
  name = "",
  surname = "",
  email = "",
  height = "",
  mothersPlaceOfBirth = "",
  residentialStatus = "Permanent",
  occupation = "Ordinary",
  onBack,
  onChange,     
  onSubmit,     
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
      name,
      surname,
      email,
      height,
      mothersPlaceOfBirth,
      residentialStatus,
      occupation,
    });
  };

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-8", className)}>
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
        <p className="mt-1 text-sm text-gray-500">
          Your National ID and Place of Birth have been verified from NRB. Please provide the remaining details.
        </p>
      </div>

      {/* Core personal details (from NRB/formData) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium text-gray-700">
            First Name
          </Label>
          <Input
            id="name"
            value={name}
            onChange={handleChange}
            placeholder="First Name"
            disabled // Pre-filled from NRB
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="surname" className="text-sm font-medium text-gray-700">
            Surname
          </Label>
          <Input
            id="surname"
            value={surname}
            onChange={handleChange}
            placeholder="Surname"
            disabled // Pre-filled from NRB
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email Address <span className="text-red-500">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={handleChange}
            placeholder="your.email@example.com"
            required
          />
        </div>
      </div>

      {/* Required fields NOT in NRB */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="height" className="text-sm font-medium text-gray-700">
            Height (cm) <span className="text-red-500">*</span>
          </Label>
          <Input
            id="height"
            type="number"
            value={height}
            onChange={handleChange}
            placeholder="e.g. 175"
            required
            min="50"
            max="250"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="mothersPlaceOfBirth" className="text-sm font-medium text-gray-700">
            Mother's Place of Birth <span className="text-red-500">*</span>
          </Label>
          <Input
            id="mothersPlaceOfBirth"
            value={mothersPlaceOfBirth}
            onChange={handleChange}
            placeholder="e.g. Blantyre, Malawi"
            required
          />
        </div>
      </div>

      {/* Optional fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="residentialStatus" className="text-sm font-medium text-gray-700">
            Current Residential Status
          </Label>
          <select
            id="residentialStatus"
            value={residentialStatus}
            onChange={handleChange}
            className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:ring-orange-500 bg-white"
          >
            <option value="Permanent">Permanent Resident</option>
            <option value="Temporary">Temporary Resident</option>
            <option value="Refugee">Refugee</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="occupation" className="text-sm font-medium text-gray-700">
            Occupation
          </Label>
          <Input
            id="occupation"
            value={occupation}
            onChange={handleChange}
            placeholder="e.g. Teacher, Engineer"
          />
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-8">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="px-8 py-2.5"
        >
          Back
        </Button>

        <Button
          type="submit"
          disabled={loading}
          className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-2.5 rounded-lg font-medium shadow-sm transition-colors"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin inline" />
              Processing...
            </>
          ) : (
            "Next"
          )}
        </Button>
      </div>
    </form>
  );
}