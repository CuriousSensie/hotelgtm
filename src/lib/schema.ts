import { SITE_NAME, SITE_ORIGIN } from './site';

export type JsonLdObject = Record<string, unknown>;

export const websiteRef = { '@type': 'WebSite', name: SITE_NAME, url: SITE_ORIGIN } as const;

export function breadcrumbList(items: { name: string; path: string }[]): JsonLdObject {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.path === '/' ? SITE_ORIGIN : `${SITE_ORIGIN}${item.path}`,
    })),
  };
}
