'use client';

import { useSyncExternalStore } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

function subscribe(onChange: () => void) {
  const media = window.matchMedia(QUERY);
  media.addEventListener('change', onChange);
  return () => media.removeEventListener('change', onChange);
}

/**
 * Hydration-safe reduced-motion flag. Reports `false` on the server and during hydration, then the real
 * preference, so it can drive rendered output (attributes, styles) without an SSR mismatch.
 * Motion's useReducedMotion reads the media query on the first client render, which breaks hydration when used that way.
 */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, () => window.matchMedia(QUERY).matches, () => false);
}
