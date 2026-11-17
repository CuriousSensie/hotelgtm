'use client';

import { ArrowRight, BadgeCheck, Mail, MessageSquare, Phone } from 'lucide-react';
import { AnimatePresence, motion, useInView } from 'motion/react';
import Link from 'next/link';
import { useEffect, useRef, useState, type ReactNode } from 'react';

import { services } from '@/content/home';

import { Reveal } from './reveal';

const ADVANCE_MS = 7000;

/* Illustrative vignettes: every account and person shown is invented. */

function IntelligenceVignette() {
  const rows = [
    { hotel: 'Hotel Calder', operator: 'Northlight Hotel Mgmt', owner: 'Calder Street Holdings', contacts: 5 },
    { hotel: 'The Linden House', operator: 'Field & Finch Hospitality', owner: 'Linden 4th Street LP', contacts: 5 },
    { hotel: 'Harbor & Vine Resort', operator: 'Solenne Operating Co.', owner: 'Cannery Point REIT', contacts: 5 },
    { hotel: 'Quarry Lane Hotel', operator: 'Northlight Hotel Mgmt', owner: 'Tidewater Hospitality', contacts: 4 },
  ];
  return (
    <div className="lp-vig lp-vig-table" role="img" aria-label="Sample table linking hotels to their operator, owner and verified contacts">
      <div className="lp-vig-row lp-vig-head"><span>Property</span><span>Operator</span><span>Owner</span><span>Contacts</span></div>
      {rows.map((row, index) => (
        <motion.div
          className="lp-vig-row"
          key={row.hotel}
          initial={{ opacity: 0, x: 14 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, delay: 0.1 + index * 0.09 }}
        >
          <strong>{row.hotel}</strong><span>{row.operator}</span><span>{row.owner}</span>
          <span className="lp-vig-verified"><BadgeCheck size={13} /> {row.contacts}</span>
        </motion.div>
      ))}
    </div>
  );
}

function StrategyVignette() {
  const steps: { day: string; icon: ReactNode; channel: string; line: string }[] = [
    { day: 'Day 1', icon: <Mail size={14} />, channel: 'Email · Owner-side asset manager', line: 'Open with the portfolio question, not the product.' },
    { day: 'Day 4', icon: <MessageSquare size={14} />, channel: 'LinkedIn · Operator COO', line: 'Reference the properties they run for this owner.' },
    { day: 'Day 9', icon: <Phone size={14} />, channel: 'Call · General Manager', line: 'Confirm the day-to-day problem before the proposal.' },
  ];
  return (
    <div className="lp-vig lp-vig-sequence" role="img" aria-label="Sample outreach sequence across owner, operator and property contacts">
      <span className="lp-vig-title">Playbook · Upper-upscale independents, Southeast</span>
      {steps.map((step, index) => (
        <motion.div
          className="lp-vig-step"
          key={step.day}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 + index * 0.14 }}
        >
          <span className="lp-vig-day">{step.day}</span>
          <span className="lp-vig-icon">{step.icon}</span>
          <span><strong>{step.channel}</strong>{step.line}</span>
        </motion.div>
      ))}
    </div>
  );
}

function ExecutionVignette() {
  const columns = [
    { stage: 'Targeted', cards: ['Cannery Point REIT', 'Juniper Row Capital', 'Field & Finch'] },
    { stage: 'Contacted', cards: ['Northlight Hotel Mgmt', 'Solenne Operating Co.'] },
    { stage: 'In conversation', cards: ['Tidewater Hospitality'] },
    { stage: 'Proposal', cards: ['Calder Street Holdings'] },
  ];
  return (
    <div className="lp-vig lp-vig-board" role="img" aria-label="Sample account pipeline board with four stages">
      {columns.map((column, columnIndex) => (
        <div className="lp-vig-col" key={column.stage}>
          <span className="lp-vig-stage">{column.stage} <i>{column.cards.length}</i></span>
          {column.cards.map((card, cardIndex) => (
            <motion.span
              className="lp-vig-card"
              key={card}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + columnIndex * 0.12 + cardIndex * 0.06 }}
            >
              {card}
            </motion.span>
          ))}
        </div>
      ))}
    </div>
  );
}

const vignettes = [<IntelligenceVignette key="intelligence" />, <StrategyVignette key="strategy" />, <ExecutionVignette key="execution" />];

export function ServicesTabs() {
  const [active, setActive] = useState(0);
  // Auto-advance stops for good once the visitor picks a tab themselves.
  const [autoplay, setAutoplay] = useState(true);
  const [paused, setPaused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const running = autoplay && inView && !paused;

  useEffect(() => {
    if (!running) return;
    const timer = setTimeout(() => setActive((index) => (index + 1) % services.items.length), ADVANCE_MS);
    return () => clearTimeout(timer);
  }, [running, active]);

  const select = (index: number) => {
    setActive(index);
    setAutoplay(false);
  };

  return (
    <section className="lp-section" id="services">
      <div className="lp-wrap">
        <Reveal className="lp-heading">
          <div>
            <span className="lp-eyebrow">{services.eyebrow}</span>
            <h2>{services.title[0]}<br />{services.title[1]}</h2>
          </div>
          <div className="lp-heading-side"><p>{services.copy}</p></div>
        </Reveal>

        <Reveal className="lp-tabs" delay={0.1}>
          <div
            ref={ref}
            className="lp-tablist"
            role="group"
            aria-label="HotelGTM services"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {services.items.map((item, index) => {
              const selected = index === active;
              return (
                <div className="lp-tab" data-active={selected} key={item.label}>
                  <button
                    type="button"
                    id={`service-tab-${index}`}
                    aria-pressed={selected}
                    aria-controls="service-panel"
                    onClick={() => select(index)}
                  >
                    <span className="lp-tab-label">{String(index + 1).padStart(2, '0')} / {item.label}</span>
                    <span className="lp-tab-title">{item.title}</span>
                  </button>
                  <AnimatePresence initial={false}>
                    {selected && (
                      <motion.div
                        className="lp-tab-body"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <p>{item.copy}</p>
                        {item.link && <Link href={item.link.href} className="lp-link">{item.link.label} <ArrowRight size={13} /></Link>}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <span className="lp-tab-progress" aria-hidden="true">
                    {selected && running && (
                      <motion.i
                        key={`${index}-${active}`}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: ADVANCE_MS / 1000, ease: 'linear' }}
                      />
                    )}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="lp-panel" id="service-panel" role="region" aria-labelledby={`service-tab-${active}`}>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                className="lp-panel-inner"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                {vignettes[active]}
              </motion.div>
            </AnimatePresence>
            <span className="lp-panel-note">Illustrative</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
