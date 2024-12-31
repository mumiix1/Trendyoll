import type { AmazonCredentials, AmazonRegion } from '../../types/amazon';

export class AmazonSPClient {
  private baseUrl: string;

  constructor(
    private readonly credentials: AmazonCredentials,
    private readonly region: AmazonRegion
  ) {
    this.baseUrl = `https://sellingpartnerapi-${region}.amazon.com`;
  }

  private async getAccessToken(): Promise<string> {
    // Use a proxy endpoint for token exchange to avoid exposing credentials
    const response = await fetch('/api/amazon/auth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        refresh_token: this.credentials.refreshToken,
        client_id: this.credentials.clientId
      })
    });

    if (!response.ok) {
      throw new Error('Failed to get access token');
    }

    const data = await response.json();
    return data.access_token;
  }

  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    try {
      // Use a proxy endpoint for SP-API requests
      const response = await fetch(`/api/amazon${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        }
      });

      if (!response.ok) {
        throw new Error(`Amazon SP-API error: ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      console.error('Amazon SP-API request failed:', error);
      throw error;
    }
  }
}