import { ArrowDownRight, ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { mailto } from '@/lib/site';

function HeroArt() {
  return (
    <div className="hero-art" aria-label="Illustrated hospitality market map with connected hotel locations">
      <span className="orbit orbit-one" />
      <span className="orbit orbit-two" />
      <div className="map-grid">
        <span className="map-label north">HOTEL MARKET DATA</span>
        <span className="map-label south">PROPERTY · OWNER · BUYER</span>
        <i className="map-pin p1" />
        <i className="map-pin p2" />
        <i className="map-pin p3" />
        <i className="map-pin p4" />
      </div>
      <div className="map-card">
        <span>Hotel account map</span>
        <strong>Owners → pipeline</strong>
        <small>Verified entities, operators and decision-makers</small>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="hero">
      <div className="hero-copy">
        <span className="eyebrow">B2B GTM &amp; OWNERSHIP INTELLIGENCE FOR HOSPITALITY</span>
        <h1>Connect with Hotel Owners, Operators, &amp; Decision-Makers.</h1>
        <p className="hero-lede">We provide verified hotel ownership &amp; management data paired with targeted GTM playbooks to help property management companies, tech vendors, and service providers close hotel accounts.</p>
        <div className="hero-actions">
          <a href={mailto('HotelGTM commercial inquiry')} className="button-primary">Talk through your market <ArrowRight size={15} /></a>
          <Link href="/insights" className="text-link">Read hospitality insights <ArrowDownRight size={14} /></Link>
        </div>
      </div>
      <HeroArt />
      <span className="hero-index">HOTELGTM / FIELDWORK 001</span>
    </section>
  );
}

export function ProofStrip() {
  return (
    <section className="proof-strip">
      <p>HotelGTM helps any business selling into hospitality reach hotel owners, management companies and executive decision-makers.</p>
      <div className="proof-list">
        <Link href="/use-cases/property-management-asset-firms">Property &amp; asset firms</Link>
        <Link href="/use-cases/hospitality-tech-saas">B2B SaaS</Link>
        <Link href="/use-cases/vendors-infrastructure">Hospitality suppliers</Link>
      </div>
    </section>
  );
}
