import { useState } from 'react';
import { useTrendyolClient } from './useTrendyolClient';
import { useMarketplaceStore } from '../store/marketplaceStore';

interface UpdateProductData {
  barcode: string;
  quantity: number;
  salePrice: number;
  listPrice: number;
}

export function useUpdateProduct() {
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const client = useTrendyolClient();
  const { marketplaces } = useMarketplaceStore();

  const updateProduct = async (data: UpdateProductData): Promise<boolean> => {
    if (!client) {
      setError('API client not initialized');
      return false;
    }

    const trendyol = marketplaces.find(m => m.id === 'trendyol');
    if (!trendyol?.credentials?.sellerId) {
      setError('Missing Trendyol credentials');
      return false;
    }

    try {
      setUpdating(true);
      setError(null);

      const endpoint = `/suppliers/${trendyol.credentials.sellerId}/products/price-and-inventory`;
      
      await client.request(endpoint, {
        method: 'POST',
        body: JSON.stringify({
          items: [{
            barcode: data.barcode,
            quantity: data.quantity,
            salePrice: data.salePrice,
            listPrice: data.listPrice
          }]
        })
      });

      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update product';
      console.error('Failed to update product:', message);
      setError(message);
      return false;
    } finally {
      setUpdating(false);
    }
  };

  return { updateProduct, updating, error };
}