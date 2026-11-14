import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { JsonLd } from '@/components/shared/json-ld';
import {
  FEATURED_ADVISORY_TIER,
  advisoryIncludes,
  advisoryTiers,
  creditTiers,
  creditUsage,
  formatUsd,
} from '@/content/pricing';
import { buildMetadata } from '@/lib/metadata';
import { SITE_ORIGIN } from '@/lib/site';

const title = 'HotelGTM Pricing | Hotel Intelligence & GTM Advisory';
const description = 'Indicative monthly pricing for HotelGTM hotel intelligence credits and bespoke go-to-market advisory. Data credits are priced separately from consulting retainers.';

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

const tierIndex = (index: number) => `0${index + 1}`;

export default function PricingPage() {
  return (
    <>
      <JsonLd data={schema} />
      <header className="service-hero pricing-hero">
        <Breadcrumbs items={[{ label: 'Pricing' }]} />
        <div className="pricing-intro">
          <span className="eyebrow">HotelGTM / Indicative proposed pricing</span>
          <h1>Hotel data and<br /><em>market-entry support.</em></h1>
          <p>Choose a monthly hotel intelligence credit allowance, bespoke go-to-market advisory, or both. These proposed tiers are indicative, not published market-rate claims. Data credits are priced separately from consulting retainers.</p>
        </div>
      </header>

      <section className="pricing-model" aria-labelledby="credits-heading">
        <div className="pricing-section-heading">
          <div>
            <span className="eyebrow">01 / Data credits</span>
            <h2 id="credits-heading">HotelGTM Hotel Intelligence Credits</h2>
          </div>
          <p>Use credits for a defined depth of hotel research. Monthly allowance and credit handling are confirmed in your proposal.</p>
        </div>
        <div className="pricing-tier-grid pricing-credit-grid">
          {creditTiers.map((tier, index) => (
            <article className="pricing-tier" key={tier.label} data-testid={`card-credit-tier-${tier.label}`}>
              <span className="tier-index">CREDIT ALLOWANCE / {tierIndex(index)}</span>
              <h3>{tier.label}<small> credits</small></h3>
              <p className="pricing-price">{formatUsd(tier.monthlyUsd)}<span>/month</span></p>
              <Link href="/contact" className="text-link" data-testid={`link-contact-credit-tier-${tier.label}`}>Discuss this allowance <ArrowRight size={14} /></Link>
            </article>
          ))}
        </div>
        <div className="credit-guide">
          <div>
            <span className="eyebrow">How credits are used</span>
            <h3>Research depth, made clear.</h3>
          </div>
          <ul>
            {creditUsage.map((item) => (
              <li key={item.cost}><strong>{item.cost}</strong><span>{item.use}</span></li>
            ))}
          </ul>
        </div>
      </section>

      <section className="pricing-model pricing-advisory" aria-labelledby="advisory-heading">
        <div className="pricing-section-heading">
          <div>
            <span className="eyebrow">02 / Bespoke consulting</span>
            <h2 id="advisory-heading">Bespoke Go-to-Market Advisory</h2>
          </div>
          <p>Monthly retainer volume is measured by active target hotel accounts in the plan. Data credits are priced separately from consulting retainers.</p>
        </div>
        <div className="pricing-tier-grid pricing-advisory-grid">
          {advisoryTiers.map((tier, index) => (
            <article
              className={`pricing-tier ${index === FEATURED_ADVISORY_TIER ? 'pricing-tier-featured' : ''}`}
              key={tier.label}
              data-testid={`card-advisory-tier-${index + 1}`}
            >
              <span className="tier-index">ACTIVE TARGET HOTEL ACCOUNTS / {tierIndex(index)}</span>
              <h3>{tier.label}</h3>
              <p className="pricing-price">{formatUsd(tier.monthlyUsd)}<span>/month</span></p>
              <Link href="/contact" className="text-link" data-testid={`link-contact-advisory-tier-${index + 1}`}>Discuss this scope <ArrowRight size={14} /></Link>
            </article>
          ))}
        </div>
        <p className="pricing-volume-note">Higher volume discussed separately.</p>
        <div className="advisory-includes">
          <span className="eyebrow">The advisory retainer includes</span>
          <ul>{advisoryIncludes.map((item) => <li key={item}>{item}</li>)}</ul>
          <p>Advisory covers planning and refinement; it does not include outreach execution or guarantee commercial results.</p>
        </div>
      </section>

      <section className="pricing-scope">
        <span className="eyebrow">Proposal / Confirmed scope</span>
        <h2>Every plan starts with a clear brief.</h2>
        <p>Scope, coverage, active account definitions and credit handling are confirmed in the proposal. Tell us your target market and what you need to decide; we will shape a plan around the work.</p>
        <Link href="/contact" className="text-link">Discuss your requirements <ArrowRight size={14} /></Link>
      </section>
    </>
  );
}
