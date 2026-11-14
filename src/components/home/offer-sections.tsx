import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { mailto } from '@/lib/site';

import { SectionHeading } from './section-heading';
import { ServiceGrid, type ServiceCardData } from './service-card';

const coreServices: ServiceCardData[] = [
  { number: '01 / INTELLIGENCE', title: 'Hotel Ownership & Management Data', copy: 'Verified contact intelligence, property portfolios, owner entity structures, active management-company mapping and decision-maker contacts.', link: { label: 'Ownership & Management Contact Intelligence', href: '/data' } },
  { number: '02 / STRATEGY', title: 'Outbound B2B Go-to-Market Playbooks', copy: 'Positioning, messaging and campaign architecture built for hotel-industry decision-makers.', link: { label: 'B2B Outbound GTM Strategy', href: '/go-to-market' } },
  { number: '03 / EXECUTION', title: 'Account-Based Pipeline Execution', copy: 'Hands-on sales-engine setup and fractional GTM strategy for teams scaling hotel B2B pipeline.', link: { label: 'Pipeline Architecture & Execution', href: '/pipeline-execution' } },
];

const dataOffer: ServiceCardData[] = [
  { number: '01 / PROPERTIES', title: 'Hotel property lists', copy: 'Define a target universe by geography, hotel type and commercial fit so your team knows which accounts to pursue.', link: { label: 'How HotelGTM scopes data', href: '/data' } },
  { number: '02 / OWNERSHIP', title: 'Ownership & operating groups', copy: 'Connect hotels to their known owners, parent groups, operators and brands to see how target accounts relate.' },
  { number: '03 / BUYERS', title: 'Decision-maker research', copy: 'Identify relevant commercial roles and decision-makers at priority accounts, with context for why they may matter.' },
];

const goToMarketOffer: ServiceCardData[] = [
  { number: '01 / PRIORITIZE', title: 'Select markets & accounts', copy: 'Set your target segments and regions, then rank hotel groups by fit and opportunity.' },
  { number: '02 / PLAN', title: 'Plan buyer outreach', copy: 'Match your offer to the relevant roles, shape clear messages and set a focused outreach sequence.' },
  { number: '03 / EXECUTE', title: 'Start and refine', copy: 'Support early sales conversations, capture what the market tells you and refine the account plan.' },
];

export function ServicesOverview() {
  return (
    <section className="section" id="services">
      <SectionHeading eyebrow="Three connected services" title={<>Know the account.<br />Build the pipeline.</>}>
        <div>
          <p>HotelGTM pairs verified hotel ownership and management contact data with tailored strategy and hands-on pipeline setup for any business selling into hospitality.</p>
          <Link href="/use-cases" className="text-link">Explore who we support <ArrowRight size={14} /></Link>
        </div>
      </SectionHeading>
      <ServiceGrid items={coreServices} />
    </section>
  );
}

export function DataOffer() {
  return (
    <section className="section offer-detail" id="data">
      <SectionHeading eyebrow="Hospitality data" title="Hotel data for your target market.">
        <p>Build a focused view of the properties, ownership groups and buyers that fit your product—not a broad, undifferentiated hotel list.</p>
      </SectionHeading>
      <ServiceGrid items={dataOffer} />
      <a className="text-link offer-cta" href={mailto('HotelGTM data inquiry', 'Hello HotelGTM,\n\nOur product:\nTarget market:\n')}>Request a data brief <ArrowRight size={14} /></a>
    </section>
  );
}

export function GoToMarketOffer() {
  return (
    <section className="section offer-detail offer-dark" id="go-to-market">
      <SectionHeading eyebrow="Go-to-market services" title="Turn hotel data into sales activity.">
        <p>We help hospitality suppliers choose where to enter, prioritize the right hotel accounts and plan how to reach the people involved in buying.</p>
      </SectionHeading>
      <ServiceGrid items={goToMarketOffer} />
      <a className="text-link offer-cta" href={mailto('HotelGTM go-to-market inquiry', 'Hello HotelGTM,\n\nOur offer:\nTarget market:\n')}>Discuss a market launch <ArrowRight size={14} /></a>
    </section>
  );
}
