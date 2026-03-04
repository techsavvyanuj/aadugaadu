// Type definitions for the entire application

export interface Project {
  _id: string;
  title: string;
  description: string;
  services: string[];
  technologies: string[];
  image?: string;
  imageUrl?: string;
  link?: string;
  clientName?: string;
  results?: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TeamMember {
  _id: string;
  name: string;
  role: string;
  bio?: string;
  image?: string;
  imageUrl?: string;
  email?: string;
  expertise: string[];
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

export interface ContactForm {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject?: string;
  message: string;
  serviceType?: string;
  budget?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}
