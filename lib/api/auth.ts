import { apiClient } from './client';
import { setAuthToken, removeAuthToken } from './config';

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

export interface AuthResponse {
  token: string;
  user: User;
}

interface AuthApiResponse {
  success: boolean;
  token?: string;
  user?: User;
  message?: string;
}

export const authApi = {
  // Login
  login: async (data: LoginData): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthApiResponse>('/auth/login', data) as any;
    if (response.token && response.user) {
      setAuthToken(response.token);
      return {
        token: response.token,
        user: response.user,
      };
    }
    throw new Error(response.message || 'Invalid response from server');
  },

  // Register (optional, for admin use)
  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthApiResponse>('/auth/register', data) as any;
    if (response.token && response.user) {
      setAuthToken(response.token);
      return {
        token: response.token,
        user: response.user,
      };
    }
    throw new Error(response.message || 'Invalid response from server');
  },

  // Get current user
  getCurrentUser: async (): Promise<User> => {
    const response = await apiClient.get<{ success: boolean; user: User }>('/auth/me') as any;
    if (response.user) {
      return response.user;
    }
    throw new Error('Invalid response from server');
  },

  // Logout
  logout: (): void => {
    removeAuthToken();
  },
};

