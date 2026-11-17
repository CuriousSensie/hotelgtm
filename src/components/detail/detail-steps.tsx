'use client';

import { motion, useInView, useScroll, useSpring } from 'motion/react';
import { useRef } from 'react';

import { Reveal } from '@/components/landing/reveal';
import type { DetailPageContent } from '@/content/types';
import { usePrefersReducedMotion } from '@/lib/use-prefers-reduced-motion';

import type { VignetteKind } from './vignette-map';
import { Vignette } from './vignettes';

type Section = DetailPageContent['sections'][number];

function Step({ section, kind, sample }: { section: Section; kind: VignetteKind; sample: number }) {
  const ref = useRef<HTMLLIElement>(null);
  // Lights up as the scroll-drawn rail (whose tip sits 60% down the viewport) reaches this step.
  const reached = useInView(ref, { margin: '0px 0px -40% 0px', once: true });

  return (
    <li className="dp-step" ref={ref} data-on={reached}>
      <span className="dp-step-dot" aria-hidden="true" />
      <Reveal className="dp-step-copy">
        <span className="lp-eyebrow">{section.number}</span>
        <h3>{section.title}</h3>
        <p>{section.copy}</p>
      </Reveal>
      <Reveal className="dp-step-visual" delay={0.08}>
        <Vignette kind={kind} sample={sample} />
      </Reveal>
    </li>
  );
}

type DetailStepsProps = { sections: Section[]; kinds: VignetteKind[]; sample: number };

/** The numbered sequence: copy on the left, a product-style vignette on the right, joined by a scroll-drawn rail. */
export function DetailSteps({ sections, kinds, sample }: DetailStepsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 60%', 'end 60%'] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });

  return (
    <div className="dp-steps" ref={ref}>
      <span className="dp-rail" aria-hidden="true">
        <motion.i style={{ scaleY: reduceMotion ? 1 : progress }} />
      </span>
      <ol>
        {sections.map((section, index) => (
          <Step key={section.number} section={section} kind={kinds[index % kinds.length]} sample={sample} />
        ))}
      </ol>
    </div>
  );
}
