import type { DetailPageContent } from './types';

export const dataService: DetailPageContent = {
  path: '/data',
  title: 'Hotel Ownership & Management Data | HotelGTM',
  description: 'Hotel property lists mapped to owner entities, management companies and brands, with researched decision-makers at priority accounts. Scoped to your market.',
  eyebrow: 'Ownership & management data',
  heading: { lead: 'Hotel Ownership &', emphasis: 'Management Data.' },
  lede: 'Every target hotel tied to its owner, operator and brand, and to the people who decide on what you sell.',
  sections: [
    { number: '01 / DEFINE', title: 'A property list built to your brief', copy: 'Geography, segment, room count, branded or independent. Every hotel is on the list for a stated reason.' },
    { number: '02 / CONNECT', title: 'Owner, operator and brand, kept separate', copy: 'Often three different firms. We map each relationship and roll properties up to parent groups.' },
    { number: '03 / RESEARCH', title: 'The people who decide, at priority accounts', copy: 'Budget owner, evaluator, approver. Each record marks what’s confirmed and what still needs checking.' },
    { number: '04 / DELIVER', title: 'A handoff your team can work from', copy: 'Fields, depth and format agreed before research starts.' },
  ],
};

export const goToMarketService: DetailPageContent = {
  path: '/go-to-market',
  title: 'Outbound B2B Go-to-Market Playbooks | HotelGTM',
  description: 'Hotel-specific positioning, messaging and outbound sequences built around who owns, runs and buys for each account. For B2B teams selling into hospitality.',
  eyebrow: 'Outbound GTM playbooks',
  heading: { lead: 'Outbound B2B', emphasis: 'Go-to-Market Playbooks.' },
  lede: 'Positioning, messaging and sequences built for how hotels buy: owner, operator and property each play a part.',
  sections: [
    { number: '01 / SELECT', title: 'Pick a market you can win', copy: 'We test your offer against segments and regions and pick an entry point you can explain in a sentence.' },
    { number: '02 / PRIORITIZE', title: 'Rank the accounts', copy: 'A workable first wave, with a note on why each account made the cut.' },
    { number: '03 / MAP & PLAN', title: 'Find the route to the buyer', copy: 'Who to contact first, what to say, and the question that tests fit.' },
    { number: '04 / REFINE', title: 'Adjust to what the market says', copy: 'We log what replies reveal, then re-rank accounts and update the plan.' },
  ],
};

export const pipelineExecutionService: DetailPageContent = {
  path: '/pipeline-execution',
  title: 'Account-Based Pipeline Execution for Hotels | HotelGTM',
  description: 'Account-based pipeline design, sales-engine setup and fractional GTM leadership for B2B teams building pipeline into hotels.',
  eyebrow: 'Pipeline execution',
  heading: { lead: 'Account-Based', emphasis: 'Pipeline Execution.' },
  lede: 'The pipeline structure, workflows and weekly rhythm behind a hotel sales motion, led fractionally if you need it.',
  sections: [
    { number: '01 / ARCHITECT', title: 'Design the account-based pipeline', copy: 'Target groups, ownership links and buying roles turned into stages with clear owners and rules.' },
    { number: '02 / SET UP', title: 'Build the sales engine', copy: 'Workflows and an operating rhythm that keep priority accounts moving week to week.' },
    { number: '03 / EXECUTE', title: 'Move priority accounts forward', copy: 'Hands-on help with selection, sequencing and deal progression from people who know hotel buying.' },
    { number: '04 / SCALE', title: 'Add fractional GTM leadership', copy: 'Senior commercial direction without a full-time hire for every gap.' },
  ],
};
