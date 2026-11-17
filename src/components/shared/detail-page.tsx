import { ArrowRight } from 'lucide-react';

import { DetailSteps } from '@/components/detail/detail-steps';
import { HeroNotes, type NotesGroup } from '@/components/detail/hero-notes';
import { vignettePlan } from '@/components/detail/vignette-map';
import { Reveal } from '@/components/landing/reveal';
import { ownershipSamples } from '@/content/home';
import type { DetailPageContent } from '@/content/types';
import { breadcrumbList, websiteRef } from '@/lib/schema';
import { SITE_ORIGIN, mailto } from '@/lib/site';

import { Breadcrumbs, type Crumb } from './breadcrumbs';
import { BriefContactBand } from './contact-band';
import { JsonLd } from './json-ld';

type DetailPageProps = {
  content: DetailPageContent;
  /** `service` for /data-style pages, `audience` for /use-cases/* pages. */
  variant: 'service' | 'audience';
  contactAudience?: string;
};

const copy = {
  service: { asideLead: 'Market', introHeading: 'Agree the scope. Then do the work.' },
  audience: { asideLead: 'Property', introHeading: 'From market map to first conversation.' },
} as const;

/** Fills the hero card's market, group and people chain from one invented demo record. */
function heroGroups(sampleIndex: number, variant: DetailPageProps['variant']): NotesGroup[] {
  const sample = ownershipSamples[sampleIndex % ownershipSamples.length];
  const [, operator, owner] = sample.entities;
  const segment = sample.hotel.meta.split(' · ')[1] ?? sample.hotel.meta;
  const people = sample.entities
    .flatMap((entity) => entity.people)
    .sort((a, b) => a.rank - b.rank)
    .slice(0, 3);

  return [
    {
      label: copy[variant].asideLead,
      rows: [variant === 'service'
        ? { name: sample.hotel.place, sub: segment }
        : { name: sample.hotel.name, sub: sample.hotel.place }],
    },
    { label: '→ group', rows: [owner, operator].map((entity) => ({ name: entity.name, sub: entity.role })) },
    { label: '→ people', rows: people.map((person) => ({ name: person.name, sub: person.authority, rank: person.rank })) },
  ];
}

/** Shared template for service pages and use-case (audience) pages. */
export function DetailPage({ content, variant, contactAudience = 'team' }: DetailPageProps) {
  const isAudience = variant === 'audience';
  const text = copy[variant];
  const plan = vignettePlan(content.path);
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
    <div className="lp">
      <JsonLd data={schema} />
      <header className="dp-hero">
        <div className="lp-wrap">
          <Breadcrumbs items={trail} />
          <div className="dp-hero-grid">
            <div className="dp-hero-copy lp-rise">
              <h1>{content.heading.lead}<br /><em>{content.heading.emphasis}</em></h1>
              <p>{content.lede}</p>
              <div className="lp-actions">
                <a className="lp-button" href={mailto('HotelGTM commercial inquiry')}>Send a brief <ArrowRight size={15} /></a>
              </div>
            </div>
            <HeroNotes bar="HOTELGTM / ACCOUNT MAP" groups={heroGroups(plan.sample, variant)} />
          </div>
        </div>
      </header>
      <section className="lp-section lp-section-tint dp-sequence">
        <div className="lp-wrap">
          <Reveal className="lp-heading">
            <h2>{text.introHeading}</h2>
          </Reveal>
          <DetailSteps sections={content.sections} kinds={plan.kinds} sample={plan.sample} />
        </div>
      </section>
      <BriefContactBand audience={contactAudience} />
    </div>
  );
}
