'use client';

import { MotionConfig, motion } from 'motion/react';
import { useEffect, useState } from 'react';

export type TocItem = { id: string; label: string };

/** Distance from the top of the viewport at which a section counts as "current". */
const ACTIVE_LINE = 150;

/** "On this page" list that highlights the section currently being read. */
export function ArticleToc({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      let current: string | null = null;
      for (const item of items) {
        const heading = document.getElementById(item.id);
        if (heading && heading.getBoundingClientRect().top <= ACTIVE_LINE) current = item.id;
      }
      setActiveId(current);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    schedule();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [items]);

  return (
    <MotionConfig reducedMotion="user">
      <nav className="in-toc" aria-label="On this page">
        <span className="lp-meta">On this page</span>
        <ol>
          {items.map((item, index) => {
            const active = item.id === activeId;
            return (
              <li key={item.id} data-active={active}>
                {active && <motion.span layoutId="in-toc-marker" className="in-toc-marker" transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }} />}
                <a href={`#${item.id}`} aria-current={active ? 'location' : undefined}>
                  <span className="in-toc-index">{String(index + 1).padStart(2, '0')}</span>
                  <span>{item.label}</span>
                </a>
              </li>
            );
          })}
        </ol>
      </nav>
    </MotionConfig>
  );
}
