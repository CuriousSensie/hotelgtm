import Link from 'next/link';

import { footerLinks } from '@/content/navigation';

import { Brand } from './brand';

export function Footer() {
  return (
    <footer className="footer">
      <Brand />
      <span>Verified hotel ownership intelligence, GTM strategy and pipeline execution.</span>
      <nav className="footer-links" aria-label="Footer navigation">
        {footerLinks.map((link) => (
          <Link key={link.href} href={link.href}>{link.label}</Link>
        ))}
      </nav>
      <small className="legal-copy">© 2026 HotelGTM. HotelGTM is a specialized division and operating DBA of Hospitality Growth Advisors, LLC.</small>
    </footer>
  );
}
