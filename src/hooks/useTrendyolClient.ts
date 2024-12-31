import { useMemo } from 'react';
import { useMarketplaceStore } from '../store/marketplaceStore';
import { TrendyolClient } from '../services/trendyol/client';

export function useTrendyolClient() {
  const { marketplaces } = useMarketplaceStore();
  
  return useMemo(() => {
    const trendyol = marketplaces.find(m => m.id === 'trendyol');
    if (!trendyol?.credentials) {
      return null;
    }

    const { apiKey, apiSecret, sellerId } = trendyol.credentials;
    if (!apiKey || !apiSecret || !sellerId) {
      return null;
    }

    return new TrendyolClient({
      supplierId: sellerId,
      apiKey,
      apiSecret,
      companyName: 'E-Commerce Hub',
    });
  }, [marketplaces]);
}