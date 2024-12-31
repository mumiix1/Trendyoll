import type { TrendyolClient } from '../client';
import type { Product } from '../../../types/marketplace';
import { mapTrendyolProduct } from './mappers';
import type { TrendyolProductsApiResponse } from './types';

export interface ProductFilterParams {
  barcode?: string;
  supplierId: string;
  categoryId?: string;
  approved?: boolean;
  rejected?: boolean;
  archived?: boolean;
  onSale?: boolean;
  brandId?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  size?: number;
  stockCode?: string;
  stockStatus?: 'ALL' | 'LOW' | 'OUT_OF_STOCK';
}

export async function fetchFilteredProducts(
  client: TrendyolClient,
  filters: ProductFilterParams
): Promise<Product[]> {
  try {
    const params = new URLSearchParams();

    // Add all filters to query params
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        params.append(key, value.toString());
      }
    });

    // Default page size if not specified
    if (!filters.size) {
      params.append('size', '50');
    }

    const endpoint = `/suppliers/${filters.supplierId}/products?${params.toString()}`;
    console.log('Fetching filtered products:', endpoint);

    const response = await client.request<TrendyolProductsApiResponse>(endpoint);

    if (!response?.content || !Array.isArray(response.content)) {
      throw new Error('Invalid response structure from Trendyol API');
    }

    return response.content.map(mapTrendyolProduct);
  } catch (error) {
    console.error('Failed to fetch filtered products:', error);
    throw error;
  }
}