import { AudienceGrid } from '@/components/home/audience-grid';
import { EditorialPreview } from '@/components/home/editorial-preview';
import { Hero, ProofStrip } from '@/components/home/hero';
import { MethodBand } from '@/components/home/method-band';
import { DataOffer, GoToMarketOffer, ServicesOverview } from '@/components/home/offer-sections';
import { SalesContactBand } from '@/components/shared/contact-band';
import { JsonLd } from '@/components/shared/json-ld';
import { articles } from '@/content/articles';
import { SITE_ORIGIN } from '@/lib/site';

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'HotelGTM',
  description: 'Specialist hospitality commercial intelligence and execution partner for B2B companies selling into hotels.',
  url: SITE_ORIGIN,
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={schema} />
      <Hero />
      <ProofStrip />
      <ServicesOverview />
      <AudienceGrid />
      <DataOffer />
      <GoToMarketOffer />
      <MethodBand />
      <EditorialPreview article={articles[0]} />
      <SalesContactBand />
    </>
  );
}
