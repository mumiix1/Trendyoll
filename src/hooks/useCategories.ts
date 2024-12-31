import { useState, useEffect, useCallback } from 'react';
import { useTrendyolClient } from './useTrendyolClient';
import { fetchCategories } from '../services/trendyol/categories/api';
import { mockCategories } from '../services/trendyol/categories/fallback';
import type { TrendyolCategory } from '../types/trendyol';

export function useCategories() {
  const [categories, setCategories] = useState<TrendyolCategory[]>(mockCategories); // Initialize with mock data
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const client = useTrendyolClient();

  const loadCategories = useCallback(async () => {
    if (!client) {
      console.warn('API client not initialized, using mock data');
      return;
    }

    try {
      setLoading(true);
      const data = await fetchCategories(client);
      setCategories(data);
      setError(null);
    } catch (err) {
      console.warn('Failed to fetch categories, using mock data');
      // Keep using mock data on error
    } finally {
      setLoading(false);
    }
  }, [client]);

  useEffect(() => {
    void loadCategories();
  }, [loadCategories]);

  return { categories, loading, error, refresh: loadCategories };
}