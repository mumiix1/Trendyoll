import { useState } from 'react';
import { useTrendyolClient } from './useTrendyolClient';
import { useMarketplaceStore } from '../store/marketplaceStore';
import { fetchProductsByIds } from '../services/trendyol/products';
import { mockProducts } from '../services/trendyol/products/fallback';
import type { Product } from '../types/marketplace';

export function useProductBarcodeSearch() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const client = useTrendyolClient();
  const { marketplaces } = useMarketplaceStore();

  const searchByBarcode = async (barcode: string): Promise<Product[]> => {
    if (!client) {
      console.warn('API client not initialized, using mock data');
      return mockProducts.filter(p => p.barcode === barcode);
    }

    const trendyol = marketplaces.find(m => m.id === 'trendyol');
    if (!trendyol?.credentials?.sellerId) {
      console.warn('Missing Trendyol credentials, using mock data');
      return mockProducts.filter(p => p.barcode === barcode);
    }

    try {
      setLoading(true);
      setError(null);

      const products = await fetchProductsByIds(
        client,
        trendyol.credentials.sellerId,
        [barcode]
      );

      return products;
    } catch (err) {
      console.warn('Failed to search product, using mock data');
      return mockProducts.filter(p => p.barcode === barcode);
    } finally {
      setLoading(false);
    }
  };

  return { searchByBarcode, loading, error };
}