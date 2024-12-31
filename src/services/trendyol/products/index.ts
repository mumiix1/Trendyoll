// Core functionality
export { fetchProducts } from './api';
export { fetchFilteredProducts } from './filters';
export { fetchProductsByIds } from './byId';
export { mapTrendyolProduct } from './mappers';
export { mockProducts } from './fallback';

// Types
export type { 
  TrendyolProductResponse,
  TrendyolProductsApiResponse 
} from './types';
export type { ProductsQueryParams } from './api';
export type { ProductFilterParams } from './filters';