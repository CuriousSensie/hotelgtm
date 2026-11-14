import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { SalesContactBand } from '@/components/shared/contact-band';
import { JsonLd } from '@/components/shared/json-ld';
import { articles, getArticle } from '@/content/articles';
import { formatLongDate } from '@/lib/format';
import { buildMetadata } from '@/lib/metadata';
import { SITE_ORIGIN, mailto } from '@/lib/site';

type Props = { params: Promise<{ slug: string }> };

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

  return (
    <>
      <JsonLd data={schema} />
      <header className="article-hero">
        <Breadcrumbs items={[{ label: 'Insights', href: '/insights' }, { label: article.category }]} />
        <span className="eyebrow">{article.category}</span>
        <h1>{article.title}</h1>
        <p className="article-deck">{article.deck}</p>
        <div className="byline">
          <span>By HotelGTM Research</span>
          <span>{formatLongDate(article.publishedAt)}</span>
          <span>{article.read}</span>
          <span>Editorial perspective</span>
        </div>
      </header>
      <div className="article-layout">
        <article className="article-body">
          <p><strong>{article.intro}</strong></p>
          <section className="takeaways">
            <h2>Key takeaways</h2>
            <ul>{article.takeaways.map((takeaway) => <li key={takeaway}>{takeaway}</li>)}</ul>
          </section>
          {article.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
            </section>
          ))}
          {article.faq && (
            <section className="faq">
              <h2>Frequently asked questions</h2>
              {article.faq.map((item) => (
                <div className="faq-item" key={item.question}>
                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
                </div>
              ))}
            </section>
          )}
          <Link href="/insights" className="back-link"><ArrowLeft size={14} /> Back to all insights</Link>
        </article>
        <aside className="article-aside">
          <span>Relevant to your work</span>
          <h3>Put the insight to work.</h3>
          <p>Explore HotelGTM’s market mapping, ownership and decision-maker intelligence, GTM playbooks and pipeline execution.</p>
          <a href={mailto('HotelGTM commercial inquiry')}>Discuss a market question <ArrowRight size={13} /></a>
          <Link href="/#services">View services</Link>
        </aside>
      </div>
      <SalesContactBand />
    </>
  );
}
