import api from './api';
import { Product } from '../types';

export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sortBy?: 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc' | 'created_at_desc';
}

export const productApi = {
  getAll: async (filters?: ProductFilters): Promise<Product[]> => {
    const params = new URLSearchParams();
    if (filters?.category) params.append('category', filters.category);
    if (filters?.minPrice) params.append('minPrice', filters.minPrice.toString());
    if (filters?.maxPrice) params.append('maxPrice', filters.maxPrice.toString());
    if (filters?.search) params.append('search', filters.search);
    if (filters?.sortBy) params.append('sortBy', filters.sortBy);

    const response = await api.get(`/products?${params.toString()}`);
    return response.data;
  },

  getById: async (id: number): Promise<Product> => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  create: async (product: ProductCreateDTO): Promise<Product> => {
    const response = await api.post('/products', product);
    return response.data;
  },

  update: async (id: number, product: Partial<ProductCreateDTO>): Promise<Product> => {
    const response = await api.put(`/products/${id}`, product);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/products/${id}`);
  },

  getRecommendations: async (userId: number, limit: number = 10): Promise<Product[]> => {
    const response = await api.get(`/recommendations/user/${userId}?limit=${limit}`);
    return response.data;
  },

  getSimilar: async (productId: number, limit: number = 5): Promise<Product[]> => {
    const response = await api.get(`/recommendations/similar/${productId}?limit=${limit}`);
    return response.data;
  },
};

export interface ProductCreateDTO {
  name: string;
  description?: string;
  price: number;
  category: string;
  stock: number;
  image_url?: string;
}


