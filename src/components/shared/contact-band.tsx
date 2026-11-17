import { ArrowRight } from 'lucide-react';

import { mailto } from '@/lib/site';

type ContactBandProps = {
  heading: string;
  copy: string;
  ctaLabel: string;
  ctaHref: string;
};

function ContactBand({ heading, copy, ctaLabel, ctaHref }: ContactBandProps) {
  return (
    <section className="lp-closing">
      <div className="lp-wrap lp-closing-inner">
        <h2>{heading}</h2>
        <p>{copy}</p>
        <a className="lp-button" href={ctaHref}>{ctaLabel} <ArrowRight size={15} /></a>
      </div>
    </section>
  );
}

/** Closing band on the home and insights pages. */
export function SalesContactBand() {
  return (
    <ContactBand
      heading="Tell us who you sell to. We’ll send who decides, and how to reach them."
      copy="Send your market and hotel audience. We’ll reply with sample contacts and a proposed scope."
      ctaLabel="Get sample contacts"
      ctaHref={mailto('HotelGTM sample contacts', 'Hello HotelGTM,\n\nWhat we sell:\nOur target hotel audience:\n')}
    />
  );
}

/** Closing band on company, use-case and service pages. */
export function BriefContactBand({ audience = 'team' }: { audience?: string }) {
  return (
    <ContactBand
      heading="Let’s scope your market."
      copy={`Tell us what you sell and where. We’ll reply with a scope for your ${audience}.`}
      ctaLabel="Send a brief"
      ctaHref={mailto('HotelGTM commercial inquiry', 'Hello HotelGTM,\n\nWhat we sell:\nOur target market or audience:\n')}
    />
  );
}
