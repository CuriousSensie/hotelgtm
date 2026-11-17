import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

import { ShaderCanvas } from '@/components/shaders/shader-canvas';
import { hero } from '@/content/home';
import { mailto } from '@/lib/site';

import { OwnershipSearch } from './ownership-search';

export function Hero() {
  return (
    <section className="lp-hero">
      <div className="lp-hero-bg" aria-hidden="true">
        <ShaderCanvas shader="silk" palette="pine" speed={0.9} />
      </div>
      <div className="lp-wrap">
        <div className="lp-hero-head">
          <div className="lp-rise">
            <span className="lp-eyebrow">{hero.eyebrow}</span>
            <h1>{hero.title}</h1>
          </div>
          <div className="lp-hero-side lp-rise" style={{ animationDelay: '.12s' }}>
            <p>{hero.lede}</p>
            <div className="lp-actions">
              <a href={mailto(hero.primaryCta.subject)} className="lp-button">{hero.primaryCta.label} <ArrowRight size={15} /></a>
              <Link href={hero.secondaryCta.href} className="lp-link">{hero.secondaryCta.label} <ArrowUpRight size={14} /></Link>
            </div>
          </div>
        </div>
        <div className="lp-rise" style={{ animationDelay: '.26s' }}>
          <OwnershipSearch />
        </div>
      </div>
    </section>
  );
}
