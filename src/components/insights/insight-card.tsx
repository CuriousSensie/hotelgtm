import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export type InsightSummary = {
  slug: string;
  title: string;
  deck: string;
  category: string;
  /** Already formatted for display, e.g. "21 October 2026". */
  date: string;
  read: string;
};

/** Guide card used in the insights grid and the "keep reading" block on article pages. */
export function InsightCard({ item, headingLevel = 'h2' }: { item: InsightSummary; headingLevel?: 'h2' | 'h3' }) {
  const Heading = headingLevel;
  return (
    <article className="in-card">
      <div className="in-card-top">
        <span className="in-tag">{item.category}</span>
        <span className="lp-meta">{item.read}</span>
      </div>
      <Heading className="in-card-title">
        <Link href={`/insights/${item.slug}`} className="in-card-link">{item.title}</Link>
      </Heading>
      <p className="in-card-deck">{item.deck}</p>
      <div className="in-card-foot">
        <span className="lp-meta">{item.date}</span>
        <span className="in-card-arrow" aria-hidden="true"><ArrowUpRight size={15} /></span>
      </div>
    </article>
  );
}
