// passport/components/ReviewStep.jsx
export default function ReviewStep({ data, onBack }) {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-800 text-center">
        Review Your Application
      </h2>

      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Passport Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-600">Passport Type:</span>
            <p>{data.passportType || '—'}</p>
          </div>
          <div>
            <span className="font-medium text-gray-600">Service Type:</span>
            <p>{data.serviceType || '—'}</p>
          </div>
          <div>
            <span className="font-medium text-gray-600">Booklet Type:</span>
            <p>{data.bookletType || '—'}</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Personal Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-600">Name:</span>
            <p>{data.name || '—'}</p>
          </div>
          <div>
            <span className="font-medium text-gray-600">Surname:</span>
            <p>{data.surname || '—'}</p>
          </div>
          <div className="col-span-2">
            <span className="font-medium text-gray-600">Email:</span>
            <p>{data.email || '—'}</p>
          </div>
          <div>
            <span className="font-medium text-gray-600">Residential Status:</span>
            <p>{data.residentialStatus || '—'}</p>
          </div>
          <div>
            <span className="font-medium text-gray-600">Occupation:</span>
            <p>{data.occupation || '—'}</p>
          </div>
        </div>
      </div>

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
          // onClick={() => handleFinalSubmit(data)} ← you can add later
          className="rounded-full bg-green-600 px-10 py-3 font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Submit Application
        </button>
      </div>

      <p className="text-center text-sm text-gray-500 mt-6">
        Please review all information before final submission
      </p>
    </div>
  );
}