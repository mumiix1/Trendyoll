import { useState, useCallback, useEffect, useRef } from 'react';
import { useTrendyolClient } from './useTrendyolClient';
import { useMarketplaceStore } from '../store/marketplaceStore';
import { fetchFilteredProducts } from '../services/trendyol/products';
import { mockProducts } from '../services/trendyol/products/fallback';
import type { Product } from '../types/marketplace';
import type { ProductFilterParams } from '../services/trendyol/products/filters';

export function useFilteredProducts(initialFilters: Partial<ProductFilterParams> = {}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const client = useTrendyolClient();
  const { marketplaces } = useMarketplaceStore();
  const loadingRef = useRef(false);

  const loadProducts = useCallback(async (filters: Partial<ProductFilterParams> = {}) => {
    // Prevent concurrent loading
    if (loadingRef.current) return;
    
    if (!client) {
      setProducts(mockProducts);
      return;
    }

    const trendyol = marketplaces.find(m => m.id === 'trendyol');
    if (!trendyol?.credentials?.sellerId) {
      setProducts(mockProducts);
      return;
    }

    try {
      loadingRef.current = true;
      setLoading(true);
      
      const data = await fetchFilteredProducts(client, {
        supplierId: trendyol.credentials.sellerId,
        ...filters
      });
      
      setProducts(data);
      setError(null);
    } catch (err) {
      console.warn('Failed to fetch products, using mock data');
      setProducts(mockProducts);
      setError(null);
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  }, [client, marketplaces]);

  useEffect(() => {
    void loadProducts(initialFilters);
  }, [loadProducts]);

  return { products, loading, error, refresh: loadProducts };
}