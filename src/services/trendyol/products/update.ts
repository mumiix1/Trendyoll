import type { TrendyolClient } from '../client';

interface StockPriceUpdate {
  barcode: string;
  quantity: number;
  salePrice: number;
  listPrice: number;
}

export async function updateStockAndPrice(
  client: TrendyolClient,
  supplierId: string,
  updates: StockPriceUpdate[]
): Promise<void> {
  if (!updates.length) {
    throw new Error('No updates provided');
  }

  try {
    const endpoint = `/suppliers/${supplierId}/products/price-and-inventory`;
    
    // Log request for debugging
    console.log('Sending stock update request:', {
      supplierId,
      updates: updates.map(({ barcode, quantity }) => ({ barcode, quantity }))
    });

    const response = await client.request(endpoint, {
      method: 'POST',
      body: JSON.stringify({
        items: updates.map(update => ({
          barcode: update.barcode,
          quantity: update.quantity,
          salePrice: update.salePrice,
          listPrice: update.listPrice
        }))
      })
    });

    // Log response for debugging
    console.log('Stock update response:', response);

    if (!response) {
      throw new Error('No response from API');
    }
  } catch (error) {
    console.error('Failed to update stock and price:', error);
    throw error;
  }
}