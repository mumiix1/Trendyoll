import type { TrendyolClient } from '../client';
import type { TrendyolCategory } from '../types';
import { mockCategories } from './fallback';

export async function fetchCategories(client: TrendyolClient): Promise<TrendyolCategory[]> {
  try {
    const response = await client.request<{ categories: TrendyolCategory[] }>('/product-categories');
    
    if (!response?.categories || !Array.isArray(response.categories)) {
      console.warn('Invalid category data received from API, using fallback');
      return mockCategories;
    }

    // Flatten the category hierarchy
    const flattenCategories = (categories: TrendyolCategory[]): TrendyolCategory[] => {
      return categories.reduce<TrendyolCategory[]>((acc, category) => {
        const { subCategories, ...categoryWithoutSub } = category;
        acc.push(categoryWithoutSub);
        if (subCategories && Array.isArray(subCategories)) {
          acc.push(...flattenCategories(subCategories));
        }
        return acc;
      }, []);
    };

    return flattenCategories(response.categories);
  } catch (error) {
    console.warn('Failed to fetch categories from API, using fallback data');
    return mockCategories;
  }
}