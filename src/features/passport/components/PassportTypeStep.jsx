// passport/components/PassportTypeStep.jsx
import { cn } from '@/lib/utils';

export default function PassportTypeStep({ 
  onChange,
  onSubmit,
  className,
  loading,
  passportType,
  serviceType,
  bookletType,
  ...props

}) {
  

  return (
    <form onSubmit={onSubmit} className={cn("space-y-6", className)} {...props}>
      <h2 className="text-xl font-semibold text-gray-800">Passport Details</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Passport Type
          </label>
          <select
            id='passportType'
            value={passportType}
            onChange={onChange}
            className="mt-1 block w-full rounded-lg border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          >
            <option>Ordinary</option>
            <option>Diplomatic</option>
            <option>Official</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Service Type
          </label>
          <select
            id='serviceType'
            value={serviceType}
            onChange={onChange}
            className="mt-1 block w-full rounded-lg border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          >
            <option>Basic processing</option>
            <option>Priority processing</option>
            <option>Expedited processing</option>
            <option>Normal</option>
            <option>Express</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Booklet Type
          </label>
          <select
            id='bookletType'
            value={bookletType}
            onChange={onChange}
            className="mt-1 block w-full rounded-lg border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          >
            <option>36 pages</option>
            <option>48 pages</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-orange-500 px-8 py-3 font-medium text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Loading...
            </>
          ) : (
            "Next"
          )}
        </button>
      </div>
    </form>
  );
}