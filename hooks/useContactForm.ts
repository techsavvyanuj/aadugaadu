'use client';

import { useState, type ChangeEvent, type FormEvent } from 'react';
import { submitContact } from '@/lib/api';

type Status = 'idle' | 'loading' | 'success' | 'error';

export const useContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: '',
  });
  const [status, setStatus] = useState<Status>('idle');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await submitContact(formData);
      setStatus('success');
      setFormData({ name: '', email: '', company: '', service: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return { formData, status, handleChange, handleSubmit };
};
