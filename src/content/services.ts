import type { DetailPageContent } from './types';

export const dataService: DetailPageContent = {
  path: '/data',
  title: 'Hotel Ownership & Management Data | HotelGTM',
  description: 'Verified hotel contact intelligence, property portfolios, owner entity structures, management-company mapping and decision-maker research.',
  eyebrow: 'Ownership & management contact intelligence',
  heading: { lead: 'Hotel Ownership &', emphasis: 'Management Data.' },
  lede: 'HotelGTM maps verified property portfolios to owner entities, active management companies and the decision-makers relevant to your commercial goal.',
  sections: [
    { number: '01 / DEFINE', title: 'Property lists shaped to your brief', copy: 'Set the market universe with clear inclusion criteria. The scope can reflect geography, hotel segment, property profile or other characteristics that matter to your offer or investment question.', bullets: ['Agreed market and location boundaries', 'Hotel types, segments or profiles to include', 'A defined property-level record for review'] },
    { number: '02 / CONNECT', title: 'Ownership, operator and brand context', copy: 'A property’s brand, management company and owner may be different organizations. HotelGTM maps these as distinct relationships to show how a hotel relates to an operating group, ownership entity or wider portfolio.', bullets: ['Property-to-brand relationships where relevant', 'Active management-company mapping', 'Owner and parent-group connections'] },
    { number: '03 / RESEARCH', title: 'Decision-maker context at priority accounts', copy: 'For the accounts that matter most, research relevant commercial roles and potential decision-makers against the question at hand. The objective is useful context—not a generic title dump or an assumption that every role holds authority.', bullets: ['Relevant roles and named people where in scope', 'Organization and account context', 'Research notes that distinguish known information from items to confirm'] },
    { number: '04 / DELIVER', title: 'A usable, clearly scoped deliverable', copy: 'The final scope is agreed before research begins. Deliverables can be structured as a property and account list, relationship mapping, decision-maker research, or a combination—depending on the brief and the depth required.', bullets: ['Agreed fields and level of research', 'Inclusion and exclusion rules documented', 'A defined handoff format for your team'] },
  ],
  related: [
    { label: 'B2B outbound GTM strategy', href: '/go-to-market', description: 'Turn verified account intelligence into a focused market-entry plan.' },
    { label: 'For suppliers', href: '/use-cases/suppliers', description: 'Find hotel accounts that fit your offer and reach relevant buyers.' },
    { label: 'For investors', href: '/use-cases/investors', description: 'Map hotel markets, ownership groups and portfolios.' },
  ],
};

export const goToMarketService: DetailPageContent = {
  path: '/go-to-market',
  title: 'Outbound B2B Go-to-Market Playbooks | HotelGTM',
  description: 'Hotel-industry positioning, messaging, outbound campaign architecture and deal-closing playbooks for B2B teams.',
  eyebrow: 'B2B outbound GTM strategy',
  heading: { lead: 'Outbound B2B', emphasis: 'Go-to-Market Playbooks.' },
  lede: 'HotelGTM builds positioning, messaging, outbound campaign architecture and deal-closing playbooks tailored to hotel-industry decision-makers.',
  sections: [
    { number: '01 / SELECT', title: 'Choose a market with a reason to win', copy: 'Clarify the offer, the customer problem and the assumptions behind a market choice. Compare potential segments or locations against practical fit rather than treating hospitality as one broad audience.', bullets: ['Define the commercial question and offer', 'Set market, segment and property criteria', 'Make assumptions visible for discussion'] },
    { number: '02 / PRIORITIZE', title: 'Build a focused account plan', copy: 'Use hotel property and organization context to identify accounts that match the agreed criteria. Prioritize a workable first group and explain why each account belongs in the plan.', bullets: ['Group accounts by relevant fit', 'Understand property, group and ownership context', 'Set a clear first-wave focus'] },
    { number: '03 / MAP & PLAN', title: 'Find a credible route to the buyer', copy: 'Map likely decision roles to each account structure, then shape a relevant approach. Plan outreach around what the audience may care about and the question that can establish whether there is a fit.', bullets: ['Identify relevant audiences and likely decision levels', 'Develop a useful opening and outreach sequence', 'Coordinate next actions with your team'] },
    { number: '04 / REFINE', title: 'Learn from the market response', copy: 'Early outreach is a chance to test the plan. Capture what is learned about fit, access and buying context, then use that knowledge to adjust target criteria and the next steps.', bullets: ['Review what conversations reveal', 'Refine the market and account priorities', 'Update the entry plan as the team learns'] },
  ],
  related: [
    { label: 'Hotel property and buyer data', href: '/data', description: 'Understand the data and research that can underpin the plan.' },
    { label: 'For suppliers', href: '/use-cases/suppliers', description: 'Find accounts that match your offer and reach relevant buyers.' },
    { label: 'Hotel market guides', href: '/insights', description: 'Read HotelGTM perspectives on hotel markets and commercial research.' },
  ],
};

export const pipelineExecutionService: DetailPageContent = {
  path: '/pipeline-execution',
  title: 'Account-Based Pipeline Execution for Hotels | HotelGTM',
  description: 'Hands-on sales-engine setup and fractional GTM strategy for B2B teams scaling pipeline into hotels.',
  eyebrow: 'Pipeline architecture & execution',
  heading: { lead: 'Account-Based', emphasis: 'Pipeline Execution.' },
  lede: 'HotelGTM builds the operating system behind a focused hotel sales motion: account architecture, sales-engine setup and fractional GTM leadership that moves a team from strategy to consistent action.',
  sections: [
    { number: '01 / ARCHITECT', title: 'Design the account-based pipeline', copy: 'Translate target hotel groups, ownership relationships and buying roles into a clear pipeline structure with stages, ownership and qualification criteria.', bullets: ['Account and buying-group architecture', 'Practical pipeline stages and definitions', 'Clear ownership and next-step discipline'] },
    { number: '02 / SET UP', title: 'Build the sales engine', copy: 'Set up the workflows and operating rhythm that support repeatable execution across priority hotel accounts.', bullets: ['CRM and sales process configuration guidance', 'Outbound workflow and handoff design', 'Reporting cadence for useful pipeline visibility'] },
    { number: '03 / EXECUTE', title: 'Move priority accounts forward', copy: 'Support account selection, outreach sequencing and deal progression with a hospitality-specific commercial perspective.', bullets: ['Focused account activation', 'Coaching on relevant buyer conversations', 'Review of response, qualification and deal movement'] },
    { number: '04 / SCALE', title: 'Add fractional GTM leadership', copy: 'Give teams scaling into hotels access to senior commercial direction without needing to build every capability in-house.', bullets: ['Fractional strategy and operating guidance', 'Continuous refinement of the hotel sales motion', 'A clear plan for internal capability growth'] },
  ],
  related: [
    { label: 'Ownership & management data', href: '/data', description: 'Ground the pipeline in verified hotel account intelligence.' },
    { label: 'Outbound GTM playbooks', href: '/go-to-market', description: 'Build the messaging and campaign strategy that activates accounts.' },
    { label: 'Hospitality tech & SaaS', href: '/use-cases/hospitality-tech-saas', description: 'See how hotel technology vendors reach buying teams.' },
  ],
};
