'use client';

import { motion, useInView } from 'motion/react';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';

import { dataOffer, ownershipSamples, type OfferItem } from '@/content/home';

import { Reveal } from './reveal';

const sample = ownershipSamples[0];
const buyers = sample.entities.flatMap((entity) => entity.people).sort((a, b) => a.rank - b.rank).slice(0, 3);

/* Illustrative property list: the first row is the hotel the rest of the record follows. */
const properties = [
  { name: sample.hotel.name, place: sample.hotel.place, rooms: '142' },
  { name: 'Quarry Lane Hotel', place: 'Charleston, SC', rooms: '96' },
  { name: 'The Orchard at Broad', place: 'Savannah, GA', rooms: '118' },
  { name: 'Saltmarsh Inn', place: 'Beaufort, SC', rooms: '64' },
];

type StepProps = { item: OfferItem; index: number; active: boolean; onEnter: (index: number) => void };

function Step({ item, index, active, onEnter }: StepProps) {
  const ref = useRef<HTMLElement>(null);
  // Counts as "in view" only while it crosses the middle band of the viewport.
  const inView = useInView(ref, { margin: '-45% 0px -45% 0px' });

  useEffect(() => {
    if (inView) onEnter(index);
  }, [inView, index, onEnter]);

  return (
    <article ref={ref} className="lp-scene-step" data-active={active}>
      <span className="lp-eyebrow">{item.label}</span>
      <h3>{item.title}</h3>
      <p>{item.copy}</p>
    </article>
  );
}

/** Matches the CSS breakpoint where the record stops being sticky and sits below the steps. */
const STACKED_QUERY = '(max-width: 980px)';
const subscribeStacked = (onChange: () => void) => {
  const query = window.matchMedia(STACKED_QUERY);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
};

const layerMotion = (open: boolean) => ({
  animate: { opacity: open ? 1 : 0.32, height: open ? 'auto' : 46 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
});

export function DataScene() {
  const [scrollStep, setScrollStep] = useState(0);
  // Stacked layout: the record is read after all three steps, so show it complete rather than scroll-driven.
  const stacked = useSyncExternalStore(subscribeStacked, () => window.matchMedia(STACKED_QUERY).matches, () => false);
  const active = stacked ? dataOffer.items.length - 1 : scrollStep;

  return (
    <section className="lp-section lp-section-tint" id="data">
      <div className="lp-wrap">
        <Reveal className="lp-heading">
          <div>
            <span className="lp-eyebrow">{dataOffer.eyebrow}</span>
            <h2>{dataOffer.title}</h2>
          </div>
          <div className="lp-heading-side"><p>{dataOffer.copy}</p></div>
        </Reveal>

        <div className="lp-scene">
          <div className="lp-scene-steps">
            {dataOffer.items.map((item, index) => (
              <Step key={item.label} item={item} index={index} active={index === active} onEnter={setScrollStep} />
            ))}
          </div>

          <div className="lp-scene-stage">
            <div className="lp-record" data-step={active} role="img" aria-label="Sample hotel record building from a property list to ownership to decision-makers">
              <div className="lp-record-bar">
                <span>Target market · Coastal Southeast, upscale &amp; boutique</span>
                <span>Illustrative</span>
              </div>

              <motion.div className="lp-record-layer" initial={false} {...layerMotion(true)}>
                <span className="lp-record-label">Properties</span>
                {properties.map((property, index) => (
                  <motion.div
                    className="lp-record-row"
                    key={property.name}
                    data-selected={index === 0 && active > 0}
                    initial={false}
                    animate={{ opacity: active === 0 || index === 0 ? 1 : 0, height: active === 0 || index === 0 ? 40 : 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <strong>{property.name}</strong><span>{property.place}</span><span>{property.rooms} rooms</span>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div className="lp-record-layer" initial={false} {...layerMotion(active >= 1)}>
                <span className="lp-record-label">Ownership &amp; operating groups</span>
                {sample.entities.map((entity) => (
                  <div className="lp-record-row" key={entity.kind}>
                    <span className="lp-record-role">{entity.role}</span><strong>{entity.name}</strong><span>{entity.note}</span>
                  </div>
                ))}
              </motion.div>

              <motion.div className="lp-record-layer" initial={false} {...layerMotion(active >= 2)}>
                <span className="lp-record-label">Decision-makers</span>
                {buyers.map((person) => (
                  <div className="lp-record-row" key={person.id}>
                    <span className="og-rank" data-top={person.rank === 1}>{person.rank}</span>
                    <strong>{person.name}</strong><span>{person.title}</span><span>{person.authority}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
