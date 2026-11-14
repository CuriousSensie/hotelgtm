import { InsightsBrowser, type InsightSummary } from '@/components/insights/insights-browser';
import { SalesContactBand } from '@/components/shared/contact-band';
import { JsonLd } from '@/components/shared/json-ld';
import { articles } from '@/content/articles';
import { formatLongDate } from '@/lib/format';
import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata({
  title: 'HotelGTM Insights | Hotel Ownership & B2B GTM',
  description: 'Guides to hotel ownership data, management-company mapping, decision-maker research and B2B go-to-market planning for hospitality.',
  path: '/insights',
});

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: 'HotelGTM Insights',
  description: 'Guides to hotel ownership and buyer research, and go-to-market planning for B2B teams selling into hospitality.',
};

const summaries: InsightSummary[] = articles.map(({ slug, title, deck, category, publishedAt }) => ({
  slug,
  title,
  deck,
  category,
  date: formatLongDate(publishedAt),
}));

export default function InsightsPage() {
  return (
    <>
      <JsonLd data={schema} />
      <section className="insights-hero">
        <span className="eyebrow">Hotel market guides</span>
        <h1>Hotel data and<br />market-entry guides.</h1>
        <p>Learn how to build hotel target lists, research ownership groups, identify buyer contacts and plan a hospitality market launch.</p>
      </section>
      <InsightsBrowser items={summaries} />
      <SalesContactBand />
    </>
  );
}
