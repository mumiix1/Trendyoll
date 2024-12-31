import type { Product } from '../types/marketplace';

export const mockProducts: Product[] = [
  {
    id: '1',
    title: 'Wireless Earbuds Pro',
    price: 299.99,
    currency: 'TRY',
    category: 'Electronics',
    status: {
      approved: true,
      onSale: true,
      archived: false,
      rejected: false,
      blacklisted: false
    },
    marketplace: 'trendyol',
    stock: 150,
    brand: 'TechPro',
    barcode: 'WEP001',
    imageUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300&h=300&fit=crop&q=80',
  },
  {
    id: '2',
    title: 'Smart Watch Series 5',
    price: 599.99,
    currency: 'TRY',
    category: 'Electronics',
    status: {
      approved: true,
      onSale: true,
      archived: false,
      rejected: false,
      blacklisted: false
    },
    marketplace: 'trendyol',
    stock: 5,
    brand: 'TechPro',
    barcode: 'SWS005',
    imageUrl: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=300&h=300&fit=crop&q=80',
  }
];