// Central API utility for all backend calls
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Projects
export const getProjects = () => api.get('/api/projects');
export const getFeaturedProjects = () => api.get('/api/projects/featured');
export const getProjectById = (id: string) => api.get(`/api/projects/${id}`);

// Contact
export const submitContact = (data: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject?: string;
  message: string;
  serviceType?: string;
  budget?: string;
}) => api.post('/api/contact', data);

// Team
export const getTeamMembers = () => api.get('/api/team');

export default api;
