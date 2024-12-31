import { useMemo } from 'react';
import type { Product } from '../types/marketplace';

export function useProductSearch(products: Product[], searchQuery: string) {
  return useMemo(() => {
    if (!searchQuery.trim()) {
      return products;
    }

    const query = searchQuery.toLowerCase().trim();
    return products.filter(product => 
      product.title.toLowerCase().includes(query) || 
      (product.barcode && product.barcode.toLowerCase().includes(query))
    );
  }, [products, searchQuery]);
}