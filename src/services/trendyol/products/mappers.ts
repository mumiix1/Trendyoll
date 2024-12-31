import type { TrendyolProductResponse } from './types';
import type { Product } from '../../../types/marketplace';

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&h=300&fit=crop&q=80';

export function mapTrendyolProduct(item: TrendyolProductResponse): Product {
  return {
    id: item.id,
    title: item.title,
    price: item.salePrice || item.listPrice,
    currency: item.currencyType || 'TRY',
    category: item.categoryName,
    status: {
      approved: item.approved,
      archived: item.archived,
      onSale: item.onSale,
      rejected: item.rejected,
      blacklisted: item.blacklisted
    },
    marketplace: 'trendyol',
    stock: item.quantity,
    brand: item.brand,
    barcode: item.barcode,
    imageUrl: item.images?.[0]?.url || DEFAULT_IMAGE,
  };
}