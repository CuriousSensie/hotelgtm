import Link from 'next/link';
import { Fragment } from 'react';

export type Crumb = { label: string; href?: string };

/** Home is always first; the last crumb is usually the current page (no href). */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <Link href="/">Home</Link>
      {items.map((item) => (
        <Fragment key={item.label}>
          <span>/</span>
          {item.href ? <Link href={item.href}>{item.label}</Link> : <span>{item.label}</span>}
        </Fragment>
      ))}
    </nav>
  );
}
