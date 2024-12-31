import type { TrendyolClient } from '../client';
import type { TrendyolProductsApiResponse } from './types';
import { mapTrendyolProduct } from './mappers';
import type { Product } from '../../../types/marketplace';

export interface ProductsQueryParams {
  approved?: boolean;
  rejected?: boolean;
  archived?: boolean;
  onSale?: boolean;
  page?: number;
  size?: number;
  stockCode?: string;
  barcode?: string;
  startDate?: string;
  endDate?: string;
}

export async function fetchProducts(
  client: TrendyolClient,
  supplierId: string,
  params: ProductsQueryParams = {}
): Promise<Product[]> {
  try {
    const queryParams = new URLSearchParams();
    
    // Add all valid params to query string
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        queryParams.append(key, value.toString());
      }
    });

    // Default page size if not specified
    if (!params.size) {
      queryParams.append('size', '50');
    }

    const endpoint = `/suppliers/${supplierId}/products?${queryParams.toString()}`;
    const response = await client.request<TrendyolProductsApiResponse>(endpoint);

    if (!response?.content || !Array.isArray(response.content)) {
      throw new Error('Invalid response structure from Trendyol API');
    }

    return response.content.map(mapTrendyolProduct);
  } catch (error) {
    console.error('Failed to fetch products:', error);
    throw error;
  }
}