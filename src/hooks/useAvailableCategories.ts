import { useMemo } from 'react';
import { useCategories } from './useCategories';
import type { Product } from '../types/marketplace';

export function useAvailableCategories(products: Product[]) {
  const { categories, loading, error } = useCategories();
  
  const availableCategories = useMemo(() => {
    if (!Array.isArray(categories) || !Array.isArray(products)) {
      return [];
    }

    // Get unique categories from products
    const productCategories = new Set(products.map(product => product.category));
    
    // Filter categories to only include ones that exist in products
    return categories.filter(category => productCategories.has(category.name));
  }, [categories, products]);

  return { categories: availableCategories, loading, error };
}