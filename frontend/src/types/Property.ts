export interface Property {
  _id: string;
  name: string;
  location: string;
  type: 'mosque' | 'school' | 'land' | 'commercial' | 'residential' | 'other';
  createdAt: string;
  updatedAt: string;
}

export interface CreatePropertyData {
  name: string;
  location: string;
  type: 'mosque' | 'school' | 'land' | 'commercial' | 'residential' | 'other';
}