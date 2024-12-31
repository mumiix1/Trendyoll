import { API_CONFIG } from './config';
import { APIError } from './error';

interface RequestOptions extends RequestInit {
  timeout?: number;
}

export async function makeRequest<T>(
  url: string,
  options: RequestOptions = {}
): Promise<T> {
  const { timeout = API_CONFIG.timeouts.default, ...fetchOptions } = options;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...fetchOptions.headers,
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new APIError(
        `API request failed: ${response.statusText}`,
        response.status
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    
    if (error instanceof Error) {
      throw new APIError(error.message);
    }
    
    throw new APIError('An unknown error occurred');
  }
}