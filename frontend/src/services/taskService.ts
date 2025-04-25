import axios from 'axios';
import { CreateTaskData, Task, UpdateTaskStatusData } from '../types/Task';

const API = import.meta.env.VITE_API_URL as string;

const API_URL = `${API}/api/tasks`;

// Get all tasks
export const getTasks = async (filters?: { status?: string; propertyId?: string }): Promise<Task[]> => {
  let url = API_URL;
  
  if (filters) {
    const params = new URLSearchParams();
    if (filters.status) params.append('status', filters.status);
    if (filters.propertyId) params.append('propertyId', filters.propertyId);
    
    if (params.toString()) {
      url += `?${params.toString()}`;
    }
  }
  
  const response = await axios.get(url);
  return response.data;
};

// Create new task
export const createTask = async (taskData: CreateTaskData): Promise<Task> => {
  const response = await axios.post(API_URL, taskData);
  return response.data;
};

// Update task status
export const updateTaskStatus = async (id: string, statusData: UpdateTaskStatusData): Promise<Task> => {
  const response = await axios.put(`${API_URL}/${id}/status`, statusData);
  return response.data;
};