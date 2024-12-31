import { useState } from 'react';
import { useAmazonStore } from '../../store/amazonStore';
import { AmazonSPClient } from '../../services/amazon/client';
import { searchCatalog, getCatalogItem } from '../../services/amazon/catalog';
import type { AmazonCatalogItem } from '../../types/amazon';

export function useAmazonCatalog() {
  const [items, setItems] = useState<AmazonCatalogItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { credentials, region, isConfigured } = useAmazonStore();

  const search = async (query: string) => {
    if (!isConfigured || !credentials) {
      setError('Amazon SP-API not configured');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const client = new AmazonSPClient(credentials, region);
      const data = await searchCatalog(client, query);
      setItems(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to search catalog';
      console.error('Failed to search Amazon catalog:', err);
      setError(message);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  const getItemDetails = async (asin: string) => {
    if (!isConfigured || !credentials) {
      throw new Error('Amazon SP-API not configured');
    }

    const client = new AmazonSPClient(credentials, region);
    return getCatalogItem(client, asin);
  };

  return {
    items,
    loading,
    error,
    searchCatalog: search,
    getItemDetails
  };
}