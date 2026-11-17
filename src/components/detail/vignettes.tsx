'use client';

import { CalendarClock, Check, GitBranch, Mail, MessageSquare, Phone, Send, Target, UserCheck } from 'lucide-react';
import { MotionConfig, motion } from 'motion/react';
import type { ReactNode } from 'react';

import { ownershipSamples, type OwnershipSample } from '@/content/home';

import type { VignetteKind } from './vignette-map';

/*
 * Illustrative product-UI vignettes. Every hotel, company and person shown is invented
 * (taken from the demo data in content/home.ts). Pages showing them carry one "Illustrative" label
 * on the hero card (HeroNotes) rather than one per frame.
 */

const EASE = [0.22, 1, 0.36, 1] as const;
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.12 } } };
const rise = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } } };
const slide = { hidden: { opacity: 0, x: 14 }, show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } } };

type FrameProps = { title: string; label: string; children: ReactNode };

function Frame({ title, label, children }: FrameProps) {
  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        className="dp-vig"
        role="img"
        aria-label={label}
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="dp-vig-bar"><span>{title}</span></div>
        <div className="dp-vig-body">{children}</div>
      </motion.div>
    </MotionConfig>
  );
}

const rankedPeople = (sample: OwnershipSample) =>
  sample.entities
    .flatMap((entity) => entity.people.map((person) => ({ ...person, org: entity.name })))
    .sort((a, b) => a.rank - b.rank);

/* ---------- Scope: criteria and the property list they produce ---------- */

const criteria = [
  { key: 'Geography', value: 'Coastal Southeast' },
  { key: 'Segment', value: 'Upscale & boutique' },
  { key: 'Profile', value: '60–150 rooms' },
];

const properties = [
  { name: 'Hotel Calder', place: 'Savannah, GA', rooms: '142' },
  { name: 'Quarry Lane Hotel', place: 'Charleston, SC', rooms: '96' },
  { name: 'The Orchard at Broad', place: 'Savannah, GA', rooms: '118' },
  { name: 'Saltmarsh Inn', place: 'Beaufort, SC', rooms: '64' },
];

function ScopeVignette() {
  return (
    <Frame title="Scope · Target universe" label="Sample scope: three inclusion criteria and the property list that matches them">
      <motion.div className="dp-chips" variants={rise}>
        {criteria.map((item) => <span className="dp-chip" key={item.key}><i>{item.key}</i>{item.value}</span>)}
      </motion.div>
      <div>
        <motion.div className="dp-row dp-row-head dp-cols-prop" variants={rise}>
          <span>Property</span><span>Location</span><span>Rooms</span><span />
        </motion.div>
        {properties.map((property) => (
          <motion.div className="dp-row dp-cols-prop" key={property.name} variants={slide}>
            <strong>{property.name}</strong><span>{property.place}</span><span>{property.rooms}</span>
            <span className="dp-ok"><Check size={12} /></span>
          </motion.div>
        ))}
      </div>
      <motion.div className="dp-vig-foot" variants={rise}><span>3 inclusion rules applied</span><span>4 properties in scope</span></motion.div>
    </Frame>
  );
}

/* ---------- Ownership: one hotel, three distinct relationships ---------- */

function OwnershipVignette({ sample }: { sample: OwnershipSample }) {
  return (
    <Frame title={`Record · ${sample.hotel.name}`} label="Sample hotel record linked to its brand, management company and owner entity">
      <motion.div className="dp-hotel" variants={rise}>
        <span className="og-kicker">Property</span>
        <strong>{sample.hotel.name}</strong>
        <span>{sample.hotel.place} · {sample.hotel.meta}</span>
      </motion.div>
      <div className="dp-links">
        {sample.entities.map((entity) => (
          <motion.div className="dp-link-row" data-kind={entity.kind} key={entity.kind} variants={slide}>
            <span className="dp-link-who"><strong>{entity.name}</strong><span>{entity.note}</span></span>
            <span className="dp-tag">{entity.role}</span>
          </motion.div>
        ))}
      </div>
    </Frame>
  );
}

/* ---------- Contacts: people ranked by decision authority ---------- */

