'use client';

import { Check, LoaderCircle, Search, X } from 'lucide-react';
import { AnimatePresence, MotionConfig, motion, useInView, useReducedMotion } from 'motion/react';
import { useEffect, useLayoutEffect, useRef, useState, type FormEvent } from 'react';

import { ownershipSamples, type GraphEntityKind, type OwnershipSample } from '@/content/home';

import { ContactChips, ContactPanel, type ContactChannel } from './contact-reveal';

/**
 * Signature hero element: a search bar that types a hotel query, then (on Search)
 * docks into the corner while the hotel resolves into its ownership graph:
 * hotel -> brand / management company / owner entity -> people ranked by decision authority.
 */

type Phase = 'typing' | 'ready' | 'resolving' | 'graph';
type Size = { width: number; height: number };

const TYPE_INTERVAL_MS = 34;
/** If the visitor does not press Search, run it for them after this long. */
const AUTO_RUN_MS = 2800;
const RESOLVE_MS = 2400;
/** Below this stage width the graph renders as the compact view instead of a tree. */
const TREE_MIN_WIDTH = 860;

const EASE = [0.22, 1, 0.36, 1] as const;

const RESOLVE_STEPS = ['Matching the property', 'Tracing brand, operator and owner', 'Ranking people by decision authority', 'Verifying emails and direct dials'];

/** Tree-layout positions, as percentages of the stage. */
const HOTEL_POS = { x: 50, y: 21 };
const ENTITY_Y = 49;
const PEOPLE_Y = 80;
const ENTITY_X: Record<GraphEntityKind, number> = { brand: 15, operator: 47, owner: 80.5 };
const PEOPLE_X: Record<GraphEntityKind, number[]> = { brand: [15], operator: [38, 56], owner: [72, 89] };

/** Dashed placeholders shown behind the idle search bar, hinting at the graph to come. */
const GHOSTS = (Object.keys(ENTITY_X) as GraphEntityKind[]).flatMap((kind) => [
  { key: kind, kind: 'entity', x: ENTITY_X[kind], y: ENTITY_Y },
  ...PEOPLE_X[kind].map((x, index) => ({ key: `${kind}-${index}`, kind: 'person', x, y: PEOPLE_Y })),
]);

type Edge = { id: string; from: { x: number; y: number }; to: { x: number; y: number }; midY: number; level: 1 | 2 };

function buildEdges(sample: OwnershipSample): Edge[] {
  const edges: Edge[] = [];
  for (const entity of sample.entities) {
    const entityPos = { x: ENTITY_X[entity.kind], y: ENTITY_Y };
    edges.push({ id: entity.kind, from: HOTEL_POS, to: entityPos, midY: 35, level: 1 });
    entity.people.forEach((person, index) => {
      edges.push({ id: person.id, from: entityPos, to: { x: PEOPLE_X[entity.kind][index], y: PEOPLE_Y }, midY: 65, level: 2 });
    });
  }
  return edges;
}

/** Rounded elbow connector between two points, in stage pixels. */
function elbowPath(edge: Edge, size: Size): string {
  const px = (edge.from.x / 100) * size.width;
  const py = (edge.from.y / 100) * size.height;
  const cx = (edge.to.x / 100) * size.width;
  const cy = (edge.to.y / 100) * size.height;
  const my = (edge.midY / 100) * size.height;
  if (Math.abs(px - cx) < 1) return `M ${px} ${py} V ${cy}`;
  const radius = Math.min(12, Math.abs(cx - px) / 2);
  const dir = cx > px ? 1 : -1;
  return `M ${px} ${py} V ${my - radius} Q ${px} ${my} ${px + dir * radius} ${my} H ${cx - dir * radius} Q ${cx} ${my} ${cx} ${my + radius} V ${cy}`;
}

function useElementSize<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [size, setSize] = useState<Size>({ width: 0, height: 0 });
  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => {
      setSize({ width: entry.contentRect.width, height: entry.contentRect.height });
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return [ref, size] as const;
}

const KIND_LABEL: Record<GraphEntityKind, string> = { brand: 'Brand', operator: 'Operator', owner: 'Owner' };

type OpenContact = { personId: string; channel: ContactChannel } | null;

