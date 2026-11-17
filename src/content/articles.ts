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
    deck: 'A useful market view links the right hotels to the owners and people behind them, then turns that map into a plan.',
    intro: 'Hotel market intelligence organizes property, ownership and decision-maker information so a hospitality business can make better commercial calls. The best version isn’t the biggest list. It’s a current, clearly scoped picture of the market, tied to one decision.',
    sections: [
      { heading: 'What hotel market intelligence should answer', paragraphs: ['A good market view answers a few grounded questions. Which properties fit? Who influences the purchase? How are the assets connected? What’s the most credible way to start a conversation?', 'The answers differ for a supplier entering a region, an investor reviewing a segment and an operator weighing a partnership. Scope the work to the decision in front of you.'] },
      { heading: 'Build from properties to ownership to people', paragraphs: ['Start with a defined property universe: geography, lodging type, brand or operating model, and any other inclusion rules. Then link each property to its known owner, management company or parent group. Keep these relationships separate. The brand on the building may not own it or make the buying decision.', 'Only once the account structure is clear should you look for decision-makers. Roles vary by organization and by purchase. Record each person’s function, likely remit and the evidence for the connection. A title alone doesn’t prove authority.'] },
      { heading: 'Make quality visible', paragraphs: ['Market data changes. Ownership shifts, properties reflag and people change roles. A practical record carries its own maintenance context: source type, date checked, confidence, and what still needs verifying.', 'Keep verified facts apart from working hypotheses. That one habit stops a polished spreadsheet from hiding uncertainty, and shows the next researcher where to pick up.'] },
      { heading: 'Turn insight into a route to market', paragraphs: ['A list is a starting point, not a go-to-market plan. Rank accounts by fit, access, timing and strategic value. Then match a message to the audience, choose the first point of contact and define what would qualify the conversation.', 'For a first pass, pick a small group of accounts you can explain, and test your assumptions. Use what you learn to refine the segment and the outreach—not to claim certainty the evidence can’t support.'] },
      { heading: 'A useful operating rhythm', paragraphs: ['Give each segment an owner, set a review cadence that matches how fast the market moves, and log changes as they happen. Your team should be able to see what was researched, when it was checked and what action followed.'] },
    ],
    faq: [
      { question: 'What is the difference between hotel market data and hotel market intelligence?', answer: 'Market data is the raw information. Intelligence adds context, relationships, quality notes and a link to a decision or commercial action.' },
      { question: 'How often should hotel ownership and contact research be refreshed?', answer: 'There’s no single cadence. Match it to how fast the market changes, how valuable the accounts are and how heavily your team relies on the data.' },
      { question: 'Can market intelligence support a new-region launch?', answer: 'Yes. A scoped property universe, an ownership map and a decision-maker view help a team choose where to focus before committing to broad outreach.' },
    ],
  },
  {
    slug: 'understanding-hotel-ownership-groups',
    category: 'Ownership research',
    publishedAt: '2026-10-21',
    read: '5 min read',
    title: 'How to understand hotel ownership groups before you approach',
    deck: 'A hotel’s flag, operator and owner can be three different organizations. Mapping those relationships is the first step to reaching the right buyer.',
    intro: 'Hotel ownership research identifies the entities connected to a property and separates ownership, management and brand. Before approaching a hotel, confirm which organization controls the decision you want to influence.',
    sections: [
      { heading: 'Why the distinction matters', paragraphs: ['A hotel may carry a well-known brand, be run by a specialist operator and be owned by a separate company or investment group. Each can shape different decisions. A supplier after a property-level conversation may need a different route from one proposing a group-wide agreement.', 'Ownership research stops teams from treating every hotel as an independent account, or treating a brand relationship as proof of central buying.'] },
      { heading: 'Map the relationship, not just the name', paragraphs: ['For each property, capture the name and location, brand affiliation, management or operating entity, and known ownership entity. Add the relationship type and the basis for each link. If an entity is uncertain, mark it unverified rather than forcing a match.', 'Use a consistent parent-group name where the evidence supports it, but keep the original entity names. Account roll-ups stay useful without erasing the legal and operational distinctions that matter.'] },
      { heading: 'Connect structure to decision-makers', paragraphs: ['Once the group structure is clear, identify the roles relevant to the buying or investment question. A central team may set standards while property leaders handle local needs. A portfolio owner may shape priorities without running day-to-day procurement.', 'Treat contact data as a research lead, not proof of authority. Confirm current role and remit before you rely on someone as your route into an account.'] },
      { heading: 'Keep the map usable over time', paragraphs: ['Transactions, rebrands and management changes can make old relationships misleading. Keep a checked date, an evidence note and a confidence indicator on each key connection. Review priority accounts on a cadence that fits the work.'] },
    ],
    faq: [
      { question: 'Is a hotel brand usually the owner?', answer: 'Not necessarily. Brand, management company and owner can be separate entities, so research and record each relationship on its own.' },
      { question: 'What should a hotel ownership map include?', answer: 'At minimum: the property, its brand and operating relationships where known, the owner or parent group where evidenced, and the source and date behind each connection.' },
    ],
  },
  {
    slug: 'hotel-decision-maker-research',
    category: 'Decision-makers',
    publishedAt: '2026-10-21',
    read: '5 min read',
    title: 'Hotel decision-maker research: finding the right route into an account',
    deck: 'Good contact research starts from a decision and an organization, not a list of titles. Here’s a disciplined way to find the right people and validate your route in.',
    intro: 'Hotel decision-maker research identifies the people whose responsibilities matter to a specific commercial decision. It works best when it follows a clear account structure and records why each person may be relevant, what still needs confirming and how to approach them.',
    sections: [
      { heading: 'Begin with the decision', paragraphs: ['“Find hotel decision-makers” is too broad to guide reliable research. Pin down what you’re offering, the likely buying or partnership decision, and whether the conversation belongs at property, regional, group or ownership level.', 'A sharper brief narrows the relevant functions and lets you judge whether a person is genuinely tied to the decision.'] },
      { heading: 'Build the account context first', paragraphs: ['Map the hotel to its operating and ownership context before you look for people. That separates property-level contacts from group-level stakeholders, and stops teams mistaking brand visibility for buying authority.', 'Then identify the roles that may be involved—operations, procurement, development, asset management or commercial leadership, depending on the decision. Role examples are starting points, not proof of remit.'] },
      { heading: 'Validate, document and prioritize', paragraphs: ['For each lead, record the role, the organization, why it looks relevant, when it was checked and what needs confirming. A short list of well-documented leads beats a long one with no provenance.', 'Prioritize by account fit and practical access. A relevant person at an account that fits your offer is often a better first step than a senior title with no clear link to the decision.'] },
      { heading: 'Make research useful to outreach', paragraphs: ['Research should inform the opener, not become a script. Give whoever owns the outreach enough context to explain why the account matters and to ask a useful question. Keep the next action explicit, and update the record with what each conversation teaches you.'] },
    ],
    faq: [
      { question: 'Who makes decisions for a hotel?', answer: 'It depends on the decision. Property leaders, group functions, operators and ownership representatives may each influence different categories or stages.' },
      { question: 'How do you keep contact research reliable?', answer: 'Record role and organization context, the date checked and what still needs verifying. Recheck priority leads before important outreach.' },
    ],
  },
  {
    slug: 'go-to-market-planning-hospitality',
    category: 'Go-to-market',
    publishedAt: '2026-10-21',
    read: '6 min read',
    title: 'A focused go-to-market plan for hospitality suppliers',
    deck: 'A workable hospitality launch plan ties a defined account list to a relevant offer, credible access and a feedback loop you can repeat.',
    intro: 'A hospitality go-to-market plan sets out which hotel accounts to pursue, why they fit, who may shape the decision and what the team does next. It’s most useful when it’s specific enough to act on and loose enough to improve as the market responds.',
    sections: [
      { heading: 'Choose a point of entry', paragraphs: ['Hospitality isn’t one uniform market. Geography, property type, service model, ownership and operating structure all change how a supplier reaches customers. Start with a segment where your offer has a clear reason to matter.', 'Write down the assumptions behind the choice. If you can’t explain the segment in a few clear criteria, you won’t prioritize it consistently.'] },
      { heading: 'Translate fit into an account map', paragraphs: ['Define the properties or groups that fit, then link them to known ownership, operating context and relevant decision roles. Keep known facts apart from hypotheses, and show where each one came from.', 'The result is an account list a commercial team can work from, not a broad industry directory.'] },
      { heading: 'Plan the first conversations', paragraphs: ['For each priority account, identify the most relevant audience, a plausible route to contact and the question that would show whether there’s a fit. Tie the message to a specific operational or commercial need, not a generic product pitch.', 'Sequence accounts at a pace the team can support. A considered first wave surfaces access patterns and objections before you widen your reach.'] },
      { heading: 'Learn and adapt', paragraphs: ['Set a review point to compare the plan with what the team is hearing. Which assumptions held? Where did the decision actually sit? What was missing? Use the answers to refine the segment, the account map and the next actions.'] },
    ],
    faq: [
      { question: 'What belongs in a hospitality go-to-market plan?', answer: 'A defined segment, account criteria, ownership and decision context, an outreach approach, a named owner for each next action and a way to fold in what the team learns.' },
      { question: 'Should a supplier target hotels individually or groups?', answer: 'It depends on the offer and how the decision is made. Research the property and group structure, then pick the level that matches the buying process.' },
    ],
  },
];

export const getArticle = (slug: string): Article | undefined => articles.find((article) => article.slug === slug);
