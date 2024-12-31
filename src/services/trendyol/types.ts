export interface TrendyolAuth {
  apiKey: string;
  apiSecret: string;
  supplierId: string;
  companyName?: string;
}

export interface TrendyolImage {
  url: string;
}

export interface TrendyolProduct {
  id: string;
  barcode: string;
  title: string;
  brand: string;
  categoryName?: string;
  category?: {
    name: string;
  };
  images: TrendyolImage[];
  stockCode: string;
  quantity: number;
  salePrice?: number;
  listPrice: number;
  onSale: boolean;
  approved?: boolean;
  archived?: boolean;
  rejected?: boolean;
  blacklisted?: boolean;
}

export interface TrendyolProductsResponse {
  content: TrendyolProduct[];
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
}