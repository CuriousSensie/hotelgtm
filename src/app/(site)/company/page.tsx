import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { OwnershipMap } from '@/components/company/ownership-map';
import { scopeVignettes } from '@/components/company/scope-vignettes';
import { Reveal } from '@/components/landing/reveal';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { BriefContactBand } from '@/components/shared/contact-band';
import { JsonLd } from '@/components/shared/json-ld';
import { buildMetadata } from '@/lib/metadata';
import { breadcrumbList, websiteRef } from '@/lib/schema';
import { SITE_ORIGIN } from '@/lib/site';

const title = 'About HotelGTM | Hotel Ownership Intelligence & GTM';
const description = 'HotelGTM maps who owns, manages and buys for each hotel, then helps B2B teams turn that map into pipeline with owners, management companies and decision-makers.';

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
  { number: '01 / MAP', title: 'Hotel property research', copy: 'The hotels that fit your offer or thesis.' },
  { number: '02 / CONNECT', title: 'Ownership and operating context', copy: 'Owner, parent group, operator and brand, kept separate.' },
  { number: '03 / IDENTIFY', title: 'Decision-maker research', copy: 'The people at priority accounts, confirmed or flagged to check.' },
  { number: '04 / APPLY', title: 'Go-to-market support', copy: 'Rank accounts, plan the route in, sharpen as you learn.' },
];

export default function CompanyPage() {
  return (
    <div className="lp">
      <JsonLd data={schema} />
      <header className="co-hero">
        <div className="lp-wrap">
          <Breadcrumbs items={[{ label: 'Company' }]} />
          <div className="co-hero-grid">
            <div className="lp-rise">
              <h1>Hotel ownership intelligence<br /><em>for teams that sell to hotels.</em></h1>
              <p>Brand, operator and owner each control different decisions. We map which one matters for your sale, and who to reach there.</p>
              <div className="lp-actions">
                <Link className="lp-button" href="/data">See the data service <ArrowRight size={15} /></Link>
              </div>
            </div>
            <div className="lp-rise" style={{ animationDelay: '.14s' }}><OwnershipMap /></div>
          </div>
        </div>
      </header>

      <section className="lp-section lp-section-tint">
        <div className="lp-wrap">
          <Reveal className="lp-heading">
            <h2>Research that ends in a plan.</h2>
            <div className="lp-heading-side"><p>Every engagement is scoped to one market question and the decision it informs.</p></div>
          </Reveal>
          <div className="co-scope">
            {scope.map((item, index) => (
              <Reveal key={item.number} delay={index * 0.07}>
                <article className="co-scope-card">
                  {scopeVignettes[index]}
                  <div className="co-scope-text">
                    <span className="lp-eyebrow">{item.number}</span>
                    <h3>{item.title}</h3>
                    <p>{item.copy}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <BriefContactBand />
    </div>
  );
}
