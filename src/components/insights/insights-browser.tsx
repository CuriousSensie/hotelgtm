'use client';

import { ArrowRight, Search, SearchX, X } from 'lucide-react';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import Link from 'next/link';
import { useMemo, useState } from 'react';

import { InsightCard, type InsightSummary } from './insight-card';

export type { InsightSummary };

const ALL = 'All topics';
const EASE = [0.22, 1, 0.36, 1] as const;

const matchesQuery = (item: InsightSummary, query: string) =>
  `${item.title} ${item.deck} ${item.category}`.toLowerCase().includes(query);

function FeaturedGuide({ item }: { item: InsightSummary }) {
  const href = `/insights/${item.slug}`;
  return (
    <article className="in-featured">
      <div className="in-featured-main">
        <div className="in-featured-meta">
          <span className="in-tag in-tag-solid">Featured</span>
          <span className="lp-meta">{item.category} · {item.read}</span>
        </div>
        <h2><Link href={href}>{item.title}</Link></h2>
        <p>{item.deck}</p>
        <Link href={href} className="lp-button">Read the guide <ArrowRight size={15} /></Link>
      </div>
    </article>
  );
}

/** Search box, topic chips with counts, featured guide and the filtered guide grid for /insights. */
export function InsightsBrowser({ items }: { items: InsightSummary[] }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(ALL);

  const query = search.toLowerCase().trim();
  const categories = useMemo(() => [ALL, ...new Set(items.map((item) => item.category))], [items]);
  const searched = useMemo(() => items.filter((item) => matchesQuery(item, query)), [items, query]);
  const filtered = useMemo(
    () => searched.filter((item) => category === ALL || item.category === category),
    [searched, category],
  );
  const countFor = (name: string) => (name === ALL ? searched.length : searched.filter((item) => item.category === name).length);

  const isFiltering = query !== '' || category !== ALL;
  const featured = isFiltering ? undefined : filtered[0];
  const gridItems = featured ? filtered.slice(1) : filtered;
  const reset = () => {
    setSearch('');
    setCategory(ALL);
  };

  return (
    <MotionConfig reducedMotion="user">
      <section className="in-browser" aria-label="Browse insights">
        <div className="lp-wrap">
          <div className="in-tools" aria-label="Filter insights">
            <div className="in-chips" role="group" aria-label="Filter by topic">
              {categories.map((item) => {
                const active = category === item;
                return (
                  <button
                    key={item}
                    type="button"
                    className="in-chip"
                    data-active={active}
                    onClick={() => setCategory(item)}
                    aria-pressed={active}
                    data-testid={`filter-${item.toLowerCase().replaceAll(' ', '-')}`}
                  >
                    {active && <motion.span layoutId="in-chip-pill" className="in-chip-pill" transition={{ duration: 0.4, ease: EASE }} />}
                    <span className="in-chip-label">{item}</span>
                    <span className="in-chip-count">{countFor(item)}</span>
                  </button>
                );
              })}
            </div>
            <label className="in-search">
              <Search size={15} aria-hidden="true" />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search guides"
                aria-label="Search insights"
                data-testid="input-search-insights"
              />
              {search && (
                <button type="button" className="in-search-clear" onClick={() => setSearch('')} aria-label="Clear search">
                  <X size={14} />
                </button>
              )}
            </label>
          </div>

          <div className="in-results-bar">
            <span className="lp-meta" role="status">
              {isFiltering ? `${filtered.length} of ${items.length} guides` : ''}
            </span>
            {isFiltering && <button type="button" className="in-reset" onClick={reset}>Clear filters <X size={12} /></button>}
          </div>

          {featured && (
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }}>
              <FeaturedGuide item={featured} />
            </motion.div>
          )}

          {filtered.length ? (
            <div className="in-grid">
              <AnimatePresence mode="popLayout" initial={false}>
                {gridItems.map((item, index) => (
                  <motion.div
                    key={item.slug}
                    layout
                    className="in-grid-cell"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.45, ease: EASE, delay: index * 0.04 }}
                  >
                    <InsightCard item={item} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <motion.div className="in-empty" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: EASE }}>
              <span className="in-empty-icon" aria-hidden="true"><SearchX size={20} /></span>
              <p className="in-empty-text">No guides match that search. Try another phrase or topic.</p>
              <button type="button" className="in-reset" onClick={reset}>Clear filters <X size={12} /></button>
            </motion.div>
          )}
        </div>
      </section>
    </MotionConfig>
  );
}
