import { useState, useEffect } from 'react';
import { useAmazonStore } from '../../store/amazonStore';
import { AmazonSPClient } from '../../services/amazon/client';
import { getAnalytics } from '../../services/amazon/analytics';
import type { AmazonAnalyticsData } from '../../types/amazon';

export function useAmazonAnalytics(selectedDate: Date) {
  const [metrics, setMetrics] = useState<AmazonAnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { credentials, region, isConfigured } = useAmazonStore();

  const loadAnalytics = async () => {
    if (!isConfigured || !credentials) {
      setError('Amazon SP-API not configured');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const client = new AmazonSPClient(credentials, region);
      const data = await getAnalytics(client, selectedDate);
      setMetrics(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch analytics';
      console.error('Failed to fetch Amazon analytics:', err);
      setError(message);
      setMetrics(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadAnalytics();
  }, [isConfigured, credentials, region, selectedDate]);

  return {
    metrics,
    loading,
    error,
    refresh: loadAnalytics
  };
}