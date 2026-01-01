import { apiClient } from './client';

export interface CreateSaleData {
  productId: string;
  customerName: string;
  customerEmail: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  status?: 'completed' | 'pending' | 'cancelled';
}

export interface SaleFilters {
  startDate?: string;
  endDate?: string;
  status?: 'completed' | 'pending' | 'cancelled';
}

export const salesApi = {
  // Get all sales
  getAll: async (filters?: SaleFilters) => {
    const params: Record<string, string> = {};
    if (filters?.startDate) params.startDate = filters.startDate;
    if (filters?.endDate) params.endDate = filters.endDate;
    if (filters?.status) params.status = filters.status;

    const response = await apiClient.get('/sales', params) as any;
    return response.data || [];
  },

  // Get sales statistics
  getStats: async () => {
    const response = await apiClient.get('/sales/stats') as any;
    return response.data || response;
  },

  // Get single sale
  getById: async (id: string) => {
    const response = await apiClient.get(`/sales/${id}`) as any;
    return response.data;
  },

  // Create sale
  create: async (data: CreateSaleData) => {
    const response = await apiClient.post('/sales', data) as any;
    return response.data;
  },

  // Update sale
  update: async (id: string, data: Partial<CreateSaleData>) => {
    const response = await apiClient.put(`/sales/${id}`, data) as any;
    return response.data;
  },

  // Delete sale
  delete: async (id: string) => {
    const response = await apiClient.delete(`/sales/${id}`);
    return response;
  },
};

