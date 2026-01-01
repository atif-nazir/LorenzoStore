import { apiClient } from './client';

export interface CreateContactData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const contactApi = {
  // Create new contact message
  create: async (data: CreateContactData) => {
    const response = await apiClient.post('/contacts', data);
    return response;
  },
};

