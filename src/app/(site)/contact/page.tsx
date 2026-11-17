import { ArrowRight } from 'lucide-react';

import { BriefComposer } from '@/components/contact/brief-composer';
import { CopyEmail } from '@/components/contact/copy-email';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { JsonLd } from '@/components/shared/json-ld';
import { buildMetadata } from '@/lib/metadata';
import { breadcrumbList, websiteRef } from '@/lib/schema';
import { CONTACT_EMAIL, SITE_ORIGIN, mailto } from '@/lib/site';

const title = 'Contact HotelGTM | Hotel Ownership Intelligence & GTM';
const description = 'Send HotelGTM a brief on hotel ownership data, outbound go-to-market or pipeline execution. Tell us what you sell and which hotels you need to reach.';

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
  'What we sell:',
  'Who we need to reach:',
  'Target market or hotel segment:',
  'What we need to decide:',
  'Timing:',
  '',
].join('\n');

const SUBJECT = 'HotelGTM commercial inquiry';

export default function ContactPage() {
  return (
    <div className="lp">
      <JsonLd data={schema} />
      <header className="ct-hero">
        <div className="lp-wrap">
          <Breadcrumbs items={[{ label: 'Contact' }]} />
          <div className="ct-hero-grid">
            <div className="lp-rise">
              <h1>Tell us what you sell<br /><em>and who you need to reach.</em></h1>
              <p>A short email is enough. Share your offer and target market, and we’ll reply with how we’d scope the work.</p>
              <div className="lp-actions">
                <a className="lp-button" href={mailto(SUBJECT, briefTemplate)}>Email us your brief <ArrowRight size={15} /></a>
              </div>
              <div className="ct-direct">
                <span>Or write to</span>
                <a className="lp-link" href={mailto(SUBJECT)}>{CONTACT_EMAIL}</a>
                <CopyEmail email={CONTACT_EMAIL} />
              </div>
            </div>
            <div className="lp-rise" style={{ animationDelay: '.14s' }}>
              <BriefComposer to={CONTACT_EMAIL} subject={SUBJECT} body={briefTemplate} />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
