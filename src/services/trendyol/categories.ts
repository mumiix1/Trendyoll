import type { TrendyolClient } from './client';

export interface TrendyolCategory {
  id: number;
  name: string;
  parentId: number | null;
  subCategories?: TrendyolCategory[];
}

export interface TrendyolCategoryResponse {
  categories: TrendyolCategory[];
}

export async function fetchCategories(client: TrendyolClient): Promise<TrendyolCategory[]> {
  try {
    const response = await client.request<TrendyolCategoryResponse>('/product-categories');
    
    if (!response?.categories || !Array.isArray(response.categories)) {
      throw new Error('Invalid category data received from API');
    }

    // Flatten the category hierarchy for the dropdown
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
    console.error('Failed to fetch Trendyol categories:', error);
    throw error instanceof Error 
      ? error 
      : new Error('Failed to fetch categories');
  }
}