export type ArticleSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type ArticleFaq = { question: string; answer: string };

export type Article = {
  slug: string;
  category: string;
  /** ISO date (YYYY-MM-DD). */
  publishedAt: string;
  read: string;
  title: string;
  deck: string;
  intro: string;
  takeaways: string[];
  sections: ArticleSection[];
  faq?: ArticleFaq[];
};

export const articles: Article[] = [
  {
    slug: 'hotel-market-intelligence-practical-guide',
    category: 'Market intelligence',
    publishedAt: '2026-10-21',
    read: '6 min read',
    title: 'Hotel market intelligence: a practical guide for commercial teams',
    deck: 'A useful hotel market view connects the properties that matter with the ownership and people behind them—and turns that map into a focused plan.',
    intro: 'Hotel market intelligence is the process of organizing property, ownership and decision-maker information so a hospitality business can make better commercial choices. The most useful view is not the biggest list: it is a current, clearly scoped picture of the market tied to a specific decision.',
    takeaways: [
      'Start with the commercial decision, not a data export.',
      'Connect hotel assets to the owning or operating group and relevant people.',
      'Record source, date checked and confidence so research can be maintained.',
      'Turn the result into a prioritized route to market with clear next actions.',
    ],
    sections: [
      { heading: 'What hotel market intelligence should answer', paragraphs: ['A well-built market view helps a team answer a few grounded questions: which properties fit, who has influence over a purchase, how are those assets connected, and what is the most credible way to begin a conversation?', 'Those questions are different for a supplier entering a region, an investor reviewing a segment and an operator assessing a partnership. Scope the work around the decision in front of you.'] },
      { heading: 'Build from properties to ownership to people', paragraphs: ['Begin with a defined property universe: geography, lodging type, brand or operating model, and any other relevant inclusion rules. Then connect each property to its known owner, management company or parent group. Treat these relationships as distinct; the brand on a building may not be the entity that owns it or makes a buying decision.', 'Only after the account structure is clear should a team identify decision-makers. Roles vary by organization and purchase. Record the person’s function, likely remit and the evidence behind the connection rather than assuming a title alone means authority.'] },
      { heading: 'Make quality visible', paragraphs: ['Market data changes. Ownership structures shift, properties reflag and people move roles. A practical research record carries its own maintenance context: source type, date checked, confidence, and what still needs verification.', 'Keep verified facts separate from working hypotheses. This simple discipline prevents a polished spreadsheet from disguising uncertainty and gives the next researcher a clear place to continue.'] },
      { heading: 'Turn insight into a route to market', paragraphs: ['A list is a starting point, not a go-to-market plan. Prioritize accounts using fit, access, timing and strategic value. Then map a relevant message to the audience, choose the first route of contact and define the action that would qualify a conversation.', 'For a focused first pass, select a small, explainable group of accounts and test the assumptions. Use what the team learns to refine the segment and outreach—not to claim certainty the evidence cannot support.'] },
      { heading: 'A useful operating rhythm', paragraphs: ['Assign an owner for each segment, set a review cadence that reflects how quickly the market moves, and capture changes as they happen. Commercial teams should be able to see what was researched, when it was checked and what action followed.', 'HotelGTM combines hospitality-specific research with GTM planning and pipeline execution for B2B teams selling into hotels. Explore our market mapping and decision-maker research, or speak with us about a specific commercial question.'] },
    ],
    faq: [
      { question: 'What is the difference between hotel market data and hotel market intelligence?', answer: 'Market data is the underlying information. Intelligence adds context, relationships, quality notes and a connection to a decision or commercial action.' },
      { question: 'How often should hotel ownership and contact research be refreshed?', answer: 'There is no single cadence for every market. Review frequency should reflect the pace of change, the value of the accounts and how actively the team relies on the information.' },
      { question: 'Can market intelligence support a new-region launch?', answer: 'Yes. A scoped property universe, ownership map and decision-maker view can help a team prioritize where to focus before it commits to broad outreach.' },
    ],
  },
  {
    slug: 'understanding-hotel-ownership-groups',
    category: 'Ownership research',
    publishedAt: '2026-10-21',
    read: '5 min read',
    title: 'How to understand hotel ownership groups before you approach',
    deck: 'A hotel’s flag, operator and owner can be different organizations. Mapping those relationships is the first step toward reaching the right commercial audience.',
    intro: 'Hotel ownership research identifies the entities connected to a property and clarifies how ownership, management and brand relationships differ. Before approaching a hotel account, verify which organization is relevant to the decision you want to influence.',
    takeaways: [
      'Do not assume a hotel brand is the property owner.',
      'Map owner, operator and brand as separate relationship types.',
      'Check the evidence and date for each important connection.',
      'Match the contact route to the specific decision and remit.',
    ],
    sections: [
      { heading: 'Why the distinction matters', paragraphs: ['A hotel may carry a recognizable brand, be managed by a specialist operator and be owned by a separate company or investment group. Each party can shape different decisions. A supplier seeking a property-level conversation may need a different route than one proposing a group-wide agreement.', 'Ownership research helps teams avoid treating every hotel as an independent account—or treating a brand relationship as proof of centralized buying.'] },
      { heading: 'Map the relationship, not just the name', paragraphs: ['For each property, capture the property name and location, brand affiliation, management or operating entity, and known ownership entity. Add the relationship type and the basis for the connection. If an entity is uncertain, mark it as unverified rather than forcing a match.', 'Use a consistent parent-group name where evidence supports it, while preserving the original entity names. This makes account roll-ups useful without erasing the legal and operational distinctions that matter.'] },
      { heading: 'Connect structure to decision-makers', paragraphs: ['Once the group structure is understood, identify roles relevant to the buying or investment question. A central team may set standards while property leaders manage local needs; a portfolio owner may influence priorities without handling daily procurement.', 'Treat contact data as a research lead, not a guarantee of authority. Confirm current role and remit before relying on a person as the route into an account.'] },
      { heading: 'Keep the map usable over time', paragraphs: ['Hotel transactions, rebrands and management changes can make old relationships misleading. Keep a checked date, evidence note and confidence indicator with each key connection. Review priority accounts at a cadence that matches the work.', 'HotelGTM’s ownership and decision-maker research can help build this structure, then connect it to a practical market-entry plan.'] },
    ],
    faq: [
      { question: 'Is a hotel brand usually the owner?', answer: 'Not necessarily. A brand, management company and owner can be separate entities, so each relationship should be researched and recorded independently.' },
      { question: 'What should a hotel ownership map include?', answer: 'At minimum: the property, its brand and operating relationships where known, the owner or parent group where evidenced, and the source context and date for those connections.' },
    ],
  },
  {
    slug: 'hotel-decision-maker-research',
    category: 'Decision-makers',
    publishedAt: '2026-10-21',
    read: '5 min read',
    title: 'Hotel decision-maker research: finding the right route into an account',
    deck: 'Good contact research is built around a decision and an organization—not a title list. Here is a disciplined way to identify relevant people and validate your route in.',
    intro: 'Hotel decision-maker research identifies people whose responsibilities are relevant to a specific commercial decision. It works best when it follows a clear account structure and records why each person may be relevant, what remains to confirm and how the team can approach appropriately.',
    takeaways: [
      'Define the decision and likely buying process before searching for names.',
      'Start with the property and organization structure.',
      'Record role relevance and verification context, not just contact details.',
      'Use research to guide a considered, specific first conversation.',
    ],
    sections: [
      { heading: 'Begin with the decision', paragraphs: ['“Find hotel decision-makers” is too broad to guide reliable research. Clarify what the business is offering, the likely buying or partnership decision, and whether the conversation belongs at property, regional, group or ownership level.', 'A clearer brief narrows relevant functions and makes it possible to judge whether a person is genuinely connected to the decision.'] },
      { heading: 'Build the account context first', paragraphs: ['Map the hotel to its operating and ownership context before looking for people. This helps separate a property-level contact from a group-level stakeholder and prevents teams from confusing brand visibility with buying authority.', 'Then identify roles that may be involved, such as operations, procurement, development, asset management or commercial leadership, depending on the decision. Role examples are starting points—not proof of remit.'] },
      { heading: 'Validate, document and prioritize', paragraphs: ['For each lead, record the role, organization, why it appears relevant, when it was checked and what needs confirmation. Prefer a smaller set of well-contextualized leads over a long list without provenance.', 'Prioritize using account fit and practical access. A relevant person at an account that fits the offer is often a better first step than a senior title with no clear connection to the decision.'] },
      { heading: 'Make research useful to outreach', paragraphs: ['Research should inform the opening, not become a script. Give the outreach owner enough context to explain why the account is relevant and ask a useful question. Keep the next action explicit, and update the record with what the conversation teaches the team.', 'HotelGTM pairs hospitality-specific decision-maker research with hands-on go-to-market execution, helping teams move from a target account to a considered route into it.'] },
    ],
    faq: [
      { question: 'Who makes decisions for a hotel?', answer: 'It depends on the decision. Property leaders, group functions, operators and ownership representatives may each influence different categories or stages.' },
      { question: 'How do you keep contact research reliable?', answer: 'Record role and organization context, the date checked and the evidence or verification still needed. Recheck priority leads before important outreach.' },
    ],
  },
  {
    slug: 'go-to-market-planning-hospitality',
    category: 'Go-to-market',
    publishedAt: '2026-10-21',
    read: '6 min read',
    title: 'A focused go-to-market plan for hospitality suppliers',
    deck: 'A workable hospitality launch plan links a defined account universe to a relevant offer, credible access and a repeatable learning loop.',
    intro: 'A hospitality go-to-market plan sets out which hotel accounts to pursue, why they fit, who may shape the decision and what the team will do next. It is most useful when it is specific enough to guide action and flexible enough to improve as the market responds.',
    takeaways: [
      'Choose a narrow, explainable market entry point.',
      'Translate product fit into account selection criteria.',
      'Map ownership and decision roles before sequencing outreach.',
      'Use early conversations to test assumptions and refine the plan.',
    ],
    sections: [
      { heading: 'Choose a point of entry', paragraphs: ['Hospitality is not one uniform market. Geography, property type, service model, ownership and operating structure all affect how a supplier reaches customers. Start with a segment where the offer has a clear reason to matter.', 'Write down the assumptions behind that choice. If the segment cannot be explained in a few clear criteria, it will be difficult to prioritize consistently.'] },
      { heading: 'Translate fit into an account map', paragraphs: ['Define the properties or groups that fit, then connect them to known ownership, operating context and relevant decision roles. Separate known facts from hypotheses and make the source context visible.', 'The result is an account universe that a commercial team can work from—not just a broad industry list.'] },
      { heading: 'Plan the first conversations', paragraphs: ['For each priority account, identify the most relevant audience, a plausible route to contact and the question that would establish whether a fit exists. Keep the message tied to a specific operational or commercial need rather than a generic product introduction.', 'Sequence accounts in a way the team can support. A considered first wave can surface access patterns and objections before the team expands its reach.'] },
      { heading: 'Learn and adapt', paragraphs: ['Set a review point to compare the plan with what the team is hearing. Which assumptions held? Where was the decision located? What information was missing? Use those observations to refine the segment, account map and next actions.', 'HotelGTM supports research and execution together: market mapping, ownership and decision-maker intelligence, and focused go-to-market planning.'] },
    ],
    faq: [
      { question: 'What belongs in a hospitality go-to-market plan?', answer: 'A defined segment, account criteria, ownership and decision context, an outreach approach, ownership of next actions and a process for incorporating what the team learns.' },
      { question: 'Should a supplier target hotels individually or groups?', answer: 'That depends on the offer and how the relevant decision is made. Research the property and group structure, then choose the level that best matches the buying process.' },
    ],
  },
];

export const getArticle = (slug: string): Article | undefined => articles.find((article) => article.slug === slug);
