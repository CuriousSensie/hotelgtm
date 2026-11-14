import { ArrowDownRight, ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { BriefContactBand } from '@/components/shared/contact-band';
import { JsonLd } from '@/components/shared/json-ld';
import { RelatedLinks } from '@/components/shared/related-links';
import { audienceSummaries } from '@/content/use-cases';
import { buildMetadata } from '@/lib/metadata';
import { SITE_ORIGIN } from '@/lib/site';

const title = 'HotelGTM Use Cases | Hospitality Commercial Intelligence';
const description = 'Explore how property management firms, B2B SaaS, CRE and investment teams, vendors and infrastructure suppliers reach hotel buyers with HotelGTM.';

export const metadata = buildMetadata({ title, description, path: '/use-cases' });

const schema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: title,
  description,
  url: `${SITE_ORIGIN}/use-cases`,
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: audienceSummaries.map((audience, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: audience.title,
      url: `${SITE_ORIGIN}${audience.href}`,
    })),
  },
};

const services = [
  { label: 'Ownership & management data', href: '/data', description: 'Scope property portfolios and connect hotels to owners, operators and decision-makers.' },
  { label: 'Outbound GTM playbooks', href: '/go-to-market', description: 'Position the offer, prioritize accounts and build campaigns for hotel buyers.' },
  { label: 'Pipeline execution', href: '/pipeline-execution', description: 'Set up the sales engine and operating cadence for scaling hotel pipeline.' },
];

export default function UseCasesPage() {
  return (
    <>
      <JsonLd data={schema} />
      <header className="service-hero use-cases-hero">
        <Breadcrumbs items={[{ label: 'Use cases' }]} />
        <div className="service-hero-grid">
          <div>
            <span className="eyebrow">Who HotelGTM supports</span>
            <h1>Commercial intelligence<br /><em>for the hotel market.</em></h1>
            <p>HotelGTM helps any business selling into hospitality reach hotel owners, management companies and executive decision-makers—from B2B SaaS and property management to CRE, renovation, infrastructure and procurement.</p>
            <div className="hero-actions">
              <Link className="button-primary" href="/data">Explore hotel intelligence <ArrowRight size={15} /></Link>
              <Link href="/go-to-market" className="text-link">GTM playbooks <ArrowDownRight size={14} /></Link>
            </div>
          </div>
          <div className="service-hero-aside" aria-hidden="true">
            <span>HOTELGTM / WHO WE HELP</span>
            <strong>Owners<br />Operators<br />Decision-makers</strong>
            <small>Verified data.<br />GTM strategy.<br />Pipeline execution.</small>
          </div>
        </div>
      </header>
      <section className="audience-directory">
        <div className="service-detail-intro">
          <span className="eyebrow">Choose your perspective</span>
          <h2>Start with your market question.</h2>
          <p>Explore the work through the lens of your team and the decision you need to make.</p>
        </div>
        <div className="audience-list">
          {audienceSummaries.map((audience) => (
            <article className="audience-row" key={audience.href}>
              <span className="service-number">{audience.number}</span>
              <div><h3>{audience.title}</h3><p>{audience.copy}</p></div>
              <Link className="text-link" href={audience.href}>{audience.action} <ArrowRight size={14} /></Link>
            </article>
          ))}
        </div>
      </section>
      <RelatedLinks eyebrow="HotelGTM services" heading="Intelligence. Strategy. Execution." links={services} />
      <BriefContactBand />
    </>
  );
}
