import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

import { HeroNotes, type NotesGroup } from '@/components/detail/hero-notes';
import type { VignetteKind } from '@/components/detail/vignette-map';
import { Vignette } from '@/components/detail/vignettes';
import { Reveal } from '@/components/landing/reveal';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { BriefContactBand } from '@/components/shared/contact-band';
import { JsonLd } from '@/components/shared/json-ld';
import { ownershipSamples } from '@/content/home';
import { audienceSummaries, useCases } from '@/content/use-cases';
import { buildMetadata } from '@/lib/metadata';
import { SITE_ORIGIN } from '@/lib/site';

const title = 'HotelGTM Use Cases | Hotel Ownership Data & B2B GTM';
const description = 'How property management firms, hospitality tech vendors, CRE and investment teams, and suppliers use HotelGTM to reach hotel owners, operators and buyers.';

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

/** Use cases without a directory card, linked in one line so they stay reachable. */
const moreUseCases = useCases
  .filter((useCase) => !useCase.featured)
  .map((useCase) => ({ href: useCase.path, label: useCase.eyebrow.replace(/^For /, '') }));

/* Illustrative hero card and card previews: every company and person comes from the invented demo data. */
const heroGroups: NotesGroup[] = [
  { label: 'Owners', rows: ownershipSamples.slice(0, 2).map((sample) => ({ name: sample.entities[2].name, sub: sample.entities[2].note })) },
  { label: 'Operators', rows: ownershipSamples.slice(0, 2).map((sample) => ({ name: sample.entities[1].name, sub: sample.entities[1].note })) },
  {
    label: 'Decision-makers',
    rows: ownershipSamples.map((sample) => {
      const top = sample.entities.flatMap((entity) => entity.people).find((person) => person.rank === 1) ?? sample.entities[2].people[0];
      return { name: top.name, sub: top.title, rank: top.rank };
    }),
  },
];

const previews: { kind: VignetteKind; sample: number }[] = [
  { kind: 'board', sample: 0 },
  { kind: 'contacts', sample: 1 },
  { kind: 'ownership', sample: 2 },
  { kind: 'accounts', sample: 0 },
];

export default function UseCasesPage() {
  return (
    <div className="lp">
      <JsonLd data={schema} />
      <header className="dp-hero">
        <div className="lp-wrap">
          <Breadcrumbs items={[{ label: 'Use cases' }]} />
          <div className="dp-hero-grid">
            <div className="dp-hero-copy lp-rise">
              <h1>Different offers,<br /><em>different hotel buyers.</em></h1>
              <p>A SaaS vendor, a management firm and an investor need different people at the same hotel. We map yours.</p>
            </div>
            <HeroNotes bar="HOTELGTM / WHO WE HELP" groups={heroGroups} />
          </div>
        </div>
      </header>
      <section className="lp-section lp-section-tint">
        <div className="lp-wrap">
          <Reveal className="lp-heading">
            <h2>Pick the route that matches your offer.</h2>
          </Reveal>
          <div className="dp-dir">
            {audienceSummaries.map((audience, index) => {
              const preview = previews[index % previews.length];
              return (
                <Reveal key={audience.href} delay={(index % 2) * 0.08}>
                  <Link className="dp-dir-card" href={audience.href}>
                    <div className="dp-dir-preview" aria-hidden="true">
                      <Vignette kind={preview.kind} sample={preview.sample} />
                    </div>
                    <div className="dp-dir-body">
                      <span className="lp-eyebrow">{audience.number}</span>
                      <h3>{audience.title}</h3>
                      <p>{audience.copy}</p>
                      <span className="dp-dir-action" aria-hidden="true"><ArrowUpRight size={16} /></span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
          <p className="dp-dir-more">
            Also for{' '}
            {moreUseCases.map((item, index) => (
              <span key={item.href}>
                {index > 0 && (index === moreUseCases.length - 1 ? ' and ' : ', ')}
                <Link href={item.href} className="lp-link">{item.label}</Link>
              </span>
            ))}
            .
          </p>
        </div>
      </section>
      <BriefContactBand />
    </div>
  );
}
