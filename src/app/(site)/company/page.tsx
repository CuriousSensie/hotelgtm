import { ArrowDownRight, ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { OwnershipMap } from '@/components/company/ownership-map';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { BriefContactBand } from '@/components/shared/contact-band';
import { JsonLd } from '@/components/shared/json-ld';
import { buildMetadata } from '@/lib/metadata';
import { breadcrumbList, websiteRef } from '@/lib/schema';
import { SITE_ORIGIN } from '@/lib/site';

const title = 'About HotelGTM | Hotel Ownership Intelligence & GTM';
const description = 'HotelGTM helps B2B companies selling into hotels reach owners, management companies and executive decision-makers with intelligence and execution.';

export const metadata = buildMetadata({ title, description, path: '/company' });

const schema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: title,
  description,
  url: `${SITE_ORIGIN}/company`,
  isPartOf: websiteRef,
  about: { '@type': 'Organization', name: 'HotelGTM', description },
  breadcrumb: breadcrumbList([{ name: 'Home', path: '/' }, { name: 'Company', path: '/company' }]),
};

const scope = [
  { number: '01 / MAP', title: 'Hotel property research', copy: 'Define a relevant universe of hotels by geography, segment and profile, so teams can see which properties fit an offer or investment question.' },
  { number: '02 / CONNECT', title: 'Ownership and operating context', copy: 'Research the links between a property, its owner, parent group, operator and brand. Keep distinct relationships clear rather than treating them as interchangeable.' },
  { number: '03 / IDENTIFY', title: 'Decision-maker research', copy: 'Find relevant roles and people at priority accounts, with organizational context and clear notes about what is known and what still needs confirmation.' },
  { number: '04 / APPLY', title: 'Go-to-market support', copy: 'Help hospitality suppliers prioritize accounts, plan a route into target organizations and use early market conversations to refine the plan.' },
];

const method = [
  { index: '01', title: 'Clarify the brief', copy: 'Identify your audience, offer or investment question, target geography and the decision the work should inform.' },
  { index: '02', title: 'Agree the market and output', copy: 'Set inclusion criteria, research depth, fields and deliverable format before work begins.' },
  { index: '03', title: 'Connect findings to action', copy: 'Use the resulting property and account context to prioritize next steps, plan outreach or identify where more validation is needed.' },
];

const audiences = [
  { title: 'Hospitality suppliers', copy: 'Find target hotels and groups for your product, understand who may influence a purchase and focus sales effort on relevant accounts.', href: '/use-cases/suppliers', action: 'Supplier research' },
  { title: 'Hotel investors', copy: 'Map hotel markets, ownership structures and portfolios to support screening, sourcing or a clearly defined market question.', href: '/use-cases/investors', action: 'Investor research' },
  { title: 'Hotel operators', copy: 'Understand property and group relationships when assessing expansion, partnerships or commercial opportunities.', href: '/use-cases/operators', action: 'Operator research' },
];

export default function CompanyPage() {
  return (
    <>
      <JsonLd data={schema} />
      <header className="service-hero company-hero">
        <Breadcrumbs items={[{ label: 'Company' }]} />
        <div className="service-hero-grid">
          <div>
            <span className="eyebrow">Company / What HotelGTM does</span>
            <h1>Hospitality commercial intelligence<br /><em>and pipeline execution.</em></h1>
            <p>HotelGTM helps B2B SaaS, property management firms, asset managers, CRE brokers, design and renovation vendors, energy and infrastructure suppliers, and procurement groups reach hotel owners, management companies and executive decision-makers.</p>
            <div className="hero-actions">
              <Link className="button-primary" href="/data">Explore the research <ArrowRight size={15} /></Link>
              <Link href="/contact" className="text-link">Discuss a specific brief <ArrowDownRight size={14} /></Link>
            </div>
          </div>
          <div className="service-hero-aside company-aside company-aside--graphic"><OwnershipMap /></div>
        </div>
      </header>
      <section className="company-scope">
        <div className="company-scope-intro">
          <span className="eyebrow">The work</span>
          <h2>Hotel ownership intelligence and commercial execution.</h2>
          <p>HotelGTM scopes research and GTM support to the market question, team and decision the work needs to support.</p>
        </div>
        <div className="company-scope-list">
          {scope.map((item) => (
            <article key={item.number}>
              <span className="service-number">{item.number}</span>
              <div><h3>{item.title}</h3><p>{item.copy}</p></div>
            </article>
          ))}
        </div>
      </section>
      <section className="company-method">
        <div>
          <span className="eyebrow">How HotelGTM works</span>
          <h2>Start with the decision.<br /><em>Then build the route.</em></h2>
          <p>Work is framed around a practical commercial question, then connected to the research and execution required to move it forward.</p>
        </div>
        <ol>
          {method.map((step) => (
            <li key={step.index}>
              <span>{step.index}</span>
              <div><h3>{step.title}</h3><p>{step.copy}</p></div>
            </li>
          ))}
        </ol>
      </section>
      <section className="company-audience">
        <span className="eyebrow">Who the work is for</span>
        <h2>Who HotelGTM helps reach hospitality.</h2>
        <div className="company-audience-grid">
          {audiences.map((audience) => (
            <article key={audience.href}>
              <h3>{audience.title}</h3>
              <p>{audience.copy}</p>
              <Link href={audience.href}>{audience.action} <ArrowRight size={13} /></Link>
            </article>
          ))}
        </div>
      </section>
      <BriefContactBand />
    </>
  );
}
