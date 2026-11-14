import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { audienceSummaries } from '@/content/use-cases';

import { SectionHeading } from './section-heading';

export function AudienceGrid() {
  return (
    <section className="section audience-home" id="audiences">
      <SectionHeading eyebrow="Built for the hotel market" title="Commercial clarity for every route into hospitality.">
        <p>From B2B SaaS to procurement, our work maps the right property, group and executive audience for your offer.</p>
      </SectionHeading>
      <div className="audience-home-grid">
        {audienceSummaries.map((audience) => (
          <Link href={audience.href} key={audience.href}>
            <span>{audience.number}</span>
            <h3>{audience.title}</h3>
            <p>{audience.copy}</p>
            <ArrowRight size={15} />
          </Link>
        ))}
      </div>
    </section>
  );
}