function ContactsVignette({ sample }: { sample: OwnershipSample }) {
  return (
    <Frame title={`Decision-makers · ${sample.hotel.name}`} label="Sample list of contacts ranked by decision authority">
      <div className="dp-stack">
        {rankedPeople(sample).slice(0, 4).map((person) => (
          <motion.div className="dp-contact" data-top={person.rank === 1} key={person.id} variants={rise}>
            <span className="og-rank" data-top={person.rank === 1}>{person.rank}</span>
            <span className="dp-contact-who"><strong>{person.name}</strong><span>{person.title}</span></span>
            <span className="dp-contact-org">{person.org}</span>
            <span className="dp-tag">{person.authority}</span>
          </motion.div>
        ))}
      </div>
      <motion.div className="dp-vig-foot" variants={rise}><span>Ranked by decision authority</span></motion.div>
    </Frame>
  );
}

/* ---------- Deliverable: the agreed scope sheet ---------- */

const specRows: { key: string; values: string[] }[] = [
  { key: 'Market', values: ['Coastal Southeast', 'Upscale & boutique'] },
  { key: 'Fields', values: ['Property', 'Brand', 'Operator', 'Owner', 'Contacts'] },
  { key: 'Depth', values: ['Decision-makers at priority accounts'] },
  { key: 'Rules', values: ['Inclusion', 'Exclusion'] },
  { key: 'Handoff', values: ['Structured list for your team'] },
];

function DeliverableVignette() {
  return (
    <Frame title="Brief · Scope sheet" label="Sample scope sheet listing the agreed market, fields, research depth, rules and handoff format">
      <div>
        {specRows.map((row) => (
          <motion.div className="dp-spec" key={row.key} variants={rise}>
            <span className="dp-spec-key">{row.key}</span>
            <span className="dp-spec-val">
              {row.values.length > 1 ? row.values.map((value) => <span className="dp-pill" key={value}>{value}</span>) : row.values[0]}
            </span>
            <span className="dp-ok"><Check size={12} /></span>
          </motion.div>
        ))}
      </div>
      <motion.div className="dp-vig-foot" variants={rise}><span>Status · Agreed</span><span>5 of 5 confirmed</span></motion.div>
    </Frame>
  );
}

/* ---------- Ranked lists: market segments and priority accounts ---------- */

type RankedRow = { name: string; sub: string; fit: number; tag: string };

const segmentRows: RankedRow[] = [
  { name: 'Upper-upscale independents', sub: 'Coastal Southeast', fit: 0.9, tag: 'First wave' },
  { name: 'Boutique lifestyle', sub: 'Austin, TX', fit: 0.7, tag: 'Next' },
  { name: 'Luxury resorts', sub: 'Monterey, CA', fit: 0.45, tag: 'Later' },
  { name: 'Brand-managed flags', sub: 'Multi-market', fit: 0.25, tag: 'Hold' },
];

const accountRows: RankedRow[] = [
  { name: 'Tidewater Hospitality Partners', sub: 'Owner group', fit: 0.92, tag: 'Wave 1' },
  { name: 'Northlight Hotel Management', sub: 'Operates 14 hotels', fit: 0.8, tag: 'Wave 1' },
  { name: 'Field & Finch Hospitality', sub: 'Operates 6 hotels', fit: 0.66, tag: 'Wave 1' },
  { name: 'Cannery Point REIT', sub: 'Portfolio of 22 hotels', fit: 0.4, tag: 'Wave 2' },
];

function RankedVignette({ title, label, column, rows }: { title: string; label: string; column: string; rows: RankedRow[] }) {
  return (
    <Frame title={title} label={label}>
      <div>
        <motion.div className="dp-row dp-row-head dp-cols-rank" variants={rise}>
          <span>#</span><span>{column}</span><span>Fit</span><span />
        </motion.div>
        {rows.map((row, index) => (
          <motion.div className="dp-row dp-cols-rank" key={row.name} variants={rise}>
            <span className="dp-rank-n">{String(index + 1).padStart(2, '0')}</span>
            <span className="dp-rank-who"><strong>{row.name}</strong><span>{row.sub}</span></span>
            <span className="dp-meter">
              <motion.i variants={{ hidden: { scaleX: 0 }, show: { scaleX: row.fit, transition: { duration: 0.9, ease: EASE } } }} />
            </span>
            <span className="dp-tag" data-top={index === 0}>{row.tag}</span>
          </motion.div>
        ))}
      </div>
    </Frame>
  );
}

