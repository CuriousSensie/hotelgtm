import { ArrowRight } from 'lucide-react';

import { mailto } from '@/lib/site';

type ContactBandProps = {
  eyebrow: string;
  heading: string;
  copy: string;
  ctaLabel: string;
  ctaHref: string;
};

function ContactBand({ eyebrow, heading, copy, ctaLabel, ctaHref }: ContactBandProps) {
  return (
    <section className="contact-band">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2>{heading}</h2>
        <p>{copy}</p>
      </div>
      <a className="button-primary" href={ctaHref}>{ctaLabel} <ArrowRight size={15} /></a>
    </section>
  );
}

/** Closing band on the home, insights and article pages. */
export function SalesContactBand() {
  return (
    <ContactBand
      eyebrow="For B2B teams selling into hotels"
      heading="Build a clearer route into hospitality."
      copy="Tell us which hotel audiences matter and where your pipeline needs to move."
      ctaLabel="Discuss your target market"
      ctaHref={mailto('HotelGTM commercial inquiry', 'Hello HotelGTM,\n\nWe sell:\nOur target hotel audience is:\n')}
    />
  );
}

/** Closing band on company, use-case and service pages. */
export function BriefContactBand({ audience = 'hospitality teams' }: { audience?: string }) {
  return (
    <ContactBand
      eyebrow="Start with the question"
      heading="Let’s scope the market."
      copy={`Tell us what you need to understand and we’ll discuss a practical research or go-to-market brief for your ${audience}.`}
      ctaLabel="Discuss your brief"
      ctaHref={mailto('HotelGTM commercial inquiry', 'Hello HotelGTM,\n\nWe are looking to understand:\nOur market or audience:\n')}
    />
  );
}
