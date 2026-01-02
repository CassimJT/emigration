// passport/components/PassportTypeStep.jsx
import { useState } from 'react';

export default function PassportTypeStep({ onNext, initialData }) {
  const [form, setForm] = useState({
    passportType: initialData.passportType || 'Ordinary',
    serviceType: initialData.serviceType || 'Normal',
    bookletType: initialData.bookletType || '36 Pages',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Passport Details</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Passport Type
          </label>
          <select
            value={form.passportType}
            onChange={(e) => setForm({ ...form, passportType: e.target.value })}
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
            value={form.serviceType}
            onChange={(e) => setForm({ ...form, serviceType: e.target.value })}
            className="mt-1 block w-full rounded-lg border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          >
            <option>Normal</option>
            <option>Express</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Booklet Type
          </label>
          <select
            value={form.bookletType}
            onChange={(e) => setForm({ ...form, bookletType: e.target.value })}
            className="mt-1 block w-full rounded-lg border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          >
            <option>36 Pages</option>
            <option>48 Pages</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button
          type="submit"
          className="rounded-full bg-orange-500 px-8 py-3 font-medium text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
        >
          Next →
        </button>
      </div>
    </form>
  );
}