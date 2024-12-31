import type { AmazonSPClient } from './client';
import type { AmazonCatalogItem } from '../../types/amazon';

export async function searchCatalog(
  client: AmazonSPClient,
  query: string
): Promise<AmazonCatalogItem[]> {
  try {
    const params = new URLSearchParams({
      keywords: query,
      marketplaceIds: 'ATVPDKIKX0DER' // US marketplace
    });

    const response = await client.request(`/catalog/v0/items?${params}`);
    return response.items || [];
  } catch (error) {
    console.error('Failed to search Amazon catalog:', error);
    throw error;
  }
}

export async function getCatalogItem(
  client: AmazonSPClient,
  asin: string
): Promise<AmazonCatalogItem> {
  try {
    const response = await client.request(`/catalog/v0/items/${asin}`);
    return response.item;
  } catch (error) {
    console.error('Failed to fetch Amazon catalog item:', error);
    throw error;
  }
}