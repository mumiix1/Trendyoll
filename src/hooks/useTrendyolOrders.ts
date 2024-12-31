import { useState, useCallback, useEffect } from 'react';
import { useTrendyolClient } from './useTrendyolClient';
import { useMarketplaceStore } from '../store/marketplaceStore';
import { fetchOrdersByDateRange } from '../services/trendyol/orders';
import { mockOrders } from '../services/trendyol/orders/fallback';
import type { Order } from '../types/orders';

interface UseTrendyolOrdersResult {
  orders: Order[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export function useTrendyolOrders(): UseTrendyolOrdersResult {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const client = useTrendyolClient();
  const { marketplaces } = useMarketplaceStore();

  const loadOrders = useCallback(async () => {
    if (!client) {
      console.warn('API client not initialized, using mock orders');
      setOrders(mockOrders);
      setLoading(false);
      return;
    }

    const trendyol = marketplaces.find(m => m.id === 'trendyol');
    if (!trendyol?.credentials?.sellerId) {
      console.warn('Missing Trendyol credentials, using mock orders');
      setOrders(mockOrders);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const data = await fetchOrdersByDateRange(
        client,
        trendyol.credentials.sellerId
      );
      
      setOrders(data);
    } catch (err) {
      console.warn('Failed to fetch orders from API, using mock data');
      setOrders(mockOrders);
      setError(null);
    } finally {
      setLoading(false);
    }
  }, [client, marketplaces]);

  useEffect(() => {
    void loadOrders();
  }, [loadOrders]);

  return {
    orders,
    loading,
    error,
    refresh: loadOrders
  };
}