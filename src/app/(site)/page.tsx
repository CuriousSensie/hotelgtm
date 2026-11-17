import { DataScene } from '@/components/landing/data-scene';
import { Hero } from '@/components/landing/hero';
import { ServicesTabs } from '@/components/landing/services-tabs';
import { SalesContactBand } from '@/components/shared/contact-band';
import { JsonLd } from '@/components/shared/json-ld';
import { SITE_ORIGIN } from '@/lib/site';

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'HotelGTM',
  description: 'Hotel ownership and management data, go-to-market playbooks and pipeline execution for B2B companies selling into hotels.',
  url: SITE_ORIGIN,
};

export default function HomePage() {
  return (
    <div className="lp">
      <JsonLd data={schema} />
      <Hero />
      <ServicesTabs />
      <DataScene />
      <SalesContactBand />
    </div>
  );
}
