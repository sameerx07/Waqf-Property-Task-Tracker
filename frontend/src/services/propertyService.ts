import axios from 'axios';
import { CreatePropertyData, Property } from '../types/Property';

const API = import.meta.env.VITE_API_URL as string;


const API_URL = `${API}/api/properties`;

// Get all properties
export const getProperties = async (): Promise<Property[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Create new property
export const createProperty = async (propertyData: CreatePropertyData): Promise<Property> => {
  const response = await axios.post(API_URL, propertyData);
  return response.data;
};

// Get property by ID
export const getPropertyById = async (id: string): Promise<Property> => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};