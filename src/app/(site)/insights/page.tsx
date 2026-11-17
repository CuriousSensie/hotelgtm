import { InsightsBrowser, type InsightSummary } from '@/components/insights/insights-browser';
import { SalesContactBand } from '@/components/shared/contact-band';
import { JsonLd } from '@/components/shared/json-ld';
import { articles } from '@/content/articles';
import { formatLongDate } from '@/lib/format';
import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata({
  title: 'HotelGTM Insights | Hotel Ownership & B2B GTM',
  description: 'Practical guides to hotel ownership research, management-company mapping, decision-maker research and B2B go-to-market planning for hospitality.',
  path: '/insights',
});

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: 'HotelGTM Insights',
  description: 'Guides to hotel ownership and buyer research, and go-to-market planning for B2B teams selling into hospitality.',
};

const summaries: InsightSummary[] = articles.map(({ slug, title, deck, category, publishedAt, read }) => ({
  slug,
  title,
  deck,
  category,
  date: formatLongDate(publishedAt),
  read,
}));

export default function InsightsPage() {
  return (
    <div className="lp">
      <JsonLd data={schema} />
      <section className="in-hero">
        <div className="lp-wrap in-hero-head lp-rise">
          <h1>Guides to hotel ownership<br />and go-to-market.</h1>
          <div className="in-hero-side">
            <p>Build a target list, untangle ownership, find the real buyer, plan the market entry.</p>
          </div>
        </div>
      </section>
      <InsightsBrowser items={summaries} />
      <SalesContactBand />
    </div>
  );
}
