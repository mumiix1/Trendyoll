/**
 * Encodes a string to base64 format
 */
export function encodeBase64(str: string): string {
  return btoa(str);
}

/**
 * Sanitizes a string for use in HTTP headers by removing special characters
 */
export function sanitizeHeaderValue(str: string): string {
  return str.replace(/[^a-zA-Z0-9]/g, '');
}