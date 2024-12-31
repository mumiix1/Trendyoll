import { useMemo } from 'react';
import type { Product } from '../types/marketplace';

export function useAvailableBrands(products: Product[]) {
  const brands = useMemo(() => {
    if (!Array.isArray(products)) {
      return [];
    }

    // Get unique brands and sort them alphabetically
    const uniqueBrands = Array.from(new Set(
      products
        .map(product => product.brand)
        .filter(Boolean)
    )).sort();

    return uniqueBrands;
  }, [products]);

  return {
    brands,
    loading: false,
    error: null
  };
}