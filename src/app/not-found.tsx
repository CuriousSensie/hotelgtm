import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="lp in-screen">
      <div className="in-screen-card lp-rise">
        <span className="lp-eyebrow">Error 404</span>
        <h1>Page not found</h1>
        <p>This page doesn’t exist or has moved.</p>
        <div className="in-screen-actions">
          <Link href="/" className="lp-button">Back to home <ArrowRight size={15} /></Link>
        </div>
      </div>
    </div>
  );
}
