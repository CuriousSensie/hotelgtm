import { ArrowRight } from 'lucide-react';

import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { JsonLd } from '@/components/shared/json-ld';
import { buildMetadata } from '@/lib/metadata';
import { breadcrumbList, websiteRef } from '@/lib/schema';
import { CONTACT_EMAIL, SITE_ORIGIN, mailto } from '@/lib/site';

const title = 'Contact HotelGTM | Hotel Ownership Intelligence & GTM';
const description = 'Contact HotelGTM about verified hotel ownership and management intelligence, tailored B2B GTM strategy or account-based pipeline execution.';

export const metadata = buildMetadata({ title, description, path: '/contact' });

const schema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: title,
  description,
  url: `${SITE_ORIGIN}/contact`,
  isPartOf: websiteRef,
  mainEntity: { '@type': 'Organization', name: 'HotelGTM', email: CONTACT_EMAIL },
  breadcrumb: breadcrumbList([{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact' }]),
};

const briefTemplate = [
  'Hello HotelGTM,',
  '',
  'Our organization and audience:',
  'Our offer or market question:',
  'Target geography or hotel segment:',
  'What we need to decide:',
  'Timing and useful context:',
  '',
].join('\n');

const guidance = [
  { index: '01', title: 'Your organization and audience', copy: 'Tell us whether you are a hospitality supplier, investor or hotel operator, and who you need to reach or understand.' },
  { index: '02', title: 'Your offer or question', copy: 'Describe the product, investment thesis, partnership or decision the research should support.' },
  { index: '03', title: 'Market boundaries', copy: 'Share relevant countries, regions, hotel segments, property types or target groups. It is fine to describe these as working assumptions.' },
  { index: '04', title: 'Timing and next step', copy: 'Note when you need to make a decision and whether you are looking for property data, ownership research, decision-maker context or go-to-market support.' },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={schema} />
      <header className="service-hero contact-hero">
        <Breadcrumbs items={[{ label: 'Contact' }]} />
        <div className="service-hero-grid">
          <div>
            <span className="eyebrow">Start a conversation</span>
            <h1>Discuss your hotel data<br /><em>or go-to-market needs.</em></h1>
            <p>Contact HotelGTM about verified hotel ownership and management intelligence, outbound strategy or pipeline execution for teams selling into hotels.</p>
            <a className="button-primary" href={mailto('HotelGTM commercial inquiry', briefTemplate)}>Email HotelGTM <ArrowRight size={15} /></a>
          </div>
          <div className="service-hero-aside contact-aside">
            <span>HOTELGTM / FIRST BRIEF</span>
            <strong>Audience<br />→ market<br />→ decision</strong>
            <small>A few clear details make<br />the first exchange useful.</small>
          </div>
        </div>
      </header>
      <section className="contact-guidance">
        <div className="contact-guidance-intro">
          <span className="eyebrow">What to include</span>
          <h2>Share these details so we can scope the work.</h2>
          <p>You do not need a finished brief. A concise note with the context below helps HotelGTM respond to your market question.</p>
        </div>
        <div className="contact-guidance-list">
          {guidance.map((item) => (
            <article key={item.index}>
              <span>{item.index}</span>
              <div><h3>{item.title}</h3><p>{item.copy}</p></div>
            </article>
          ))}
        </div>
      </section>
      <section className="contact-next-step">
        <div>
          <span className="eyebrow">Start by email</span>
          <h2>Send a brief to HotelGTM.</h2>
          <p>Your note gives us a starting point to clarify the research scope, the practical output and what needs validation.</p>
        </div>
        <a className="text-link" href={mailto('HotelGTM commercial inquiry')}>{CONTACT_EMAIL} <ArrowRight size={14} /></a>
      </section>
    </>
  );
}
