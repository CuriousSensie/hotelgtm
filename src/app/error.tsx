'use client';

import { RotateCw } from 'lucide-react';
import { useEffect } from 'react';

type ErrorProps = { error: Error & { digest?: string }; reset: () => void };

export default function RouteError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Route error boundary caught an error:', error);
  }, [error]);

  return (
    <div className="lp in-screen">
      <div className="in-screen-card lp-rise">
        <h1>Something went wrong</h1>
        <p>This page failed to load. Try again, or come back in a moment.</p>
        {/* Dev only: messages can carry internals. */}
        {process.env.NODE_ENV === 'development' ? (
          <pre className="in-screen-trace">{error.message || String(error)}</pre>
        ) : null}
        <div className="in-screen-actions">
          <button type="button" onClick={reset} className="lp-button in-screen-button">
            Try again <RotateCw size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
