import { apiClient } from './client';
import { Helmet } from '../helmets';

export interface ProductFilters {
  brand?: string;
  year?: string;
  category?: 'premium' | 'mid-range' | 'entry';
}

export const productApi = {
  // Get all products with optional filters
  getAll: async (filters?: ProductFilters) => {
    const params: Record<string, string> = {};
    if (filters?.brand) params.brand = filters.brand;
    if (filters?.year) params.year = filters.year;
    if (filters?.category) params.category = filters.category;

    const response = await apiClient.get<Helmet[]>('/products', params);
    return response.data || [];
  },

  // Get single product by ID
  getById: async (id: string) => {
    const response = await apiClient.get<Helmet>(`/products/${id}`);
    return response.data;
  },
};

