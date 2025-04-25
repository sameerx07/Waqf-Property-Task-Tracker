// src/components/PropertyForm.tsx
import React, { useState } from 'react';
import { createProperty } from '../../services/propertyService';
import { CreatePropertyData } from '../../types/Property';
import { Building2, MapPin, Library } from 'lucide-react';
import { toast } from 'react-toastify';

const PropertyForm: React.FC = () => {
  const [formData, setFormData] = useState<CreatePropertyData>({
    name: '',
    location: '',
    type: 'mosque',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const propertyTypes = [
    { value: 'mosque', label: 'Mosque', icon: <Library size={18} /> },
    { value: 'school', label: 'School', icon: <Building2 size={18} /> },
    { value: 'land', label: 'Land', icon: <MapPin size={18} /> },
    { value: 'commercial', label: 'Commercial', icon: <Building2 size={18} /> },
    { value: 'residential', label: 'Residential', icon: <Building2 size={18} /> },
    { value: 'other', label: 'Other', icon: <Building2 size={18} /> },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      setIsLoading(true);
      await createProperty(formData);

      // Show both banner and toast
      const msg = 'Property added successfully!';
      setSuccess(msg);
      toast.success(msg);

      // Reset form
      setFormData({ name: '', location: '', type: 'mosque' });

      // Clear banner after 3s
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Failed to add property';
      setError(msg);
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-semibold text-emerald-800 dark:text-emerald-400 mb-6">
          Add New Waqf Property
        </h2>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/50 text-red-700 dark:text-red-200 p-3 rounded-md mb-4 flex items-center">
            {/* <span className="mr-2">⚠️</span> {error} */}
          </div>
        )}

        {success && (
          <div className="bg-green-50 dark:bg-green-900/50 text-green-700 dark:text-green-200 p-3 rounded-md mb-4 flex items-center">
            {/* <span className="mr-2">✅</span> {success} */}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 dark:text-gray-300 font-medium mb-2"
            >
              Property Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="e.g., Al-Rahma Mosque"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="location"
              className="block text-gray-700 dark:text-gray-300 font-medium mb-2"
            >
              Location *
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              placeholder="e.g., 123 Main Street, City"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="type"
              className="block text-gray-700 dark:text-gray-300 font-medium mb-2"
            >
              Property Type *
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              {propertyTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className={`flex items-center px-6 py-2.5 rounded-md text-white font-medium transition-colors
                ${
                  isLoading
                    ? 'bg-emerald-400 dark:bg-emerald-500 cursor-not-allowed'
                    : 'bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600'
                }`}
            >
              {isLoading ? (
                <>
                  <span className="animate-spin mr-2">⏳</span>
                  Processing...
                </>
              ) : (
                <>
                  <Building2 size={18} className="mr-2" />
                  Add Property
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4 border border-amber-200 dark:border-amber-800">
        <h3 className="text-amber-800 dark:text-amber-400 font-medium mb-2">
          What is a Waqf Property?
        </h3>
        <p className="text-amber-700 dark:text-amber-300 text-sm">
          Waqf is an Islamic charitable endowment, typically involving the dedication
          of a property for religious or charitable purposes. Managing these properties
          effectively ensures their continued benefit to the community.
        </p>
      </div>
    </div>
  );
};

export default PropertyForm;
