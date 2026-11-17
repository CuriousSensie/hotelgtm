'use client';

import { Check, Copy } from 'lucide-react';
import { useEffect, useState } from 'react';

type CopyState = 'idle' | 'copied' | 'failed';

const LABELS: Record<CopyState, string> = { idle: 'Copy address', copied: 'Copied', failed: 'Copy failed' };
const RESET_MS = 2200;

/** Copies the contact address to the clipboard, for visitors without a mail client set up. */
export function CopyEmail({ email }: { email: string }) {
  const [state, setState] = useState<CopyState>('idle');

  useEffect(() => {
    if (state === 'idle') return;
    const timer = setTimeout(() => setState('idle'), RESET_MS);
    return () => clearTimeout(timer);
  }, [state]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setState('copied');
    } catch (error) {
      // Clipboard access can be denied (permissions, insecure context); tell the visitor rather than fail silently.
      console.error('Could not copy the email address', error);
      setState('failed');
    }
  };

  return (
    <button type="button" className="ct-copy" data-state={state} onClick={copy}>
      {state === 'copied' ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
      <span aria-live="polite">{LABELS[state]}</span>
    </button>
  );
}
