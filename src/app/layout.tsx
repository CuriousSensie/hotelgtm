import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';

import { JsonLd } from '@/components/shared/json-ld';
import { buildMetadata } from '@/lib/metadata';
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE, SITE_NAME, SITE_ORIGIN } from '@/lib/site';

import './globals.css';

/*
 * Loaded from the Google Fonts CSS API (not next/font): Google serves browser-specific font builds,
 * and next/font fetches with a fixed legacy user agent, which yields slightly different glyph metrics.
 */
const GOOGLE_FONTS_URL =
  'https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@500;600&display=swap';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  ...buildMetadata({ title: DEFAULT_TITLE, description: DEFAULT_DESCRIPTION, path: '/' }),
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#f3f0e7',
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  description:
    'Specialist hospitality commercial intelligence and execution partner for B2B companies selling into hotels, combining verified hotel ownership and management contact data with tailored GTM strategy and pipeline setup.',
  url: `${SITE_ORIGIN}/`,
  parentOrganization: { '@type': 'Organization', name: 'Hospitality Growth Advisors, LLC' },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href={GOOGLE_FONTS_URL} />
      </head>
      <body>
        <JsonLd data={organizationSchema} />
        {children}
      </body>
    </html>
  );
}
