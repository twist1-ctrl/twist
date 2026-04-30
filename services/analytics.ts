export const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? '';

/** Report a page view to GA4 (called on every client-side route change) */
export function pageview(url: string): void {
  if (!GA_ID || typeof window === 'undefined') return;
  window.gtag('config', GA_ID, { page_path: url });
}

/** Track a custom GA4 event */
export function trackEvent(
  action: string,
  params?: Record<string, string | number | boolean>
): void {
  if (!GA_ID || typeof window === 'undefined') return;
  window.gtag('event', action, params);
}
