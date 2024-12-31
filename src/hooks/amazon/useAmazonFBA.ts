import { useState, useEffect } from 'react';
import { useAmazonStore } from '../../store/amazonStore';
import { AmazonSPClient } from '../../services/amazon/client';
import { getFBAInventory } from '../../services/amazon/fba';
import type { AmazonFBAInventoryItem } from '../../types/amazon';

interface FBAFilters {
  status: string;
  fulfillmentCenter: string;
  daysUntilExpiration: number;
}

export function useAmazonFBA(filters: FBAFilters) {
  const [inventory, setInventory] = useState<AmazonFBAInventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { credentials, region, isConfigured } = useAmazonStore();

  const loadInventory = async () => {
    if (!isConfigured || !credentials) {
      setError('Amazon SP-API not configured');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const client = new AmazonSPClient(credentials, region);
      const data = await getFBAInventory(client, filters);
      setInventory(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch FBA inventory';
      console.error('Failed to fetch Amazon FBA inventory:', err);
      setError(message);
      setInventory([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadInventory();
  }, [isConfigured, credentials, region, filters]);

  return {
    inventory,
    loading,
    error,
    refresh: loadInventory
  };
}