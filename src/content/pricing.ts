export type PricingTier = {
  /** Headline for the tier card, e.g. "250" credits or "Up to 25" accounts. */
  label: string;
  /** Monthly price in USD. */
  monthlyUsd: number;
  /** Full offer name used in structured data. */
  offerName: string;
  offerDescription: string;
};

export const creditTiers: PricingTier[] = [
  { label: '250', monthlyUsd: 1000, offerName: 'HotelGTM Hotel Intelligence Credits — 250 credits', offerDescription: '250 hotel intelligence credits per month. Indicative USD monthly price; scope confirmed in proposal.' },
  { label: '750', monthlyUsd: 2500, offerName: 'HotelGTM Hotel Intelligence Credits — 750 credits', offerDescription: '750 hotel intelligence credits per month. Indicative USD monthly price; scope confirmed in proposal.' },
  { label: '2,000', monthlyUsd: 5000, offerName: 'HotelGTM Hotel Intelligence Credits — 2,000 credits', offerDescription: '2,000 hotel intelligence credits per month. Indicative USD monthly price; scope confirmed in proposal.' },
];

export const advisoryTiers: PricingTier[] = [
  { label: 'Up to 25', monthlyUsd: 6000, offerName: 'HotelGTM Go-to-Market Advisory — up to 25 active target hotel accounts', offerDescription: 'Monthly advisory retainer covering up to 25 active target hotel accounts. Data credits billed separately. Indicative USD monthly price.' },
  { label: 'Up to 75', monthlyUsd: 10000, offerName: 'HotelGTM Go-to-Market Advisory — up to 75 active target hotel accounts', offerDescription: 'Monthly advisory retainer covering up to 75 active target hotel accounts. Data credits billed separately. Indicative USD monthly price.' },
  { label: 'Up to 150', monthlyUsd: 18000, offerName: 'HotelGTM Go-to-Market Advisory — up to 150 active target hotel accounts', offerDescription: 'Monthly advisory retainer covering up to 150 active target hotel accounts. Data credits billed separately. Indicative USD monthly price.' },
];

/** Index of the advisory tier rendered with the featured (dark) treatment. */
export const FEATURED_ADVISORY_TIER = 1;

export const creditUsage = [
  { cost: '1 credit', use: 'Core property profile' },
  { cost: '+1 credit', use: 'Owner, operator or brand relationship mapping' },
  { cost: '+2 credits', use: 'Named decision-maker research' },
];

export const advisoryIncludes = ['Market and account prioritization', 'Buyer mapping and outreach planning', 'Monthly plan review and refinement'];

const usd = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
export const formatUsd = (amount: number): string => usd.format(amount);
