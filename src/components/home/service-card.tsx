import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export type ServiceCardData = {
  number: string;
  title: string;
  copy: string;
  link?: { label: string; href: string };
};

export function ServiceGrid({ items }: { items: ServiceCardData[] }) {
  return (
    <div className="service-grid">
      {items.map((item) => (
        <article className="service" key={item.number}>
          <span className="service-number">{item.number}</span>
          <h3>{item.title}</h3>
          <p>{item.copy}</p>
          {item.link && <Link href={item.link.href}>{item.link.label} <ArrowRight size={13} /></Link>}
        </article>
      ))}
    </div>
  );
}
