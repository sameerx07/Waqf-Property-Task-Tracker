import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { createTask } from '../../services/taskService';
import { getProperties } from '../../services/propertyService';
import { CreateTaskData } from '../../types/Task';
import { Property } from '../../types/Property';
import { Wrench, FileText, CreditCard, ClipboardEdit, Building2, AlertTriangle } from 'lucide-react';

const TaskForm: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<CreateTaskData>({
    property: '',
    title: '',
    type: 'maintenance',
    dueDate: format(new Date(), 'yyyy-MM-dd'),
    status: 'Pending',
    description: '',
  });

  const taskTypes = [
    { value: 'rent collection', label: 'Rent Collection', icon: <CreditCard size={18} /> },
    { value: 'maintenance', label: 'Maintenance', icon: <Wrench size={18} /> },
    { value: 'legal follow-up', label: 'Legal Follow-up', icon: <FileText size={18} /> },
    { value: 'inspection', label: 'Inspection', icon: <AlertTriangle size={18} /> },
    { value: 'documentation', label: 'Documentation', icon: <ClipboardEdit size={18} /> },
    { value: 'other', label: 'Other', icon: <Building2 size={18} /> },
  ];

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await getProperties();
        setProperties(data);
        
        if (data.length > 0) {
          setFormData(prev => ({ ...prev, property: data[0]._id }));
        }
      } catch (err) {
        setError('Failed to load properties. Please try again.');
      }
    };

    fetchProperties();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      await createTask(formData);
      setSuccess('Task added successfully!');
      
      setFormData(prev => ({
        ...prev,
        title: '',
        description: '',
        dueDate: format(new Date(), 'yyyy-MM-dd'),
        type: 'maintenance',
        status: 'Pending',
      }));
      
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to add task');
    } finally {
      setLoading(false);
    }
  };

  if (properties.length === 0 && !error) {
    return (
      <div className="text-center p-8">
        <div className="animate-pulse">
          <Building2 size={48} className="mx-auto text-emerald-500 dark:text-emerald-400 mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading properties...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-emerald-800 dark:text-emerald-400 mb-6">Create New Task</h2>
        
        {error && (
          <div className="bg-red-50 dark:bg-red-900/50 text-red-700 dark:text-red-200 p-3 rounded-md mb-4">
            <span className="mr-2">⚠️</span> {error}
          </div>
        )}
        
        {success && (
          <div className="bg-green-50 dark:bg-green-900/50 text-green-700 dark:text-green-200 p-3 rounded-md mb-4 animate-fadeIn">
            <span className="mr-2">✅</span> {success}
          </div>
        )}
        
        {properties.length === 0 && (
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-200 p-4 rounded-md mb-4">
            <p className="flex items-center">
              <AlertTriangle size={18} className="mr-2" />
              No properties found. Please add a property before creating tasks.
            </p>
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="property" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              Select Property *
            </label>
            <select
              id="property"
              name="property"
              value={formData.property}
              onChange={handleChange}
              required
              disabled={properties.length === 0}
              className={`w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                ${properties.length === 0 ? 'bg-gray-100 dark:bg-gray-800 cursor-not-allowed' : ''}`}
            >
              {properties.length === 0 ? (
                <option value="">No properties available</option>
              ) : (
                properties.map(property => (
                  <option key={property._id} value={property._id}>
                    {property.name} ({property.type}) - {property.location}
                  </option>
                ))
              )}
            </select>
          </div>
          
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              Task Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              disabled={properties.length === 0}
              className={`w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                ${properties.length === 0 ? 'bg-gray-100 dark:bg-gray-800 cursor-not-allowed' : ''}`}
              placeholder="e.g., Annual Inspection"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="type" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              Task Type *
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              disabled={properties.length === 0}
              className={`w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                ${properties.length === 0 ? 'bg-gray-100 dark:bg-gray-800 cursor-not-allowed' : ''}`}
            >
              {taskTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
          
          <div className="mb-4">
            <label htmlFor="dueDate" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              Due Date *
            </label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              required
              disabled={properties.length === 0}
              className={`w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                ${properties.length === 0 ? 'bg-gray-100 dark:bg-gray-800 cursor-not-allowed' : ''}`}
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="status" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              disabled={properties.length === 0}
              className={`w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                ${properties.length === 0 ? 'bg-gray-100 dark:bg-gray-800 cursor-not-allowed' : ''}`}
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          
          <div className="mb-6">
            <label htmlFor="description" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              Description (Optional)
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              disabled={properties.length === 0}
              className={`w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                ${properties.length === 0 ? 'bg-gray-100 dark:bg-gray-800 cursor-not-allowed' : ''}`}
              placeholder="Enter any additional details about this task..."
            ></textarea>
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading || properties.length === 0}
              className={`flex items-center px-6 py-2.5 rounded-md text-white font-medium transition-colors
                ${loading || properties.length === 0
                  ? 'bg-emerald-400 dark:bg-emerald-500 cursor-not-allowed' 
                  : 'bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600'}`}
            >
              {loading ? (
                <>
                  <span className="animate-spin mr-2">⏳</span>
                  Processing...
                </>
              ) : (
                <>
                  <ClipboardEdit size={18} className="mr-2" />
                  Create Task
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;