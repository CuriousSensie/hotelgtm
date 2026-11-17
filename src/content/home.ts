/** Home page copy and the illustrative demo data. */

export const hero = {
  eyebrow: 'Hotel ownership data + B2B go-to-market',
  title: 'Reach hotel owners, operators and the people who sign.',
  lede: 'Brand, management company and owner are often three different firms. We map which one decides, research the people there, and build the outbound plan to reach them.',
  primaryCta: { label: 'Scope your target market', subject: 'HotelGTM commercial inquiry' },
  secondaryCta: { label: 'Read the field guides', href: '/insights' },
};

export type OfferItem = {
  label: string;
  title: string;
  copy: string;
  link?: { label: string; href: string };
};

export const services = {
  eyebrow: 'Three services, one account map',
  title: ['Know the account.', 'Build the pipeline.'],
  copy: 'Data, playbooks and pipeline help. Use one service or all three.',
  items: [
    { label: 'Intelligence', title: 'Hotel Ownership & Management Data', copy: 'Every target hotel mapped to its owner, operator and brand, plus the people who decide.', link: { label: 'How the data is built', href: '/data' } },
    { label: 'Strategy', title: 'Outbound B2B Go-to-Market Playbooks', copy: 'Positioning, messaging and sequences written for how hotels buy.', link: { label: 'How playbooks are built', href: '/go-to-market' } },
    { label: 'Execution', title: 'Account-Based Pipeline Execution', copy: 'Sales-engine setup and fractional GTM leadership for hotel pipeline.', link: { label: 'How we run pipeline', href: '/pipeline-execution' } },
  ] satisfies OfferItem[],
};

export const dataOffer = {
  eyebrow: 'Ownership & management data',
  title: 'Hotel data scoped to your target market.',
  copy: 'Not a bulk list. The hotels, groups and buyers that matter for what you sell.',
  items: [
    { label: 'Properties', title: 'Target property lists', copy: 'The universe set by geography, segment and room count.' },
    { label: 'Ownership', title: 'Owner, operator and brand', copy: 'Each hotel linked to its owner, operator and flag, rolled up to parent groups.' },
    { label: 'Buyers', title: 'Decision-maker research', copy: 'The people who hold the budget, evaluate vendors or sign off.' },
  ] satisfies OfferItem[],
};

/* ---------- Illustrative demo data. Every hotel, company and person below is invented. ---------- */

export type GraphPerson = {
  id: string;
  name: string;
  title: string;
  /** Short description of the person's role in a buying decision. */
  authority: string;
  /** 1 = highest decision authority within the sample. */
  rank: number;
};
  /** Partly masked on purpose: the full value is what customers buy. */
  email: string;
  phone: string;

export type GraphEntityKind = 'brand' | 'operator' | 'owner';

export type GraphEntity = {
  kind: GraphEntityKind;
  role: string;
  name: string;
  note: string;
  people: GraphPerson[];
};

export type OwnershipSample = {
  id: string;
  query: string;
  hotel: { name: string; place: string; meta: string };
  entities: [GraphEntity, GraphEntity, GraphEntity];
};

