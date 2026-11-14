import { ArrowDownRight, ArrowRight } from 'lucide-react';
import Link from 'next/link';

import type { DetailPageContent } from '@/content/types';
import { breadcrumbList, websiteRef } from '@/lib/schema';
import { SITE_ORIGIN, mailto } from '@/lib/site';

import { Breadcrumbs, type Crumb } from './breadcrumbs';
import { BriefContactBand } from './contact-band';
import { JsonLd } from './json-ld';
import { RelatedLinks } from './related-links';

type DetailPageProps = {
  content: DetailPageContent;
  /** `service` for /data-style pages, `audience` for /use-cases/* pages. */
  variant: 'service' | 'audience';
  contactAudience?: string;
};

const copy = {
  service: {
    asideLead: 'Market',
    introEyebrow: 'The work, in sequence',
    introHeading: 'Define the scope before research starts.',
    introCopy: 'Agree the market, fields and level of research before work begins.',
  },
  audience: {
    asideLead: 'Property',
    introEyebrow: 'A practical use case',
    introHeading: 'Use hotel research to choose your next step.',
    introCopy: 'The research and go-to-market support are scoped to the decision your team needs to make.',
  },
} as const;

/** Shared template for service pages and use-case (audience) pages. */
export function DetailPage({ content, variant, contactAudience = 'team' }: DetailPageProps) {
  const isAudience = variant === 'audience';
  const text = copy[variant];
  const trail: Crumb[] = isAudience
    ? [{ label: 'Use cases', href: '/use-cases' }, { label: content.eyebrow }]
    : [{ label: content.eyebrow }];

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: content.title,
    description: content.description,
    url: `${SITE_ORIGIN}${content.path}`,
    isPartOf: websiteRef,
    breadcrumb: breadcrumbList([
      { name: 'Home', path: '/' },
      ...(isAudience ? [{ name: 'Use cases', path: '/use-cases' }] : []),
      { name: content.eyebrow, path: content.path },
    ]),
  };

  return (
    <>
      <JsonLd data={schema} />
      <header className="service-hero">
        <Breadcrumbs items={trail} />
        <div className="service-hero-grid">
          <div>
            <span className="eyebrow">{content.eyebrow}</span>
            <h1>{content.heading.lead}<br /><em>{content.heading.emphasis}</em></h1>
            <p>{content.lede}</p>
            <div className="hero-actions">
              <a className="button-primary" href={mailto('Hospitality intelligence inquiry')}>Discuss your brief <ArrowRight size={15} /></a>
              {isAudience && <Link href="/use-cases" className="text-link">All use cases <ArrowDownRight size={14} /></Link>}
            </div>
          </div>
          <div className="service-hero-aside" aria-hidden="true">
            <span>HOTELGTM / MARKET NOTES</span>
            <strong>{text.asideLead}<br />→ group<br />→ people</strong>
            <small>Scope the question.<br />Map what matters.</small>
          </div>
        </div>
      </header>
      <section className="service-detail-section">
        <div className="service-detail-intro">
          <span className="eyebrow">{text.introEyebrow}</span>
          <h2>{text.introHeading}</h2>
          <p>{text.introCopy}</p>
        </div>
        <div className="detail-list">
          {content.sections.map((section) => (
            <article className="detail-row" key={section.number}>
              <span className="service-number">{section.number}</span>
              <div>
                <h3>{section.title}</h3>
                <p>{section.copy}</p>
                <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
              </div>
            </article>
          ))}
        </div>
      </section>
      <RelatedLinks eyebrow="Continue exploring" heading="Related data and services." links={content.related} />
      <BriefContactBand audience={contactAudience} />
    </>
  );
}
