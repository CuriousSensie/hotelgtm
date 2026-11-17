import { ArrowRight, Check } from 'lucide-react';
import Link from 'next/link';

import { Reveal } from '@/components/landing/reveal';
import { CreditPlans } from '@/components/pricing/credit-plans';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { JsonLd } from '@/components/shared/json-ld';
import {
  FEATURED_ADVISORY_TIER,
  advisoryIncludes,
  advisoryTiers,
  creditTiers,
  formatUsd,
} from '@/content/pricing';
import { buildMetadata } from '@/lib/metadata';
import { SITE_ORIGIN } from '@/lib/site';

const title = 'HotelGTM Pricing | Hotel Intelligence & GTM Advisory';
const description = 'Indicative monthly pricing for HotelGTM hotel intelligence credits and go-to-market advisory. Data credits and advisory retainers are priced separately.';

export const metadata = buildMetadata({ title, description, path: '/pricing' });

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'HotelGTM services',
  description,
  provider: { '@type': 'Organization', name: 'HotelGTM', url: SITE_ORIGIN },
  url: `${SITE_ORIGIN}/pricing`,
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Indicative proposed monthly services',
    itemListElement: [...creditTiers, ...advisoryTiers].map((tier) => {
      const price = String(tier.monthlyUsd);
      return {
        '@type': 'Offer',
        name: tier.offerName,
        price,
        priceCurrency: 'USD',
        description: tier.offerDescription,
        url: `${SITE_ORIGIN}/contact`,
        priceSpecification: { '@type': 'UnitPriceSpecification', price, priceCurrency: 'USD', unitText: 'MONTH' },
        itemOffered: { '@type': 'Service', name: tier.offerName },
      };
    }),
  },
};

/** Account volume of an advisory tier ("Up to 75" -> 75), used only to scale the volume bar. */
const accountVolume = (label: string) => Number(label.replace(/[^0-9]/g, ''));
const largestVolume = Math.max(...advisoryTiers.map((tier) => accountVolume(tier.label)));

export default function PricingPage() {
  return (
    <div className="lp">
      <JsonLd data={schema} />
      <header className="pr-hero">
        <div className="lp-wrap">
          <Breadcrumbs items={[{ label: 'Pricing' }]} />
          <div className="pr-hero-head">
            <div className="lp-rise">
              <h1>Hotel data credits<br /><em>and GTM advisory.</em></h1>
            </div>
            <div className="pr-hero-side lp-rise" style={{ animationDelay: '.12s' }}>
              <p>Research credits, an advisory retainer, or both. Prices are indicative; your proposal confirms them.</p>
            </div>
          </div>
        </div>
      </header>

      <section className="lp-section pr-section" id="credits" aria-labelledby="credits-heading">
        <div className="lp-wrap">
          <Reveal className="lp-heading">
            <h2 id="credits-heading">Hotel Intelligence Credits</h2>
            <div className="lp-heading-side"><p>Credits pay for research depth on each hotel.</p></div>
          </Reveal>
          <CreditPlans />
        </div>
      </section>

      <section className="lp-section lp-section-tint" id="advisory" aria-labelledby="advisory-heading">
        <div className="lp-wrap">
          <Reveal className="lp-heading">
            <h2 id="advisory-heading">Go-to-Market Advisory</h2>
            <div className="lp-heading-side"><p>Priced by active target accounts. Data credits are billed separately.</p></div>
          </Reveal>
          <div className="pr-plans">
            {advisoryTiers.map((tier, index) => (
              <Reveal key={tier.label} delay={index * 0.07}>
                <article className="pr-plan" data-featured={index === FEATURED_ADVISORY_TIER} data-testid={`card-advisory-tier-${index + 1}`}>
                  <div className="pr-plan-top">
                    <span className="lp-meta">Active target accounts</span>
                  </div>
                  <h3>{tier.label}</h3>
                  <span className="pr-volume" aria-hidden="true"><i style={{ width: `${(accountVolume(tier.label) / largestVolume) * 100}%` }} /></span>
                  <p className="pr-price">{formatUsd(tier.monthlyUsd)}<span>/month</span></p>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal className="pr-includes">
            <span className="lp-eyebrow">Every retainer includes</span>
            <ul>{advisoryIncludes.map((item) => <li key={item}><Check size={15} aria-hidden="true" /> {item}</li>)}</ul>
            <p>Planning and refinement only: running outreach isn’t included, and results aren’t guaranteed.</p>
          </Reveal>
        </div>
      </section>

      <section className="lp-closing">
        <Reveal className="lp-wrap lp-closing-inner">
          <h2>Every engagement starts with a brief.</h2>
          <p>Tell us the market and the decision. We’ll send a proposal.</p>
          <Link href="/contact" className="lp-button">Request a proposal <ArrowRight size={15} /></Link>
        </Reveal>
      </section>
    </div>
  );
}
