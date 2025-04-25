import React, { useState, useEffect } from 'react';
import { getTasks } from '../../services/taskService';
import { getProperties } from '../../services/propertyService';
import { Task } from '../../types/Task';
import { Property } from '../../types/Property';
import TaskItem from './TaskItem';
import { Filter, AlertTriangle, RefreshCw } from 'lucide-react';

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [filters, setFilters] = useState({
    status: '',
    propertyId: '',
  });
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [tasksData, propertiesData] = await Promise.all([
          getTasks(filters),
          getProperties(),
        ]);
        
        setTasks(tasksData);
        setProperties(propertiesData);
        setError(null);
      } catch (err) {
        setError('Failed to load tasks. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [filters]);
  
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };
  
  const handleStatusUpdate = (updatedTask: Task) => {
    setTasks(tasks.map(task => task._id === updatedTask._id ? updatedTask : task));
  };
  
  const resetFilters = () => {
    setFilters({
      status: '',
      propertyId: '',
    });
  };
  
  if (loading) {
    return (
      <div className="text-center p-8">
        <div className="animate-spin inline-block w-8 h-8 border-4 border-emerald-500 dark:border-emerald-400 border-t-transparent rounded-full mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400">Loading tasks...</p>
      </div>
    );
  }
  
  const overdueCount = tasks.filter(task => task.isOverdue && task.status !== 'Completed').length;
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h2 className="text-2xl font-semibold text-emerald-800 dark:text-emerald-400 mb-4 sm:mb-0">Task List</h2>
        
        <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
          <div className="flex items-center bg-white dark:bg-gray-800 rounded-lg shadow-sm px-3 py-2">
            <Filter size={16} className="text-gray-500 dark:text-gray-400 mr-2" />
            <select
              name="propertyId"
              value={filters.propertyId}
              onChange={handleFilterChange}
              className="bg-transparent border-none text-sm focus:outline-none dark:text-gray-200"
            >
              <option value="">All Properties</option>
              {properties.map(property => (
                <option key={property._id} value={property._id}>
                  {property.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center bg-white dark:bg-gray-800 rounded-lg shadow-sm px-3 py-2">
            <Filter size={16} className="text-gray-500 dark:text-gray-400 mr-2" />
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="bg-transparent border-none text-sm focus:outline-none dark:text-gray-200"
            >
              <option value="">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          
          <button
            onClick={resetFilters}
            className="flex items-center justify-center text-sm text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 px-3 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm"
          >
            <RefreshCw size={16} className="mr-1" />
            Reset
          </button>
        </div>
      </div>
      
      {overdueCount > 0 && (
        <div className="bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 rounded-lg p-3 mb-4 text-red-700 dark:text-red-200 flex items-center">
          <AlertTriangle size={16} className="mr-2" />
          <span>
            <strong>Attention:</strong> You have {overdueCount} overdue {overdueCount === 1 ? 'task' : 'tasks'} that need attention.
          </span>
        </div>
      )}
      
      {error && (
        <div className="bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4">
          <p className="text-red-700 dark:text-red-200">{error}</p>
        </div>
      )}
      
      {tasks.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
          <div className="text-gray-400 dark:text-gray-500 mb-3">No tasks found</div>
          {(filters.status || filters.propertyId) && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Try adjusting your filters or creating new tasks.
            </p>
          )}
        </div>
      ) : (
        <div>
          {tasks.map(task => (
            <TaskItem 
              key={task._id} 
              task={task} 
              onStatusUpdate={handleStatusUpdate}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;