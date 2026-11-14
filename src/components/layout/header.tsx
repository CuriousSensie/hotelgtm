'use client';

import { ArrowRight, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { serviceNavLinks, useCaseNavLinks, type NavLink } from '@/content/navigation';

import { Brand } from './brand';

const currentIf = (active: boolean) => (active ? 'page' : undefined);

type DropdownProps = { label: string; links: NavLink[]; active: boolean; onNavigate: () => void };

function NavDropdown({ label, links, active, onNavigate }: DropdownProps) {
  return (
    <details className="nav-dropdown">
      <summary aria-current={currentIf(active)}>{label}</summary>
      <div className="nav-dropdown-menu">
        {links.map((link) => (
          <Link key={link.href} href={link.href} onClick={onNavigate}>{link.label}</Link>
        ))}
      </div>
    </details>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const close = () => setOpen(false);

  // The header persists across routes in the App Router, so collapse any open dropdowns on navigation.
  useEffect(() => {
    navRef.current?.querySelectorAll('details[open]').forEach((el) => el.removeAttribute('open'));
  }, [pathname]);

  return (
    <header className="topbar">
      <Brand aria-label="HotelGTM home" onClick={close} />
      <button
        className="menu-toggle"
        aria-label={open ? 'Close navigation' : 'Open navigation'}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        data-testid="button-mobile-menu"
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>
      <nav ref={navRef} className={`nav-links ${open ? 'open' : ''}`} aria-label="Main navigation">
        <Link href="/company" aria-current={currentIf(pathname === '/company')} onClick={close}>Company</Link>
        <NavDropdown
          label="Services"
          links={serviceNavLinks}
          active={serviceNavLinks.some((link) => link.href === pathname)}
          onNavigate={close}
        />
        <NavDropdown label="Use cases" links={useCaseNavLinks} active={pathname.startsWith('/use-cases')} onNavigate={close} />
        <Link href="/pricing" aria-current={currentIf(pathname === '/pricing')} onClick={close}>Pricing</Link>
        <Link href="/insights" aria-current={currentIf(pathname.startsWith('/insights'))} onClick={close}>Insights</Link>
        <Link
          href="/contact"
          aria-current={currentIf(pathname === '/contact')}
          className="nav-contact"
          onClick={close}
          data-testid="link-contact-nav"
        >
          Start a conversation <ArrowRight size={13} />
        </Link>
      </nav>
    </header>
  );
}
