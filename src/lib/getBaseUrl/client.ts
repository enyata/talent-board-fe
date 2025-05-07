export function getClientBaseUrl(): string {
    if (typeof window === 'undefined') {
      throw new Error('getClientBaseUrl must be called client-side');
    }
    return window.location.origin;
  }
  