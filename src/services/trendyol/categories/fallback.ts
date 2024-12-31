import type { TrendyolCategory } from '../types';

export const mockCategories: TrendyolCategory[] = [
  { id: 1, name: 'Electronics', parentId: null },
  { id: 2, name: 'Fashion', parentId: null },
  { id: 3, name: 'Home & Living', parentId: null },
  { id: 4, name: 'Smartphones', parentId: 1 },
  { id: 5, name: 'Laptops', parentId: 1 },
  { id: 6, name: 'Men\'s Clothing', parentId: 2 },
  { id: 7, name: 'Women\'s Clothing', parentId: 2 }
];