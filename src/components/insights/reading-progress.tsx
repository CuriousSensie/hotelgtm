'use client';

import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react';
import { useEffect } from 'react';

/** Thin bar pinned to the top of the viewport that fills as the target element is read. */
export function ReadingProgress({ targetId }: { targetId: string }) {
  const reduceMotion = useReducedMotion();
  const progress = useMotionValue(0);
  const smooth = useSpring(progress, { stiffness: 140, damping: 28, mass: 0.35 });

  useEffect(() => {
    const target = document.getElementById(targetId);
    if (!target) return;

    let frame = 0;
    const measure = () => {
      frame = 0;
      const rect = target.getBoundingClientRect();
      // Starts when the body reaches the header and completes when its end reaches mid-viewport.
      const distance = rect.height - window.innerHeight * 0.5;
      const travelled = 96 - rect.top;
      progress.set(distance > 0 ? Math.min(1, Math.max(0, travelled / distance)) : 1);
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
  }, [targetId, progress]);

  return (
    <div className="in-progress" aria-hidden="true">
      <motion.i style={{ scaleX: reduceMotion ? progress : smooth }} />
    </div>
  );
}