/** One contact open at a time across the graph; Escape or a click elsewhere closes it. */
function useOpenContact() {
  const [open, setOpen] = useState<OpenContact>(null);
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(null);
    };
    const onPointer = (event: PointerEvent) => {
      if (!(event.target instanceof Element) || !event.target.closest('.ct-panel, .ct-chip')) setOpen(null);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, [open]);
  const channelFor = (personId: string) => (open?.personId === personId ? open.channel : null);
  const toggle = (personId: string, channel: ContactChannel) =>
    setOpen((current) => (current?.personId === personId && current.channel === channel ? null : { personId, channel }));
  return { channelFor, toggle };
}

/**
 * Narrow-stage version of the graph: hotel, then its three entities as tappable tiles, then the ranked list
 * of people, each with email/phone buttons that open a contact drawer. Tapping an entity filters the list to that firm.
 */
function CompactGraph({ sample }: { sample: OwnershipSample }) {
  const [focus, setFocus] = useState<GraphEntityKind | null>(null);
  const contact = useOpenContact();
  const people = sample.entities
    .filter((entity) => focus === null || entity.kind === focus)
    .flatMap((entity) => entity.people.map((person) => ({ ...person, kind: entity.kind })))
    .sort((a, b) => a.rank - b.rank);

  return (
    <motion.div className="og-graph og-compact" initial={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.2 } }}>
      <motion.div
        className="og-node og-hotel"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
      >
        <span className="og-kicker">Hotel</span>
        <strong>{sample.hotel.name}</strong>
        <span className="og-sub">{sample.hotel.place} · {sample.hotel.meta}</span>
      </motion.div>

      <div className="og-compact-entities" role="group" aria-label="Filter decision-makers by firm">
        {sample.entities.map((entity, index) => (
          <motion.button
            type="button"
            key={entity.kind}
            className={`og-compact-entity og-entity-${entity.kind}`}
            aria-pressed={focus === entity.kind}
            onClick={() => setFocus((current) => (current === entity.kind ? null : entity.kind))}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.45 + index * 0.1, ease: EASE }}
          >
            <span className="og-kicker">{KIND_LABEL[entity.kind]}</span>
            <strong>{entity.name}</strong>
          </motion.button>
        ))}
      </div>

      <ol className="og-compact-people" aria-live="polite">
        {people.map((person, index) => {
          const channel = contact.channelFor(person.id);
          const panelId = `ct-${person.id}`;
          return (
            <motion.li
              key={person.id}
              className="og-compact-person"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: (focus === null ? 0.85 : 0) + index * 0.08, ease: EASE }}
            >
              <div className={`og-node og-person${person.rank === 1 ? ' is-top' : ''}`}>
                <span className="og-rank" aria-label={`Decision authority rank ${person.rank}`}>{person.rank}</span>
                <span className="og-person-body">
                  <strong>{person.name}</strong>
                  <span className="og-sub">{person.title} · {KIND_LABEL[person.kind]}</span>
                </span>
                <ContactChips person={person} open={channel} onToggle={(next) => contact.toggle(person.id, next)} iconOnly pulse={person.rank === 1} controls={panelId} />
              </div>
              <AnimatePresence initial={false}>
                {channel && (
                  <motion.div
                    key="drawer"
                    className="og-contact-drawer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: EASE }}
                  >
                    <ContactPanel id={panelId} person={person} channel={channel} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.li>
          );
        })}
      </ol>
    </motion.div>
  );
}

type GraphProps = { sample: OwnershipSample; size: Size };

