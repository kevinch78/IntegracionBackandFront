import { request } from './http';

// Lista todos los productos (opcionalmente con filtros ?q=)
export const listProducts = (q?: Record<string, string | number>) => {
  const qs = q ? '?' + new URLSearchParams(q as any).toString() : '';
  return request('/products' + qs);
};

// Obtiene un producto específico
export const getProduct = (id: number) => request(`/products/${id}`);

// Crea un nuevo producto
export const createProduct = (dto: any) =>
  request('/products', { method: 'POST', body: dto });
