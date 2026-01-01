import { apiClient } from './client';

export interface CreateInquiryData {
  name: string;
  email: string;
  phone: string;
  message?: string;
  productId?: string;
}

export const inquiryApi = {
  // Create new inquiry
  create: async (data: CreateInquiryData) => {
    const response = await apiClient.post('/inquiries', data);
    return response;
  },
};

