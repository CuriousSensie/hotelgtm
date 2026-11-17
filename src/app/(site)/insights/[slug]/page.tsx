import { ArrowRight, CalendarDays, Clock } from 'lucide-react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ArticleToc, type TocItem } from '@/components/insights/article-toc';
import { FaqAccordion } from '@/components/insights/faq-accordion';
import { InsightCard, type InsightSummary } from '@/components/insights/insight-card';
import { ReadingProgress } from '@/components/insights/reading-progress';
import { Reveal } from '@/components/landing/reveal';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { JsonLd } from '@/components/shared/json-ld';
import { articles, getArticle, type Article } from '@/content/articles';
import { formatLongDate } from '@/lib/format';
import { buildMetadata } from '@/lib/metadata';
import { SITE_ORIGIN, mailto } from '@/lib/site';

type Props = { params: Promise<{ slug: string }> };

const BODY_ID = 'article-body';
const FAQ_ID = 'frequently-asked-questions';

const toAnchor = (heading: string) => heading.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const toSummary = ({ slug, title, deck, category, publishedAt, read }: Article): InsightSummary => ({
  slug,
  title,
  deck,
  category,
  date: formatLongDate(publishedAt),
  read,
});

/** The other guides, starting with the one that follows the current article. */
function otherArticles(current: Article): Article[] {
  const index = articles.indexOf(current);
  return [...articles.slice(index + 1), ...articles.slice(0, index)].slice(0, 3);
}

export const dynamicParams = false;

export const generateStaticParams = () => articles.map(({ slug }) => ({ slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getArticle((await params).slug);
  if (!article) return {};
  return buildMetadata({
    title: `${article.title} | HotelGTM`,
    description: article.deck,
    path: `/insights/${article.slug}`,
    type: 'article',
  });
}

export default async function ArticlePage({ params }: Props) {
  const article = getArticle((await params).slug);
  if (!article) notFound();

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.deck,
    datePublished: article.publishedAt,
    author: { '@type': 'Organization', name: 'HotelGTM' },
    publisher: { '@type': 'Organization', name: 'HotelGTM' },
    mainEntityOfPage: `${SITE_ORIGIN}/insights/${article.slug}`,
  };

  const toc: TocItem[] = article.sections.map((section) => ({ id: toAnchor(section.heading), label: section.heading }));
  if (article.faq) toc.push({ id: FAQ_ID, label: 'Frequently asked questions' });
  const more = otherArticles(article);

  return (
    <div className="lp in-article">
      <JsonLd data={schema} />
      <ReadingProgress targetId={BODY_ID} />

      <header className="in-article-hero">
        <div className="lp-wrap lp-rise">
          <Breadcrumbs items={[{ label: 'Insights', href: '/insights' }, { label: article.category }]} />
          <h1>{article.title}</h1>
          <p className="in-article-deck">{article.deck}</p>
          <ul className="in-byline">
            <li><span className="in-byline-mark" aria-hidden="true">H</span>By HotelGTM Research</li>
            <li><CalendarDays size={13} aria-hidden="true" />{formatLongDate(article.publishedAt)}</li>
            <li><Clock size={13} aria-hidden="true" />{article.read}</li>
          </ul>
        </div>
      </header>

      <div className="lp-wrap in-article-layout">
        <article className="in-prose" id={BODY_ID}>
          <p className="in-lead">{article.intro}</p>

          {article.sections.map((section, index) => (
            <section key={section.heading} className="in-prose-section">
              <span className="in-section-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
              <h2 id={toAnchor(section.heading)}>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.bullets && <ul className="in-bullets">{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
            </section>
          ))}

          {article.faq && (
            <section className="in-prose-section in-faq-section">
              <h2 id={FAQ_ID}>Frequently asked questions</h2>
              <FaqAccordion items={article.faq} />
            </section>
          )}
        </article>

        <div className="in-rail">
          <ArticleToc items={toc} />
          <aside className="in-cta">
            <h3>Have us map your market.</h3>
            <p>We do this research for B2B teams selling into hotels, then turn it into pipeline.</p>
            <a className="lp-button lp-button-brass" href={mailto('HotelGTM commercial inquiry')}>Email us your market <ArrowRight size={14} /></a>
          </aside>
        </div>
      </div>

      <section className="lp-section lp-section-tint in-more">
        <div className="lp-wrap">
          <Reveal className="in-more-head">
            <h2>Keep reading</h2>
          </Reveal>
          <div className="in-grid">
            {more.map((item, index) => (
              <Reveal key={item.slug} className="in-grid-cell" delay={index * 0.07}>
                <InsightCard item={toSummary(item)} headingLevel="h3" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
