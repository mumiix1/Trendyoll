import { useState, useEffect } from 'react';
import { useAmazonStore } from '../../store/amazonStore';
import { AmazonSPClient } from '../../services/amazon/client';
import { getInventory } from '../../services/amazon/inventory';
import type { AmazonInventoryItem } from '../../types/amazon';

export function useAmazonInventory() {
  const [inventory, setInventory] = useState<AmazonInventoryItem[]>([]);
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
      const data = await getInventory(client);
      setInventory(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch inventory';
      console.error('Failed to fetch Amazon inventory:', err);
      setError(message);
      setInventory([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadInventory();
  }, [isConfigured, credentials, region]);

  return {
    inventory,
    loading,
    error,
    refresh: loadInventory
  };
}