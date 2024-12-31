import { useState } from 'react';
import { useTrendyolClient } from './useTrendyolClient';
import { useMarketplaceStore } from '../store/marketplaceStore';
import { updateStockAndPrice } from '../services/trendyol/products/update';
import type { Product } from '../types/marketplace';

interface UpdateResult {
  success: boolean;
  error?: string;
}

export function useProductUpdate() {
  const [updating, setUpdating] = useState(false);
  const client = useTrendyolClient();
  const { marketplaces } = useMarketplaceStore();

  const updateProducts = async (products: Product[]): Promise<UpdateResult> => {
    if (!client) {
      return { success: false, error: 'API client not initialized' };
    }

    const trendyol = marketplaces.find(m => m.id === 'trendyol');
    if (!trendyol?.credentials?.sellerId) {
      return { success: false, error: 'Missing Trendyol credentials' };
    }

    try {
      setUpdating(true);

      const updates = products.map(product => ({
        barcode: product.barcode!,
        quantity: product.stock,
        salePrice: product.price,
        listPrice: product.price
      }));

      await updateStockAndPrice(client, trendyol.credentials.sellerId, updates);
      
      return { success: true };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update products';
      console.error('Failed to update products:', err);
      return { success: false, error: message };
    } finally {
      setUpdating(false);
    }
  };

  return { updateProducts, updating };
}