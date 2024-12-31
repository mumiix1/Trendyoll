export interface TrendyolProductImage {
  url: string;
}

export interface TrendyolProductResponse {
  id: string;
  barcode: string;
  title: string;
  brand: string;
  categoryName: string;
  images: TrendyolProductImage[];
  stockCode: string;
  quantity: number;
  salePrice: number;
  listPrice: number;
  productContentId: string;
  stockId: string;
  dimensionalWeight: number;
  description: string;
  currencyType: string;
  stockUnitType: string;
  approved: boolean;
  archived: boolean;
  onSale: boolean;
  rejected: boolean;
  blacklisted: boolean;
}

export interface TrendyolProductsApiResponse {
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
  content: TrendyolProductResponse[];
}