/** Wide-stage graph: nodes pinned to stage percentages, joined by elbow connectors. */
function OwnershipGraph({ sample, size }: GraphProps) {
  const [hovered, setHovered] = useState<string | null>(null);
  const contact = useOpenContact();
  const edges = buildEdges(sample);

  const entityOfPerson = (personId: string) =>
    sample.entities.find((entity) => entity.people.some((person) => person.id === personId))?.kind;

  // An edge lights up when it lies on the path between the hovered node and the hotel.
  const isEdgeActive = (edge: Edge) => {
    if (!hovered) return false;
    if (edge.id === hovered) return true;
    if (edge.level === 1) return entityOfPerson(hovered) === edge.id;
    return entityOfPerson(edge.id) === hovered;
  };

  const hoverProps = (id: string) => ({
    onMouseEnter: () => setHovered(id),
    onMouseLeave: () => setHovered(null),
    onFocus: () => setHovered(id),
    onBlur: () => setHovered(null),
  });

  const place = (x: number, y: number) => ({ left: `${x}%`, top: `${y}%` });

  return (
    <motion.div className="og-graph" initial={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.2 } }}>
      {size.width > 0 && (
        <svg className="og-edges" viewBox={`0 0 ${size.width} ${size.height}`} aria-hidden="true">
          {edges.map((edge) => (
            <motion.path
              key={edge.id}
              d={elbowPath(edge, size)}
              className={isEdgeActive(edge) ? 'is-active' : undefined}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.7, delay: edge.level === 1 ? 0.45 : 1.25, ease: EASE }}
            />
          ))}
        </svg>
      )}

      <div className="og-pos og-pos-hotel" style={place(HOTEL_POS.x, HOTEL_POS.y)}>
        <motion.div
          className="og-node og-hotel"
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.12, ease: EASE }}
        >
          <span className="og-kicker">Hotel</span>
          <strong>{sample.hotel.name}</strong>
          <span className="og-sub">{sample.hotel.place} · {sample.hotel.meta}</span>
        </motion.div>
      </div>

      {sample.entities.map((entity, entityIndex) => (
        <div className="og-group" key={entity.kind}>
          <div className="og-pos" style={place(ENTITY_X[entity.kind], ENTITY_Y)}>
            <motion.div
              className={`og-node og-entity og-entity-${entity.kind}`}
              tabIndex={0}
              {...hoverProps(entity.kind)}
              initial={{ opacity: 0, scale: 0.92, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.85 + entityIndex * 0.12, ease: EASE }}
            >
              <span className="og-kicker">{entity.role}</span>
              <strong>{entity.name}</strong>
              <span className="og-sub">{entity.note}</span>
            </motion.div>
          </div>
          {entity.people.map((person, personIndex) => {
            const x = PEOPLE_X[entity.kind][personIndex];
            const channel = contact.channelFor(person.id);
            const panelId = `ct-${person.id}`;
            const delay = 1.6 + (person.rank - 1) * 0.13;
            return (
              <div className="og-pos og-pos-person" key={person.id} style={place(x, PEOPLE_Y)} data-open={channel !== null}>
                <AnimatePresence>
                  {channel && (
                    <motion.div
                      key="pop"
                      className="og-contact-pop"
                      data-align={x < 22 ? 'start' : x > 80 ? 'end' : 'center'}
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.97, transition: { duration: 0.15 } }}
                      transition={{ duration: 0.3, ease: EASE }}
                    >
                      <ContactPanel id={panelId} person={person} channel={channel} />
                    </motion.div>
                  )}
                </AnimatePresence>
                <motion.div
                  className={`og-node og-person${person.rank === 1 ? ' is-top' : ''}`}
                  tabIndex={0}
                  {...hoverProps(person.id)}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay, ease: EASE }}
                >
                  <span className="og-rank" aria-label={`Decision authority rank ${person.rank}`}>{person.rank}</span>
                  <span className="og-person-body">
                    <strong>{person.name}</strong>
                    <span className="og-sub">{person.title}</span>
                    <span className="og-authority">{person.authority}</span>
                  </span>
                  <motion.span
                    className="og-person-contacts"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: delay + 0.55, ease: EASE }}
                  >
                    <ContactChips person={person} open={channel} onToggle={(next) => contact.toggle(person.id, next)} pulse={person.rank === 1} controls={panelId} />
                  </motion.span>
                </motion.div>
              </div>
            );
          })}
        </div>
      ))}
    </motion.div>
  );
}

