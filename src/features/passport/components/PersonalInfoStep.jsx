// passport/components/PersonalInfoStep.jsx
import { useState } from 'react';

export default function PersonalInfoStep({ onNext, onBack, initialData = {} }) {
  const [form, setForm] = useState({
    name: initialData.name || '',
    surname: initialData.surname || '',
    email: initialData.email || '',
    residentialStatus: initialData.residentialStatus || 'Ordinary',
    occupation: initialData.occupation || 'Ordinary',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Personal Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="mt-1 block w-full rounded-lg border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:ring-orange-500"
            placeholder="Name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Surname</label>
          <input
            type="text"
            value={form.surname}
            onChange={(e) => setForm({ ...form, surname: e.target.value })}
            className="mt-1 block w-full rounded-lg border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:ring-orange-500"
            placeholder="Surname"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="mt-1 block w-full rounded-lg border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          placeholder="your.email@example.com"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Current Residential Status</label>
          <select
            value={form.residentialStatus}
            onChange={(e) => setForm({ ...form, residentialStatus: e.target.value })}
            className="mt-1 block w-full rounded-lg border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          >
            <option>Ordinary</option>
            <option>Permanent Resident</option>
            <option>Refugee</option>
            <option>Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Occupation</label>
          <input
            type="text"
            value={form.occupation}
            onChange={(e) => setForm({ ...form, occupation: e.target.value })}
            className="mt-1 block w-full rounded-lg border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:ring-orange-500"
            placeholder="Occupation"
          />
        </div>
      </div>

      <div className="flex justify-between pt-6">
        <button
          type="button"
          onClick={onBack}
          className="rounded-full border border-gray-300 px-8 py-3 font-medium text-gray-700 hover:bg-gray-50"
        >
          Back
        </button>

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