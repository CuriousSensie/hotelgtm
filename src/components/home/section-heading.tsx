import type { ReactNode } from 'react';

/** Two-column heading: eyebrow + title on the left, supporting content (copy/link) on the right. */
export function SectionHeading({ eyebrow, title, children }: { eyebrow: string; title: ReactNode; children: ReactNode }) {
  return (
    <div className="section-heading">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
      </div>
      {children}
    </div>
  );
}
