import type { Metadata } from 'next';

import { SITE_NAME, SITE_ORIGIN } from './site';

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  type?: 'website' | 'article';
};

/** Per-route metadata: title, description, canonical, Open Graph and Twitter tags. */
export function buildMetadata({ title, description, path, type = 'website' }: PageMetaInput): Metadata {
  const url = `${SITE_ORIGIN}${path}`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: SITE_NAME, type },
    twitter: { card: 'summary_large_image', title, description },
  };
}
