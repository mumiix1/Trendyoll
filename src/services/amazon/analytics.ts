import type { AmazonSPClient } from './client';
import type { AmazonAnalyticsData } from '../../types/amazon';
import { formatDateForAPI } from '../../utils/dateFormat';

export async function getAnalytics(
  client: AmazonSPClient,
  date: Date
): Promise<AmazonAnalyticsData> {
  try {
    const params = new URLSearchParams({
      startDate: formatDateForAPI(date),
      marketplaceIds: 'ATVPDKIKX0DER' // US marketplace
    });

    const response = await client.request(`/analytics/v1/metrics?${params}`);
    return response;
  } catch (error) {
    console.error('Failed to fetch analytics:', error);
    throw error;
  }
}