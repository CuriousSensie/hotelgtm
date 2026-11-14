'use client';

import { Search } from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState } from 'react';

const ALL = 'All perspectives';

export type InsightSummary = {
  slug: string;
  title: string;
  deck: string;
  category: string;
  date: string;
};

/** Search box, topic filters and the filtered article list for /insights. */
export function InsightsBrowser({ items }: { items: InsightSummary[] }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(ALL);

  const categories = useMemo(() => [ALL, ...new Set(items.map((item) => item.category))], [items]);
  const filtered = useMemo(() => {
    const query = search.toLowerCase().trim();
    return items.filter((item) => {
      const matchesCategory = category === ALL || item.category === category;
      const text = `${item.title} ${item.deck} ${item.category}`.toLowerCase();
      return matchesCategory && text.includes(query);
    });
  }, [items, category, search]);

  return (
    <>
      <section className="insights-tools" aria-label="Filter insights">
        <label className="search-box">
          <Search size={15} />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search field notes"
            aria-label="Search insights"
            data-testid="input-search-insights"
          />
        </label>
        <div className="category-list" role="group" aria-label="Filter by topic">
          {categories.map((item) => (
            <button
              key={item}
              className={`category-button ${category === item ? 'active' : ''}`}
              onClick={() => setCategory(item)}
              aria-pressed={category === item}
              data-testid={`filter-${item.toLowerCase().replaceAll(' ', '-')}`}
            >
              {item}
            </button>
          ))}
        </div>
      </section>
      <section className="insights-list" aria-label="Articles">
        {filtered.length ? (
          filtered.map((item) => (
            <article className="insight-row" key={item.slug}>
              <span className="insight-date">{item.date}</span>
              <div className="insight-content">
                <Link href={`/insights/${item.slug}`}><h2 className="insight-title">{item.title}</h2></Link>
                <p className="insight-excerpt">{item.deck}</p>
              </div>
              <span className="insight-category">{item.category}</span>
            </article>
          ))
        ) : (
          <p className="empty-results">No field notes match that search. Try another phrase or topic.</p>
        )}
      </section>
    </>
  );
}
