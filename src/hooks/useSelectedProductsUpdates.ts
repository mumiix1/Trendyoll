import { useState, useEffect, useCallback } from 'react';
import { useTrendyolClient } from './useTrendyolClient';
import { useMarketplaceStore } from '../store/marketplaceStore';
import { useSelectedProductsStore } from '../store/selectedProductsStore';
import { fetchProductsByIds } from '../services/trendyol/products/byId';
import { updateStockAndPrice } from '../services/trendyol/products/update';

const UPDATE_INTERVAL = 5000; // 5 seconds

export function useSelectedProductsUpdates() {
  const [updating, setUpdating] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);
  const client = useTrendyolClient();
  const { marketplaces } = useMarketplaceStore();
  const { selectedProducts, updateProducts } = useSelectedProductsStore();

  // Function to update stock and prices
  const updateStockAndPrices = async () => {
    if (!client) {
      setError('API client not initialized');
      return { success: false };
    }

    const trendyol = marketplaces.find(m => m.id === 'trendyol');
    if (!trendyol?.credentials?.sellerId) {
      setError('Missing Trendyol credentials');
      return { success: false };
    }

    try {
      setUpdating(true);
      setError(null);

      // Filter out products without barcodes
      const validProducts = selectedProducts.filter(p => p.barcode);
      
      if (validProducts.length === 0) {
        setError('No valid products to update');
        return { success: false };
      }

      // Prepare updates
      const updates = validProducts.map(product => ({
        barcode: product.barcode!,
        quantity: product.stock,
        salePrice: product.price,
        listPrice: product.price
      }));

      // Send update request
      await updateStockAndPrice(
        client,
        trendyol.credentials.sellerId,
        updates
      );

      // Update last updated timestamp
      setLastUpdated(new Date());
      
      // Refresh product data
      await refreshProducts();

      return { success: true };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update stock and prices';
      console.error('Stock update failed:', err);
      setError(message);
      return { success: false };
    } finally {
      setUpdating(false);
    }
  };

  // Function to refresh product data
  const refreshProducts = async () => {
    if (!client || selectedProducts.length === 0) return;

    const trendyol = marketplaces.find(m => m.id === 'trendyol');
    if (!trendyol?.credentials?.sellerId) return;

    try {
      const barcodes = selectedProducts
        .map(p => p.barcode)
        .filter((barcode): barcode is string => Boolean(barcode));

      if (barcodes.length === 0) return;

      const updatedProducts = await fetchProductsByIds(
        client,
        trendyol.credentials.sellerId,
        barcodes
      );

      if (updatedProducts.length > 0) {
        updateProducts(updatedProducts);
        setLastUpdated(new Date());
      }
    } catch (err) {
      console.error('Failed to refresh products:', err);
    }
  };

  // Set up automatic refresh
  useEffect(() => {
    if (selectedProducts.length === 0) return;

    const intervalId = setInterval(refreshProducts, UPDATE_INTERVAL);
    return () => clearInterval(intervalId);
  }, [selectedProducts]);

  return {
    updating,
    lastUpdated,
    error,
    refreshProducts,
    updateStockAndPrices
  };
}