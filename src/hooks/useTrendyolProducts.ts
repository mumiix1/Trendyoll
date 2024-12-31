import { useState, useEffect, useCallback } from 'react';
import { useTrendyolClient } from './useTrendyolClient';
import { useMarketplaceStore } from '../store/marketplaceStore';
import { fetchProducts } from '../services/trendyol/products/api';
import { mockProducts } from '../services/trendyol/products/fallback';
import type { Product } from '../types/marketplace';

export function useTrendyolProducts() {
  const [products, setProducts] = useState<Product[]>(mockProducts); // Initialize with mock data
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const client = useTrendyolClient();
  const { marketplaces } = useMarketplaceStore();

  const loadProducts = useCallback(async () => {
    if (!client) {
      console.warn('API client not initialized, using mock data');
      return;
    }

    const trendyol = marketplaces.find(m => m.id === 'trendyol');
    if (!trendyol?.credentials?.sellerId) {
      console.warn('Missing Trendyol credentials, using mock data');
      return;
    }

    try {
      setLoading(true);
      const data = await fetchProducts(client, trendyol.credentials.sellerId);
      setProducts(data);
      setError(null);
    } catch (err) {
      console.warn('Failed to fetch products, using mock data');
      // Keep using mock data on error
    } finally {
      setLoading(false);
    }
  }, [client, marketplaces]);

  useEffect(() => {
    void loadProducts();
  }, [loadProducts]);

  return { products, loading, error, refresh: loadProducts };
}