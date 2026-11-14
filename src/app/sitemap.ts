import type { MetadataRoute } from 'next';

import { articles } from '@/content/articles';
import { useCases } from '@/content/use-cases';
import { SITE_ORIGIN } from '@/lib/site';

export const dynamic = 'force-static';

type Entry = MetadataRoute.Sitemap[number];

const page = (path: string, priority: number, changeFrequency: Entry['changeFrequency'] = 'monthly'): Entry => ({
  url: `${SITE_ORIGIN}${path}`,
  changeFrequency,
  priority,
});

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    page('/', 1.0),
    page('/company', 0.8),
    page('/contact', 0.7),
    page('/pricing', 0.8),
    page('/data', 0.9),
    page('/go-to-market', 0.9),
    page('/pipeline-execution', 0.9),
    page('/use-cases', 0.9),
    ...useCases.map((useCase) => page(useCase.path, useCase.featured ? 0.8 : 0.7)),
    page('/insights', 0.8),
    ...articles.map((article) => page(`/insights/${article.slug}`, 0.7, 'yearly')),
  ];
}