/* ---------- Sequence: outreach across owner, operator and property ---------- */

const sequenceSteps: { day: string; icon: ReactNode; channel: string; line: string }[] = [
  { day: 'Day 1', icon: <Mail size={14} />, channel: 'Email · Owner-side asset manager', line: 'Open with the portfolio question, not the product.' },
  { day: 'Day 4', icon: <MessageSquare size={14} />, channel: 'LinkedIn · Operator COO', line: 'Reference the properties they run for this owner.' },
  { day: 'Day 9', icon: <Phone size={14} />, channel: 'Call · General Manager', line: 'Confirm the day-to-day problem before the proposal.' },
];

function SequenceVignette() {
  return (
    <Frame title="Playbook · Upper-upscale independents, Southeast" label="Sample outreach sequence across owner, operator and property contacts">
      <div className="dp-seq">
        {sequenceSteps.map((step) => (
          <motion.div className="dp-seq-step" key={step.day} variants={rise}>
            <span className="dp-seq-day">{step.day}</span>
            <span className="dp-icon">{step.icon}</span>
            <span><strong>{step.channel}</strong>{step.line}</span>
          </motion.div>
        ))}
      </div>
    </Frame>
  );
}

/* ---------- Board: account pipeline by stage ---------- */

const boardColumns = [
  { stage: 'Targeted', cards: ['Cannery Point REIT', 'Juniper Row Capital', 'Field & Finch'] },
  { stage: 'Contacted', cards: ['Northlight Hotel Mgmt', 'Solenne Operating Co.'] },
  { stage: 'In conversation', cards: ['Tidewater Hospitality'] },
  { stage: 'Proposal', cards: ['Calder Street Holdings'] },
];

function BoardVignette() {
  return (
    <Frame title="Pipeline · Priority hotel accounts" label="Sample account pipeline board with four stages">
      <div className="dp-board">
        {boardColumns.map((column, index) => (
          <motion.div className="dp-board-col" key={column.stage} variants={stagger}>
            <motion.span className="dp-board-stage" variants={rise}>{column.stage} <i>{column.cards.length}</i></motion.span>
            {column.cards.map((card) => (
              <motion.span className="dp-board-card" data-top={index === boardColumns.length - 1} key={card} variants={rise}>{card}</motion.span>
            ))}
          </motion.div>
        ))}
      </div>
    </Frame>
  );
}

/* ---------- Engine: workflow and reporting rhythm ---------- */

const flowNodes: { icon: ReactNode; title: string; sub: string }[] = [
  { icon: <Target size={14} />, title: 'Account', sub: 'Stage set in CRM' },
  { icon: <Send size={14} />, title: 'Outbound', sub: 'Sequence assigned' },
  { icon: <GitBranch size={14} />, title: 'Handoff', sub: 'Reply routed to owner' },
  { icon: <UserCheck size={14} />, title: 'Next step', sub: 'Logged with a date' },
];

const week = [
  { day: 'Mon', note: 'Pipeline review' },
  { day: 'Tue', note: '' },
  { day: 'Wed', note: 'Handoffs' },
  { day: 'Thu', note: '' },
  { day: 'Fri', note: 'Report' },
];

function EngineVignette() {
  return (
    <Frame title="Sales engine · Workflow" label="Sample sales workflow from account to outbound, handoff and next step, with a weekly reporting rhythm">
      <div className="dp-flow">
        <span className="dp-flow-pulse" />
        {flowNodes.map((node) => (
          <motion.div className="dp-flow-node" key={node.title} variants={rise}>
            <span className="dp-icon">{node.icon}</span>
            <strong>{node.title}</strong>
            <span>{node.sub}</span>
          </motion.div>
        ))}
      </div>
      <motion.div className="dp-week" variants={rise}>
        <span className="dp-week-label"><CalendarClock size={13} /> Reporting cadence</span>
        <div className="dp-week-days">
          {week.map((item) => (
            <span className="dp-week-day" data-on={item.note !== ''} key={item.day}><i>{item.day}</i>{item.note}</span>
          ))}
        </div>
      </motion.div>
    </Frame>
  );
}

