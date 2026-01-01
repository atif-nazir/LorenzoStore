import { apiClient } from './client';
import { productApi } from './products';

// Admin API functions for fetching all data
export const adminApi = {
  // Get all inquiries
  getAllInquiries: async () => {
    const response = await apiClient.get('/inquiries') as any;
    return response.data || [];
  },

  // Update inquiry status
  updateInquiryStatus: async (id: string, status: string) => {
    const response = await apiClient.put(`/inquiries/${id}/status`, { status });
    return response.data;
  },

  // Get all contacts
  getAllContacts: async () => {
    const response = await apiClient.get('/contacts') as any;
    return response.data || [];
  },

  // Update contact status
  updateContactStatus: async (id: string, status: string) => {
    const response = await apiClient.put(`/contacts/${id}/status`, { status });
    return response.data;
  },

  // Get all business enquiries
  getAllBusinessEnquiries: async () => {
    const response = await apiClient.get('/business-enquiries') as any;
    return response.data || [];
  },

  // Update business enquiry status
  updateBusinessEnquiryStatus: async (id: string, status: string) => {
    const response = await apiClient.put(`/business-enquiries/${id}/status`, { status });
    return response.data;
  },

  // Get all products
  getAllProducts: async () => {
    const response = await apiClient.get('/products') as any;
    return response.data || [];
  },

  // Create product
  createProduct: async (productData: any) => {
    const response = await apiClient.post('/products', productData);
    return response.data;
  },

  // Update product
  updateProduct: async (id: string, productData: any) => {
    const response = await apiClient.put(`/products/${id}`, productData);
    return response.data;
  },

  // Delete product
  deleteProduct: async (id: string) => {
    const response = await apiClient.delete(`/products/${id}`);
    return response;
  },
};

// Re-export productApi for convenience
export { productApi };
export { salesApi } from './sales';

