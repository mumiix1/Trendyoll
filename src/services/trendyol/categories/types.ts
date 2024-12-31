export interface TrendyolCategory {
  id: number;
  name: string;
  parentId: number | null;
  subCategories?: TrendyolCategory[];
}

export interface TrendyolCategoryResponse {
  categories: TrendyolCategory[];
}