import { Property } from './Property';

export interface Task {
  _id: string;
  property: Property | string;
  title: string;
  type: 'rent collection' | 'maintenance' | 'legal follow-up' | 'inspection' | 'documentation' | 'other';
  dueDate: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  description?: string;
  isOverdue: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskData {
  property: string;
  title: string;
  type: 'rent collection' | 'maintenance' | 'legal follow-up' | 'inspection' | 'documentation' | 'other';
  dueDate: string;
  status?: 'Pending' | 'In Progress' | 'Completed';
  description?: string;
}

export interface UpdateTaskStatusData {
  status: 'Pending' | 'In Progress' | 'Completed';
}