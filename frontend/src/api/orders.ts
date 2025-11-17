import api from './api';
import { Order } from '../types';

export interface CreateOrderData {
  items: Array<{
    product_id: number;
    quantity: number;
  }>;
}

export const orderApi = {
  create: async (data: CreateOrderData): Promise<Order> => {
    const response = await api.post('/orders', data);
    return response.data;
  },

  getAll: async (): Promise<Order[]> => {
    const response = await api.get('/orders');
    return response.data;
  },

  getById: async (id: number): Promise<Order> => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },

  getByUserId: async (userId: number): Promise<Order[]> => {
    const response = await api.get(`/orders/user/${userId}`);
    return response.data;
  },

  updateStatus: async (id: number, status: string): Promise<Order> => {
    const response = await api.put(`/orders/${id}/status`, { status });
    return response.data;
  },
};


