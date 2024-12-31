import type { TrendyolClient } from '../client';
import type { Order } from '../../../types/orders';
import type { TrendyolOrdersResponse } from './types';
import { getDateRange } from './utils';
import { mapTrendyolOrder } from './mappers';

export async function fetchOrdersByDateRange(
  client: TrendyolClient,
  supplierId: string,
): Promise<Order[]> {
  try {
    const dateRange = getDateRange(new Date());
    
    const params = new URLSearchParams({
      startDate: (dateRange.startDate * 1000).toString(),
      endDate: (dateRange.endDate * 1000).toString(),
      size: '200',
      page: '0',
      orderByField: 'OrderDate', // Changed from PackageLastModifiedDate
      orderByDirection: 'DESC'    // Explicitly set to DESC
    });
    
    const endpoint = `/suppliers/${supplierId}/orders`;
    const url = `${endpoint}?${params.toString()}`;
    
    const response = await client.request<TrendyolOrdersResponse>(url);

    if (!response?.content || !Array.isArray(response.content)) {
      console.warn('Empty or invalid response:', response);
      return [];
    }

    // Sort orders by date in descending order after mapping
    const orders = response.content.map(mapTrendyolOrder);
    return orders.sort((a, b) => 
      new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
    );
  } catch (error) {
    console.error('Failed to fetch orders:', error);
    throw error instanceof Error 
      ? error 
      : new Error('Failed to fetch orders');
  }
}