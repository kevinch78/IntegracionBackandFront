// src/services/auth.ts
import { request } from './http';
export const login = (email: string, password: string) =>
  request('/auth/login', { method: 'POST', body: { email, password } });

// src/services/products.ts
import { request } from './http';
export const listProducts = (q?: Record<string, string | number>) => {
  const qs = q ? '?' + new URLSearchParams(q as any).toString() : '';
  return request('/products' + qs);
};
export const getProduct = (id: number) => request(`/products/${id}`);
export const createProduct = (dto: any) => request('/products', { method: 'POST', body: dto });

// src/services/categories.ts (JWT)
import { request } from './http';
export const listCategories = () => request('/categories', { auth: true });

// src/services/profile.ts (JWT)
import { request } from './http';
export const getMe = () => request('/profile/my-user', { auth: true });
export const getMyOrders = () => request('/profile/my-orders', { auth: true });