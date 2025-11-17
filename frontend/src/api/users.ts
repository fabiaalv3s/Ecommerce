import api from './api';
import { User } from '../types';

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export const userApi = {
  register: async (data: RegisterData): Promise<User> => {
    const response = await api.post('/users', data);
    return response.data;
  },

  login: async (data: LoginData): Promise<LoginResponse> => {
    const response = await api.post('/users/login', data);
    return response.data;
  },

  getById: async (id: number): Promise<User> => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  getAll: async (): Promise<User[]> => {
    const response = await api.get('/users');
    return response.data;
  },

  update: async (id: number, data: Partial<RegisterData>): Promise<User> => {
    const response = await api.put(`/users/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/users/${id}`);
  },
};