/* ---------- Cadence: fractional leadership as an operating rhythm ---------- */

const WEEKS = 8;
const cadenceRows = [
  { name: 'Pipeline review', every: 1 },
  { name: 'Account coaching', every: 2 },
  { name: 'Motion refinement', every: 4 },
];

function CadenceVignette() {
  const weeks = Array.from({ length: WEEKS }, (_, index) => index + 1);
  return (
    <Frame title="Operating rhythm · 8 weeks" label="Sample eight-week operating rhythm with weekly, fortnightly and monthly sessions">
      <div>
        <motion.div className="dp-cad dp-cad-head" variants={rise}>
          <span />
          {weeks.map((number) => <span key={number}>W{number}</span>)}
        </motion.div>
        {cadenceRows.map((row) => (
          <motion.div className="dp-cad" key={row.name} variants={stagger}>
            <motion.strong variants={rise}>{row.name}</motion.strong>
            {weeks.map((number) => (
              <motion.i
                key={number}
                data-on={number % row.every === 0}
                variants={{ hidden: { opacity: 0, scale: 0.6 }, show: { opacity: 1, scale: 1, transition: { duration: 0.35, delay: number * 0.03 } } }}
              />
            ))}
          </motion.div>
        ))}
      </div>
      <motion.div className="dp-vig-foot" variants={rise}><span>Weekly · Fortnightly · Monthly</span></motion.div>
    </Frame>
  );
}

/* ---------- Learn: what the first wave revealed ---------- */

const logRows: { icon: ReactNode; account: string; note: string; tag: string }[] = [
  { icon: <Phone size={14} />, account: 'Northlight Hotel Mgmt', note: 'Conversation held', tag: 'Fit confirmed' },
  { icon: <Mail size={14} />, account: 'Field & Finch Hospitality', note: 'Replied, referred upward', tag: 'Route to owner' },
  { icon: <MessageSquare size={14} />, account: 'Solenne Operating Co.', note: 'No response yet', tag: 'Revisit timing' },
];

function LearnVignette() {
  return (
    <Frame title="Market response · First wave" label="Sample log of first-wave outreach outcomes and the resulting change to the plan">
      <div className="dp-stack">
        {logRows.map((row) => (
          <motion.div className="dp-log" key={row.account} variants={rise}>
            <span className="dp-icon">{row.icon}</span>
            <span className="dp-contact-who"><strong>{row.account}</strong><span>{row.note}</span></span>
            <span className="dp-tag">{row.tag}</span>
          </motion.div>
        ))}
      </div>
      <motion.div className="dp-diff" variants={rise}>
        <span className="dp-spec-key">Plan update</span>
        <span>Entry point: <s>Operator COO</s> <strong>Owner-side asset manager</strong></span>
      </motion.div>
    </Frame>
  );
}

/* ---------- Switch ---------- */

export function Vignette({ kind, sample = 0 }: { kind: VignetteKind; sample?: number }) {
  const record = ownershipSamples[sample % ownershipSamples.length];
  switch (kind) {
    case 'scope': return <ScopeVignette />;
    case 'ownership': return <OwnershipVignette sample={record} />;
    case 'contacts': return <ContactsVignette sample={record} />;
    case 'deliverable': return <DeliverableVignette />;
    case 'segments':
      return <RankedVignette title="Market selection · Segments compared" label="Sample comparison of four hotel segments ranked by fit" column="Segment" rows={segmentRows} />;
    case 'accounts':
      return <RankedVignette title="Account plan · Prioritized" label="Sample list of priority accounts ranked by fit and grouped into waves" column="Account" rows={accountRows} />;
    case 'sequence': return <SequenceVignette />;
    case 'board': return <BoardVignette />;
    case 'engine': return <EngineVignette />;
    case 'cadence': return <CadenceVignette />;
    case 'learn': return <LearnVignette />;
  }
}
