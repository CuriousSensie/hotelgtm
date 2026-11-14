import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export type RelatedLink = { label: string; href: string; description: string };

export function RelatedLinks({ eyebrow, heading, links }: { eyebrow: string; heading: string; links: RelatedLink[] }) {
  return (
    <section className="related-section">
      <div className="related-heading">
        <span className="eyebrow">{eyebrow}</span>
        <h2>{heading}</h2>
      </div>
      <div className="related-grid">
        {links.map((item) => (
          <Link className="related-card" href={item.href} key={item.href}>
            <span>{item.label}</span>
            <p>{item.description}</p>
            <ArrowRight size={15} />
          </Link>
        ))}
      </div>
    </section>
  );
}
