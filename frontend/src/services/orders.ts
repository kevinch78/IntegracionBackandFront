// src/services/orders.ts
import { request } from './http';

interface OrderItemDto {
  productId: number;
  amount: number;
}

export const createOrder = (items: OrderItemDto[]) => {
  // El backend espera que se cree una orden y luego se añadan items.
  // Para simplificar, asumimos un endpoint que lo hace todo en un paso.
  return request('/orders/add-items-to-order', { method: 'POST', body: { items }, auth: true });
};