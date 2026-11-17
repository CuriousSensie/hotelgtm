'use client';

import { ArrowRight } from 'lucide-react';
import { useInView } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

import { ownershipSamples, type GraphEntity, type GraphPerson, type OwnershipSample } from '@/content/home';
import { usePrefersReducedMotion } from '@/lib/use-prefers-reduced-motion';

/**
 * Diagram on /company: property -> owner/operator entities -> decision-makers -> GTM route.
 * The map resolves layer by layer, then moves on to the next sample record.
 * Every hotel, company and person shown comes from the invented `ownershipSamples`.
 */

const TICK_MS = 850;
/** Layers: 1 property, 2 entities, 3 decision-makers, 4 route. */
const LAYERS = 4;
/** Ticks to hold the finished map before auto-advancing to the next sample. */
const HOLD_TICKS = 6;
const PEOPLE_SHOWN = 3;

/** Connector x positions as percentages of the map width. */
const ENTITY_X = [25, 75];
const PEOPLE_X = [16.667, 50, 83.333];

type MapPerson = GraphPerson & { entityIndex: number };

function entitiesFor(sample: OwnershipSample): [GraphEntity, GraphEntity] {
  const owner = sample.entities.find((entity) => entity.kind === 'owner') ?? sample.entities[2];
  const operator = sample.entities.find((entity) => entity.kind === 'operator') ?? sample.entities[1];
  return [owner, operator];
}

/** The highest-authority owner and operator contacts, kept grouped under their entity so connectors never cross. */
function peopleFor(entities: [GraphEntity, GraphEntity]): MapPerson[] {
  const all = entities.flatMap((entity, entityIndex) => entity.people.map((person) => ({ ...person, entityIndex })));
  const top = [...all].sort((a, b) => a.rank - b.rank).slice(0, PEOPLE_SHOWN);
  return top.sort((a, b) => a.entityIndex - b.entityIndex || a.rank - b.rank);
}

const elbow = (fromX: number, toX: number) => `M ${fromX} 0 V 20 H ${toX} V 40`;

export function OwnershipMap() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const reduceMotion = usePrefersReducedMotion();
  const [sampleIndex, setSampleIndex] = useState(0);
  const [tick, setTick] = useState(0);
  // Auto-advance stops for good once the visitor picks a record themselves.
  const [autoplay, setAutoplay] = useState(true);

  const running = inView && !reduceMotion && (autoplay || tick < LAYERS);

  useEffect(() => {
    if (!running) return;
    const timer = setTimeout(() => {
      if (tick >= LAYERS + HOLD_TICKS) {
        setSampleIndex((index) => (index + 1) % ownershipSamples.length);
        setTick(0);
      } else {
        setTick(tick + 1);
      }
    }, TICK_MS);
    return () => clearTimeout(timer);
  }, [running, tick]);

  const pick = (index: number) => {
    setAutoplay(false);
    setSampleIndex(index);
    setTick(0);
  };

  const sample = ownershipSamples[sampleIndex];
  const entities = entitiesFor(sample);
  const people = peopleFor(entities);
  const topRank = Math.min(...people.map((person) => person.rank));
  const layer = reduceMotion ? LAYERS : Math.min(tick, LAYERS);
  const lit = (level: number) => layer >= level;

  return (
    <figure ref={ref} className="co-map" aria-label="Hotel property relationships mapped to decision-makers and GTM action. Sample record, illustrative data.">
      <div className="co-map-bar">
        <span>HotelGTM / Relationship map</span>
        <span className="co-map-status"><i data-live={running} /> Research view</span>
      </div>

      <div className="co-map-body">
        <div className="co-map-node co-map-hotel" data-lit={lit(1)}>
          <span className="co-map-kicker">01 / Property</span>
          <strong>{sample.hotel.name}</strong>
          <span className="co-map-sub">{sample.hotel.place} · {sample.hotel.meta}</span>
        </div>

        <div className="co-map-link" data-lit={lit(2)}>
          <svg viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true">
            {ENTITY_X.map((x) => <path key={x} d={elbow(50, x)} vectorEffect="non-scaling-stroke" />)}
          </svg>
          <span>Ownership + operating links</span>
        </div>

        <div className="co-map-entities">
          {entities.map((entity, index) => (
            <div className={`co-map-node co-map-entity co-map-entity-${entity.kind}`} data-lit={lit(2)} key={entity.kind}>
              <span className="co-map-kicker">0{index + 2} / {entity.role}</span>
              <strong>{entity.name}</strong>
              <span className="co-map-sub">{entity.note}</span>
            </div>
          ))}
        </div>

        <div className="co-map-link co-map-link-people" data-lit={lit(3)}>
          <svg viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true">
            {people.map((person, index) => (
              <path
                key={person.id}
                d={elbow(ENTITY_X[person.entityIndex], PEOPLE_X[index])}
                vectorEffect="non-scaling-stroke"
                className={person.rank === topRank ? 'is-top' : undefined}
              />
            ))}
          </svg>
          <span>Decision-makers</span>
        </div>

        <div className="co-map-people">
          {people.map((person, index) => (
            <div
              className={`co-map-node co-map-person${person.rank === topRank ? ' is-top' : ''}`}
              data-lit={lit(3)}
              style={{ transitionDelay: lit(3) ? `${index * 90}ms` : '0ms' }}
              key={person.id}
            >
              <span className="og-rank" data-top={person.rank === topRank} aria-label={`Decision authority rank ${person.rank}`}>{person.rank}</span>
              <span className="co-map-person-body">
                <strong>{person.name}</strong>
                <span className="co-map-sub">{person.title}</span>
                <span className="co-map-authority">{person.authority}</span>
              </span>
            </div>
          ))}
        </div>

        <div className="co-map-route" data-lit={lit(4)}>
          <span>Account context</span>
          <ArrowRight size={14} aria-hidden="true" />
          <strong>Prioritized GTM route</strong>
        </div>
      </div>

      <div className="co-map-foot">
        <div className="co-map-samples" role="group" aria-label="Sample records">
          {ownershipSamples.map((option, index) => (
            <button type="button" key={option.id} className="co-map-chip" aria-pressed={index === sampleIndex} onClick={() => pick(index)}>
              {option.hotel.name}
            </button>
          ))}
        </div>
        <span className="co-map-note">Illustrative</span>
      </div>
    </figure>
  );
}
