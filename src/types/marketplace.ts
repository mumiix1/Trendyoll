export interface MarketplaceCredentials {
  apiKey: string;
  apiSecret: string;
  sellerId?: string;
}

export interface Marketplace {
  id: string;
  name: string;
  icon: string;
  credentials?: MarketplaceCredentials;
}

export interface ProductStatus {
  approved: boolean;
  archived: boolean;
  onSale: boolean;
  rejected: boolean;
  blacklisted: boolean;
}

export interface Product {
  id: string;
  title: string;
  price: number;
  currency: string;
  category: string;
  status: ProductStatus;
  marketplace: string;
  stock: number;
  imageUrl: string;
}