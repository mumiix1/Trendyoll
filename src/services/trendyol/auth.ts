import { encodeBase64, sanitizeHeaderValue } from '../../utils/encoding';
import type { TrendyolAuth } from '../../types/trendyol';

export function createAuthHeader(apiKey: string, apiSecret: string): string {
  return `Basic ${encodeBase64(`${apiKey}:${apiSecret}`)}`;
}

export function createUserAgent(supplierId: string, companyName?: string): string {
  return companyName?.trim()
    ? `${supplierId}-${sanitizeHeaderValue(companyName)}-API-v2`
    : `${supplierId}-DirectIntegration-API-v2`;
}

export function createHeaders(auth: TrendyolAuth): HeadersInit {
  return {
    'Authorization': createAuthHeader(auth.apiKey, auth.apiSecret),
    'User-Agent': createUserAgent(auth.supplierId, auth.companyName),
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };
}