export function OwnershipSearch() {
  const [sampleIndex, setSampleIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('typing');
  const [typed, setTyped] = useState(0);
  const [stageRef, size] = useElementSize<HTMLDivElement>();
  const inView = useInView(stageRef, { once: true, amount: 0.35 });
  const reduceMotion = useReducedMotion();

  const sample = ownershipSamples[sampleIndex];
  const tree = size.width >= TREE_MIN_WIDTH;
  const docked = phase === 'graph';
  // Derived from `typed` only (never from reduceMotion, which is null on the server) so SSR and hydration match.
  const queryText = phase === 'typing' ? sample.query.slice(0, typed) : sample.query;

  useEffect(() => {
    if (!inView || phase !== 'typing') return;
    if (reduceMotion) {
      const timer = setTimeout(() => {
        setTyped(sample.query.length);
        setPhase('ready');
      }, 0);
      return () => clearTimeout(timer);
    }
    const timer = setInterval(() => {
      setTyped((count) => {
        if (count >= sample.query.length) {
          clearInterval(timer);
          setPhase('ready');
          return count;
        }
        return count + 1;
      });
    }, TYPE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [inView, phase, reduceMotion, sample.query]);

  useEffect(() => {
    if (phase !== 'ready' && phase !== 'resolving') return;
    const timer = setTimeout(() => setPhase(phase === 'ready' ? 'resolving' : 'graph'), phase === 'ready' ? AUTO_RUN_MS : RESOLVE_MS);
    return () => clearTimeout(timer);
  }, [phase]);

  const runSearch = (event: FormEvent) => {
    event.preventDefault();
    if (phase === 'ready' || phase === 'typing') setPhase('resolving');
  };

  const pickSample = (index: number) => {
    setSampleIndex(index);
    setPhase('resolving');
  };

  const reset = () => {
    setTyped(0);
    setPhase('typing');
  };

  return (
    <MotionConfig reducedMotion="user">
      <div
        ref={stageRef}
        className="og-stage"
        data-phase={phase}
        data-layout={tree ? 'tree' : 'stack'}
        role="group"
        aria-label="Demo: search a hotel to see its ownership graph. All records shown are illustrative."
      >
        <AnimatePresence>
          {!docked && (
            <motion.p key="lead" className="og-idle og-idle-top" exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
              Pick a hotel. See who decides.
            </motion.p>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {tree && (phase === 'typing' || phase === 'ready') && (
            <motion.div key="ghosts" className="og-ghosts" aria-hidden="true" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
              {GHOSTS.map((ghost) => (
                <i key={ghost.key} data-kind={ghost.kind} style={{ left: `${ghost.x}%`, top: `${ghost.y}%` }} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.form
          layout
          className="og-search"
          data-docked={docked}
          style={{ borderRadius: docked ? 12 : 18 }}
          transition={{ layout: { duration: 0.75, ease: EASE } }}
          onSubmit={runSearch}
        >
          <motion.span layout="position" className="og-search-icon"><Search size={docked ? 15 : 19} aria-hidden="true" /></motion.span>
          <motion.span layout="position" className="og-query" aria-live="polite">
            {queryText}
            {phase === 'typing' && <i className="og-caret" aria-hidden="true" />}
          </motion.span>
          {docked ? (
            <button type="button" className="og-clear" onClick={reset} aria-label="Clear and search again"><X size={14} /></button>
          ) : (
            <button type="submit" className="og-submit" data-ready={phase === 'ready'} disabled={phase === 'resolving'}>
              {phase === 'resolving' ? <LoaderCircle size={15} className="og-spin" aria-hidden="true" /> : null}
              {phase === 'resolving' ? 'Searching' : 'Search'}
            </button>
          )}
        </motion.form>

        <AnimatePresence mode="wait">
          {(phase === 'typing' || phase === 'ready') && (
            <motion.div
              key="chips"
              className="og-idle og-idle-bottom"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <span>Or try</span>
              {ownershipSamples.map((option, index) => (
                index !== sampleIndex && (
                  <button type="button" key={option.id} className="og-chip" onClick={() => pickSample(index)}>{option.hotel.name}</button>
                )
              ))}
            </motion.div>
          )}
          {phase === 'resolving' && (
            <motion.ol key="steps" className="og-idle og-idle-bottom og-steps" exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
              {RESOLVE_STEPS.map((step, index) => (
                <motion.li
                  key={step}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 + index * 0.5 }}
                >
                  <Check size={12} aria-hidden="true" /> {step}
                </motion.li>
              ))}
            </motion.ol>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {docked && (tree
            ? <OwnershipGraph key={sample.id} sample={sample} size={size} />
            : <CompactGraph key={sample.id} sample={sample} />)}
        </AnimatePresence>

        <AnimatePresence>
          {docked && (
            <motion.div
              key="legend"
              className="og-legend"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 2.3 }}
            >
              <span className="og-legend-note"><i className="og-rank">1</i> Ranked by decision authority · Verified email + direct dial · Illustrative</span>
              <span className="og-legend-more">
                {ownershipSamples.map((option, index) => (
                  index !== sampleIndex && (
                    <button type="button" key={option.id} className="og-chip" onClick={() => pickSample(index)}>{option.hotel.name}</button>
                  )
                ))}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}
