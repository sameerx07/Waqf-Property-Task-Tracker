import React, { useState } from 'react';
import { format } from 'date-fns';
import { Clock, Calendar, Building2, CheckCircle, AlertCircle, CircleDashed } from 'lucide-react';
import { Task } from '../../types/Task';
import { Property } from '../../types/Property';
import { updateTaskStatus } from '../../services/taskService';

interface TaskItemProps {
  task: Task;
  onStatusUpdate: (updatedTask: Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onStatusUpdate }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const property = task.property as Property;
  
  const getStatusClasses = (status: string, isOverdue: boolean) => {
    if (isOverdue && status !== 'Completed') {
      return 'bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-200 border-red-300 dark:border-red-800';
    }
    
    switch (status) {
      case 'Completed':
        return 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-200 border-green-300 dark:border-green-800';
      case 'In Progress':
        return 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-200 border-blue-300 dark:border-blue-800';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600';
    }
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle size={16} />;
      case 'In Progress':
        return <Clock size={16} />;
      default:
        return <CircleDashed size={16} />;
    }
  };
  
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'rent collection':
        return '💰';
      case 'maintenance':
        return '🔧';
      case 'legal follow-up':
        return '📄';
      case 'inspection':
        return '🔍';
      case 'documentation':
        return '📝';
      default:
        return '📋';
    }
  };
  
  const changeStatus = async (newStatus: 'Pending' | 'In Progress' | 'Completed') => {
    if (task.status === newStatus) return;
    
    try {
      setIsUpdating(true);
      const updatedTask = await updateTaskStatus(task._id, { status: newStatus });
      onStatusUpdate(updatedTask);
    } catch (error) {
      console.error('Failed to update task status:', error);
    } finally {
      setIsUpdating(false);
    }
  };
  
  return (
    <div 
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-4 transition-all duration-200
        ${task.isOverdue && task.status !== 'Completed' ? 'border-l-4 border-red-500 dark:border-red-600' : ''}`}
    >
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-1 flex items-center">
              <span className="mr-2">{getTypeIcon(task.type)}</span>
              {task.title}
            </h3>
            
            <div className="flex flex-wrap items-center text-sm text-gray-600 dark:text-gray-400 mb-2">
              <div className="flex items-center mr-4 mb-1">
                <Building2 size={14} className="mr-1 text-emerald-600 dark:text-emerald-400" />
                <span>{property.name}</span>
              </div>
              
              <div className="flex items-center mr-4 mb-1">
                <Calendar size={14} className="mr-1 text-emerald-600 dark:text-emerald-400" />
                <span>Due: {format(new Date(task.dueDate), 'MMM d, yyyy')}</span>
              </div>
              
              {task.isOverdue && task.status !== 'Completed' && (
                <div className="flex items-center text-red-600 dark:text-red-400 mb-1">
                  <AlertCircle size={14} className="mr-1" />
                  <span>Overdue</span>
                </div>
              )}
            </div>
          </div>
          
          <div>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
              ${getStatusClasses(task.status, task.isOverdue)}`}>
              {getStatusIcon(task.status)}
              <span className="ml-1">{task.status}</span>
            </span>
          </div>
        </div>
        
        {isExpanded && task.description && (
          <div className="mt-2 text-gray-600 dark:text-gray-400 text-sm border-t pt-2 border-gray-100 dark:border-gray-700">
            <p>{task.description}</p>
          </div>
        )}
        
        <div className="mt-3 flex items-center justify-between">
          {task.description && (
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 text-sm font-medium"
            >
              {isExpanded ? 'Show Less' : 'Show More'}
            </button>
          )}
          
          <div className="flex items-center space-x-2">
            <ActionButton 
              label="Pending" 
              active={task.status === 'Pending'} 
              onClick={() => changeStatus('Pending')}
              disabled={isUpdating}
            />
            <ActionButton 
              label="In Progress" 
              active={task.status === 'In Progress'} 
              onClick={() => changeStatus('In Progress')}
              disabled={isUpdating}
            />
            <ActionButton 
              label="Completed" 
              active={task.status === 'Completed'} 
              onClick={() => changeStatus('Completed')}
              disabled={isUpdating}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

interface ActionButtonProps {
  label: string;
  active: boolean;
  onClick: () => void;
  disabled: boolean;
}

const ActionButton: React.FC<ActionButtonProps> = ({ label, active, onClick, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled || active}
    className={`px-2 py-1 text-xs rounded transition-colors ${
      active
        ? 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-200 font-medium cursor-default'
        : disabled
        ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 hover:text-emerald-600 dark:hover:text-emerald-300'
    }`}
  >
    {label}
  </button>
);

export default TaskItem;