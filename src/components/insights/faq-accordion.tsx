'use client';

import { Plus } from 'lucide-react';
import { useId, useState } from 'react';

import type { ArticleFaq } from '@/content/articles';

/** FAQ list where each question toggles its answer. Answers stay in the DOM so they remain indexable. */
export function FaqAccordion({ items }: { items: ArticleFaq[] }) {
  const baseId = useId();
  const [open, setOpen] = useState<number[]>([0]);
  const toggle = (index: number) =>
    setOpen((current) => (current.includes(index) ? current.filter((value) => value !== index) : [...current, index]));

  return (
    <div className="in-faq">
      {items.map((item, index) => {
        const expanded = open.includes(index);
        const buttonId = `${baseId}-q-${index}`;
        const panelId = `${baseId}-a-${index}`;
        return (
          <div className="in-faq-item" key={item.question} data-open={expanded}>
            <h3>
              <button type="button" id={buttonId} aria-expanded={expanded} aria-controls={panelId} onClick={() => toggle(index)}>
                <span>{item.question}</span>
                <span className="in-faq-icon" aria-hidden="true"><Plus size={15} /></span>
              </button>
            </h3>
            <div className="in-faq-panel" id={panelId} role="region" aria-labelledby={buttonId}>
              <div><p>{item.answer}</p></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
