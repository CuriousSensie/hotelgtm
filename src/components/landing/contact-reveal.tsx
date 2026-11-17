'use client';

import { ArrowRight, BadgeCheck, Mail, Phone } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

import type { GraphPerson } from '@/content/home';
import { mailto } from '@/lib/site';
import { usePrefersReducedMotion } from '@/lib/use-prefers-reduced-motion';

export type ContactChannel = 'email' | 'phone';

const GLYPHS = 'abcdefghijklmnopqrstuvwxyz0123456789';
const MASK = '•';
/** Characters that keep their place while the rest scramble, so the value's shape reads immediately. */
const FIXED = new Set([MASK, '@', '.', ' ', '+', '(', ')', '-']);

const CHANNEL_LABEL: Record<ContactChannel, string> = { email: 'Email', phone: 'Phone' };
const CHANNEL_ICON = { email: Mail, phone: Phone } as const;

export const FULL_CONTACTS_HREF = mailto(
  'HotelGTM contact data inquiry',
  'Hello HotelGTM,\n\nWe’d like verified decision-maker contacts for:\nOur target market:\n',
);

/** Deterministic pre-reveal state (same on server and client): every hidden-able character is a mask dot. */
const placeholder = (value: string) => [...value].map((char) => (FIXED.has(char) ? char : MASK)).join('');

/**
 * Scrambles `value` into place once `run` is true: characters settle left to right through random glyphs.
 * Before running it shows a masked placeholder; under reduced motion it shows the value at once.
 */
function useScramble(value: string, run: boolean, delayMs: number, durationMs = 700) {
  const reduce = usePrefersReducedMotion();
  const [frame, setFrame] = useState<{ text: string; done: boolean }>({ text: placeholder(value), done: false });

  useEffect(() => {
    if (!run || reduce) return;
    const chars = [...value];
    let raf = 0;
    const start = performance.now() + delayMs;
    const tick = (now: number) => {
      const progress = Math.min(Math.max((now - start) / durationMs, 0), 1);
      const settled = Math.floor(progress * chars.length);
      const text = chars
        .map((char, index) => {
          if (index < settled || FIXED.has(char)) return char;
          return progress === 0 ? MASK : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        })
        .join('');
      setFrame({ text, done: progress === 1 });
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, run, reduce, delayMs, durationMs]);

  if (run && reduce) return { text: value, done: true };
  return frame;
}

type ContactValueProps = {
  channel: ContactChannel;
  value: string;
  run?: boolean;
  delayMs?: number;
  className?: string;
  /** Leading channel icon; off where a column header already names the channel. */
  icon?: boolean;
};

/** One contact value that scrambles in, then shows a verified tick. Screen readers get the final value. */
export function ContactValue({ channel, value, run = true, delayMs = 0, className, icon = true }: ContactValueProps) {
  const { text, done } = useScramble(value, run, delayMs);
  const Icon = CHANNEL_ICON[channel];
  return (
    <span className={className ? `ct-value ${className}` : 'ct-value'} data-done={done}>
      {icon && <Icon size={12} aria-hidden="true" />}
      <span className="ct-text" aria-hidden="true">{text}</span>
      <span className="ct-sr">{`${CHANNEL_LABEL[channel]}, partly hidden in this sample: ${value.replaceAll(MASK, '')}${done ? ', verified' : ''}`}</span>
      <motion.span
        className="ct-check"
        initial={false}
        animate={{ opacity: done ? 1 : 0, scale: done ? 1 : 0.4 }}
        transition={{ type: 'spring', stiffness: 520, damping: 22 }}
        aria-hidden="true"
      >
        <BadgeCheck size={13} aria-hidden="true" />
      </motion.span>
    </span>
  );
}

type ContactChipsProps = {
  person: GraphPerson;
  open: ContactChannel | null;
  onToggle: (channel: ContactChannel) => void;
  /** Icon-only chips (compact list); otherwise icon plus label. */
  iconOnly?: boolean;
  /** Draws the eye with a slow pulse (top-ranked person). */
  pulse?: boolean;
  /** id of the element the chips open, for aria-controls. */
  controls: string;
};

export function ContactChips({ person, open, onToggle, iconOnly = false, pulse = false, controls }: ContactChipsProps) {
  return (
    <span className="ct-chips" data-pulse={pulse}>
      {(['email', 'phone'] as const).map((channel) => {
        const Icon = CHANNEL_ICON[channel];
        return (
          <button
            key={channel}
            type="button"
            className="ct-chip"
            data-icon-only={iconOnly}
            aria-expanded={open === channel}
            aria-controls={controls}
            aria-label={`${open === channel ? 'Hide' : 'See'} ${channel === 'email' ? 'email' : 'phone number'} for ${person.name}`}
            onClick={(event) => {
              event.stopPropagation();
              onToggle(channel);
            }}
          >
            <Icon size={iconOnly ? 15 : 11} aria-hidden="true" />
            {!iconOnly && <span>{CHANNEL_LABEL[channel]}</span>}
          </button>
        );
      })}
    </span>
  );
}

type ContactPanelProps = { id: string; person: GraphPerson; channel: ContactChannel };

/** Revealed value plus the upsell link; used in the tree popover and the compact drawer. */
export function ContactPanel({ id, person, channel }: ContactPanelProps) {
  return (
    <div className="ct-panel" id={id} role="region" aria-label={`${CHANNEL_LABEL[channel]} for ${person.name}`}>
      <span className="ct-panel-label">{channel === 'email' ? 'Work email' : 'Direct dial'} · Verified</span>
      <ContactValue key={channel} channel={channel} value={channel === 'email' ? person.email : person.phone} />
      <a className="ct-cta" href={FULL_CONTACTS_HREF}>Get full contacts <ArrowRight size={12} aria-hidden="true" /></a>
    </div>
  );
}
