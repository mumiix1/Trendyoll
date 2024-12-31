// Browser-safe HMAC implementation using SubtleCrypto
export async function createHmac(key: string, message: string): Promise<string> {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(key);
  const messageData = encoder.encode(message);

  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const signature = await crypto.subtle.sign(
    'HMAC',
    cryptoKey,
    messageData
  );

  return Array.from(new Uint8Array(signature))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

// Format date for AWS requests
export function getAmzDate(date = new Date()): string {
  return date.toISOString().replace(/[:-]|\.\d{3}/g, '');
}

// Create canonical request
export function createCanonicalRequest(
  method: string,
  path: string,
  query: string,
  headers: Record<string, string>,
  payload: string
): string {
  const canonicalHeaders = Object.entries(headers)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key.toLowerCase()}:${value.trim()}\n`)
    .join('');

  const signedHeaders = Object.keys(headers)
    .sort()
    .map(h => h.toLowerCase())
    .join(';');

  return [
    method,
    path,
    query,
    canonicalHeaders,
    signedHeaders,
    payload
  ].join('\n');
}