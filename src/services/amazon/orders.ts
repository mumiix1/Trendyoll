import type { AmazonSPClient } from './client';
import type { AmazonOrder } from '../../types/amazon';

export async function getOrders(
  client: AmazonSPClient,
  createdAfter?: string
): Promise<AmazonOrder[]> {
  try {
    const params = new URLSearchParams();
    if (createdAfter) {
      params.append('CreatedAfter', createdAfter);
    }

    const response = await client.request(`/orders/v0/orders?${params}`);
    return response.Orders || [];
  } catch (error) {
    console.error('Failed to fetch Amazon orders:', error);
    throw error;
  }
}

export async function getOrderDetails(
  client: AmazonSPClient,
  orderId: string
): Promise<AmazonOrder> {
  try {
    const response = await client.request(`/orders/v0/orders/${orderId}`);
    return response.Order;
  } catch (error) {
    console.error('Failed to fetch Amazon order details:', error);
    throw error;
  }
}