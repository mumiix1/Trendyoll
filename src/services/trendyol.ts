import type { Product } from '../types/marketplace';

interface TrendyolApiResponse {
  items: Array<{
    id: string;
    title: string;
    listPrice: number;
    category: {
      name: string;
    };
    stockStatus: string;
    quantity: number;
  }>;
}

export async function fetchTrendyolProducts(apiKey: string, apiSecret: string, sellerId: string): Promise<Product[]> {
  if (!apiKey || !apiSecret || !sellerId) {
    throw new Error('Missing required credentials');
  }

  const baseUrl = 'https://api.trendyol.com/sapigw/suppliers';
  const url = `${baseUrl}/${sellerId}/products`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'Authorization': `Basic ${btoa(`${apiKey}:${apiSecret}`)}`,
        'User-Agent': 'Trendyol-Integration',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Trendyol API error (${response.status}): ${errorText}`);
    }

    const data: TrendyolApiResponse = await response.json();
    
    if (!data || !Array.isArray(data.items)) {
      throw new Error('Invalid response format from Trendyol API');
    }
    
    return data.items.map(item => ({
      id: item.id,
      title: item.title,
      price: item.listPrice,
      currency: 'TRY',
      category: item.category.name,
      status: item.stockStatus.toLowerCase(),
      marketplace: 'trendyol',
      stock: item.quantity,
      imageUrl: '', // Trendyol API doesn't provide image URLs in the product list
    }));
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Trendyol API Error: ${error.message}`);
    }
    throw new Error('Failed to fetch Trendyol products');
  }
}