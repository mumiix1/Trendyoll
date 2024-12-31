import type { TrendyolClient } from '../client';
import type { Product } from '../../../types/marketplace';
import type { TrendyolProductsApiResponse } from './types';
import { mapTrendyolProduct } from './mappers';

export async function fetchProductsByIds(
  client: TrendyolClient, 
  supplierId: string,
  productIds: string[]
): Promise<Product[]> {
  if (!productIds.length) return [];
  
  try {
    const barcodeParam = productIds.join(',');
    const endpoint = `/suppliers/${supplierId}/products?barcode=${barcodeParam}`;
    
    const response = await client.request<TrendyolProductsApiResponse>(endpoint);

    if (!response?.content || !Array.isArray(response.content)) {
      throw new Error('Invalid response structure from Trendyol API');
    }
    
    return response.content.map(mapTrendyolProduct);
  } catch (error) {
    console.error('Failed to fetch products by IDs:', error);
    throw error;
  }
}