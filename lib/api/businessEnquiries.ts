import { apiClient } from './client';

export interface CreateBusinessEnquiryData {
  enquiryType: 'wholesale' | 'sponsorship' | 'distribution' | 'partnership';
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  country: string;
  message: string;
}

export const businessEnquiryApi = {
  // Create new business enquiry
  create: async (data: CreateBusinessEnquiryData) => {
    const response = await apiClient.post('/business-enquiries', data);
    return response;
  },
};

