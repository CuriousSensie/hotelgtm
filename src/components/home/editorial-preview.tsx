import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import type { Article } from '@/content/articles';
import { formatLongDate } from '@/lib/format';

import { SectionHeading } from './section-heading';

export function EditorialPreview({ article }: { article: Article }) {
  const href = `/insights/${article.slug}`;
  return (
    <section className="section editorial-preview">
      <SectionHeading eyebrow="Hotel market guides" title={<>Data and sales advice<br />for hotel suppliers.</>}>
        <Link href="/insights" className="text-link">All hotel market guides <ArrowRight size={14} /></Link>
      </SectionHeading>
      <div className="article-preview">
        <article className="article-feature">
          <span className="article-meta">{article.category} &nbsp;·&nbsp; {formatLongDate(article.publishedAt)}</span>
          <Link href={href}><h3>{article.title}</h3></Link>
          <p>{article.deck}</p>
          <Link href={href} className="text-link">Read the field note <ArrowRight size={14} /></Link>
        </article>
        <aside className="article-side">
          <div>
            <span className="article-meta">For hospitality sales teams</span>
            <p>Use property and buyer data to choose the right hotel accounts before you invest in outreach.</p>
          </div>
          <strong>Find target hotels.<br />Reach their buyers.</strong>
        </aside>
      </div>
    </section>
  );
}
