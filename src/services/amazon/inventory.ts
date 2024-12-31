import type { AmazonSPClient } from './client';
import type { AmazonInventoryItem } from '../../types/amazon';

export async function getInventory(client: AmazonSPClient): Promise<AmazonInventoryItem[]> {
  try {
    const response = await client.request('/inventory/v1/summaries');
    return response.inventoryItems || [];
  } catch (error) {
    console.error('Failed to fetch Amazon inventory:', error);
    throw error;
  }
}

export async function updateInventory(
  client: AmazonSPClient,
  sku: string,
  quantity: number
): Promise<void> {
  try {
    await client.request('/inventory/v1/inventory', {
      method: 'POST',
      body: JSON.stringify({
        sku,
        quantity
      })
    });
  } catch (error) {
    console.error('Failed to update Amazon inventory:', error);
    throw error;
  }
}