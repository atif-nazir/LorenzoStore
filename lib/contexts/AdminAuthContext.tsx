'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authApi, User } from '@/lib/api/auth';
import { getAuthToken } from '@/lib/api/config';

interface AdminAuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const token = getAuthToken();
    if (token) {
      authApi
        .getCurrentUser()
        .then((userData) => {
          if (userData.role === 'admin') {
            setUser(userData);
          } else {
            authApi.logout();
          }
        })
        .catch(() => {
          authApi.logout();
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const response = await authApi.login({ email, password });
    if (response.user.role === 'admin') {
      setUser(response.user);
    } else {
      authApi.logout();
      throw new Error('Access denied. Admin privileges required.');
    }
  };

  const logout = () => {
    authApi.logout();
    setUser(null);
  };

  const value: AdminAuthContextType = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user && user.role === 'admin',
    isAdmin: user?.role === 'admin' || false,
  };

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
}