export const ownershipSamples: OwnershipSample[] = [
  {
    id: 'calder',
    query: 'Who owns Hotel Calder, Savannah?',
    hotel: { name: 'Hotel Calder', place: 'Savannah, GA', meta: '142 rooms · Upper upscale' },
    entities: [
      { kind: 'brand', role: 'Brand', name: 'Atlas Collection', note: 'Franchise agreement', people: [
        { id: 'calder-b1', name: 'Priya Raman', title: 'Regional VP, Franchise Ops', authority: 'Brand standards', rank: 5, email: 'p.rama••••@atlascoll••.com', phone: '+1 (404) •••-••18' },
      ] },
      { kind: 'operator', role: 'Management company', name: 'Northlight Hotel Management', note: 'Operates 14 hotels', people: [
        { id: 'calder-o1', name: 'Marcus Oyelaran', title: 'Chief Operating Officer', authority: 'Budget owner', rank: 2, email: 'm.oyel••••@northlight••.com', phone: '+1 (912) •••-••63' },
        { id: 'calder-o2', name: 'Elena Brandt', title: 'General Manager', authority: 'Day-to-day lead', rank: 4, email: 'e.bran••••@northlight••.com', phone: '+1 (912) •••-••05' },
      ] },
      { kind: 'owner', role: 'Owner entity', name: 'Calder Street Holdings LLC', note: 'Held by Tidewater Hospitality Partners', people: [
        { id: 'calder-w1', name: 'Dana Whitlock', title: 'Managing Partner', authority: 'Final approver', rank: 1, email: 'd.whit••••@tidewater••.com', phone: '+1 (912) •••-••47' },
        { id: 'calder-w2', name: 'Tomás Reyes', title: 'VP, Asset Management', authority: 'Evaluates vendors', rank: 3, email: 't.reye••••@tidewater••.com', phone: '+1 (912) •••-••29' },
      ] },
    ],
  },
  {
    id: 'linden',
    query: 'The Linden House, Austin: who decides?',
    hotel: { name: 'The Linden House', place: 'Austin, TX', meta: '88 rooms · Boutique lifestyle' },
    entities: [
      { kind: 'brand', role: 'Brand', name: 'Independent', note: 'Soft-brand affiliation only', people: [
        { id: 'linden-b1', name: 'Jo Castellan', title: 'Director, Member Hotels', authority: 'Program contact', rank: 5, email: 'j.cast••••@memberhot••.com', phone: '+1 (212) •••-••74' },
      ] },
      { kind: 'operator', role: 'Management company', name: 'Field & Finch Hospitality', note: 'Operates 6 hotels', people: [
        { id: 'linden-o1', name: 'Amara Nwosu', title: 'President', authority: 'Final approver', rank: 1, email: 'a.nwos••••@fieldfinch••.com', phone: '+1 (512) •••-••12' },
        { id: 'linden-o2', name: 'Caleb Stroud', title: 'Director of Operations', authority: 'Evaluates vendors', rank: 3, email: 'c.stro••••@fieldfinch••.com', phone: '+1 (512) •••-••58' },
      ] },
      { kind: 'owner', role: 'Owner entity', name: 'Linden 4th Street LP', note: 'Held by Juniper Row Capital', people: [
        { id: 'linden-w1', name: 'Rachel Imani', title: 'Principal', authority: 'Budget owner', rank: 2, email: 'r.iman••••@juniperrow••.com', phone: '+1 (512) •••-••91' },
        { id: 'linden-w2', name: 'Owen Marsh', title: 'Asset Manager', authority: 'Reviews spend', rank: 4, email: 'o.mars••••@juniperrow••.com', phone: '+1 (512) •••-••36' },
      ] },
    ],
  },
  {
    id: 'harbor',
    query: 'Harbor & Vine Resort, Monterey ownership',
    hotel: { name: 'Harbor & Vine Resort', place: 'Monterey, CA', meta: '236 rooms · Luxury resort' },
    entities: [
      { kind: 'brand', role: 'Brand', name: 'Solenne Hotels & Resorts', note: 'Brand-managed flag', people: [
        { id: 'harbor-b1', name: 'Henrik Aalto', title: 'SVP, Procurement', authority: 'Evaluates vendors', rank: 3, email: 'h.aalt••••@solenne••.com', phone: '+1 (415) •••-••82' },
      ] },
      { kind: 'operator', role: 'Management company', name: 'Solenne Operating Co.', note: 'Operates 41 hotels', people: [
        { id: 'harbor-o1', name: 'Lucia Ferrand', title: 'Area Managing Director', authority: 'Budget owner', rank: 2, email: 'l.ferr••••@solenne••.com', phone: '+1 (831) •••-••40' },
        { id: 'harbor-o2', name: 'Devon Park', title: 'Director of Engineering', authority: 'Day-to-day lead', rank: 5, email: 'd.park••••@solenne••.com', phone: '+1 (831) •••-••67' },
      ] },
      { kind: 'owner', role: 'Owner entity', name: 'Cannery Point REIT', note: 'Portfolio of 22 hotels', people: [
        { id: 'harbor-w1', name: 'Simone Achterberg', title: 'Chief Investment Officer', authority: 'Final approver', rank: 1, email: 's.acht••••@cannerypt••.com', phone: '+1 (415) •••-••23' },
        { id: 'harbor-w2', name: 'Will Thackeray', title: 'Director, Capital Projects', authority: 'Reviews spend', rank: 4, email: 'w.thac••••@cannerypt••.com', phone: '+1 (415) •••-••54' },
      ] },
    ],
  },
];
