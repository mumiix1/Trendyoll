import { API_CONFIG } from '../api/config';
import { makeRequest } from '../api/request';
import { createHeaders } from './auth';
import type { TrendyolAuth } from '../../types/trendyol';

export class TrendyolClient {
  private readonly baseUrl: string;
  private readonly headers: HeadersInit;

  constructor(private readonly auth: TrendyolAuth) {
    this.baseUrl = API_CONFIG.baseUrls.trendyol;
    this.headers = createHeaders(this.auth);
  }

  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    try {
      return await makeRequest<T>(url, {
        ...options,
        headers: {
          ...this.headers,
          ...options.headers,
        }
      });
    } catch (error) {
      // Log error details for debugging
      console.error('Trendyol API request failed:', {
        url,
        error,
        auth: {
          ...this.auth,
          apiSecret: '[REDACTED]' // Don't log sensitive data
        }
      });
      throw error;
    }
  }

  // Helper to check if client is properly configured
  isConfigured(): boolean {
    return Boolean(
      this.auth.apiKey &&
      this.auth.apiSecret &&
      this.auth.supplierId
    );
  }
}