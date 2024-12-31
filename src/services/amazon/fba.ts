import type { AmazonSPClient } from './client';
import type { AmazonFBAInventoryItem } from '../../types/amazon';

interface FBAFilters {
  status?: string;
  fulfillmentCenter?: string;
  daysUntilExpiration?: number;
}

export async function getFBAInventory(
  client: AmazonSPClient,
  filters: FBAFilters = {}
): Promise<AmazonFBAInventoryItem[]> {
  try {
    const params = new URLSearchParams();
    
    if (filters.status && filters.status !== 'all') {
      params.append('Status', filters.status);
    }
    if (filters.fulfillmentCenter) {
      params.append('FulfillmentCenter', filters.fulfillmentCenter);
    }
    if (filters.daysUntilExpiration) {
      params.append('DaysUntilExpiration', filters.daysUntilExpiration.toString());
    }

    const response = await client.request(`/fba/inventory/v1/summaries?${params}`);
    return response.payload || [];
  } catch (error) {
    console.error('Failed to fetch FBA inventory:', error);
    throw error;
  }
}

export async function createInboundShipment(
  client: AmazonSPClient,
  shipmentData: any
): Promise<void> {
  try {
    await client.request('/fba/inbound/v0/shipments', {
      method: 'POST',
      body: JSON.stringify(shipmentData)
    });
  } catch (error) {
    console.error('Failed to create inbound shipment:', error);
    throw error;
  }
}