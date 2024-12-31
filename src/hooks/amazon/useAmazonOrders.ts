import { useState, useEffect } from 'react';
import { useAmazonStore } from '../../store/amazonStore';
import { AmazonSPClient } from '../../services/amazon/client';
import { getOrders } from '../../services/amazon/orders';
import { formatDateForAPI } from '../../utils/dateFormat';
import type { AmazonOrder } from '../../types/amazon';

export function useAmazonOrders(selectedDate: Date) {
  const [orders, setOrders] = useState<AmazonOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { credentials, region, isConfigured } = useAmazonStore();

  const loadOrders = async () => {
    if (!isConfigured || !credentials) {
      setError('Amazon SP-API not configured');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const client = new AmazonSPClient(credentials, region);
      const createdAfter = formatDateForAPI(selectedDate);
      const data = await getOrders(client, createdAfter);
      setOrders(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch orders';
      console.error('Failed to fetch Amazon orders:', err);
      setError(message);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadOrders();
  }, [isConfigured, credentials, region, selectedDate]);

  return {
    orders,
    loading,
    error,
    refresh: loadOrders
  };
}