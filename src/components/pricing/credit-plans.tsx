'use client';

import { ArrowRight, Check, Lock } from 'lucide-react';
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from 'motion/react';
import Link from 'next/link';
import { useEffect, useId, useState, type CSSProperties } from 'react';

import { Reveal } from '@/components/landing/reveal';
import { creditTiers, creditUsage, formatUsd } from '@/content/pricing';

/*
 * Credit allowance cards plus an estimator. All numbers are derived from `pricing.ts`:
 * allowances and prices from `creditTiers`, per-property credit costs from `creditUsage`.
 */

const toNumber = (text: string): number => Number(text.replace(/[^0-9]/g, ''));
const count = new Intl.NumberFormat('en-US');

const allowances = creditTiers.map((tier) => toNumber(tier.label));
const largestAllowance = allowances[allowances.length - 1];
/** Credit cost of each research layer; the first is the core profile every property needs. */
const layerCosts = creditUsage.map((item) => toNumber(item.cost));

const PROPERTIES = { min: 25, max: 2000, step: 25, initial: 150 };

/** Position (0 to 1) on a meter whose segments, one per allowance, are equally wide. */
function meterPosition(credits: number): number {
  let floor = 0;
  for (let index = 0; index < allowances.length; index += 1) {
    const ceiling = allowances[index];
    if (credits <= ceiling) return (index + (credits - floor) / (ceiling - floor)) / allowances.length;
    floor = ceiling;
  }
  return 1;
}

export function CreditPlans() {
  const sliderId = useId();
  const reduceMotion = useReducedMotion();
  const [properties, setProperties] = useState(PROPERTIES.initial);
  // The core profile (layer 0) is always included; the add-on layers are optional.
  const [addOns, setAddOns] = useState<boolean[]>(() => layerCosts.map((_, index) => index === 1));

  const included = (index: number) => index === 0 || addOns[index];
  const perProperty = layerCosts.reduce((sum, cost, index) => (included(index) ? sum + cost : sum), 0);
  const credits = properties * perProperty;
  const matchIndex = allowances.findIndex((allowance) => credits <= allowance);
  const match = matchIndex === -1 ? null : creditTiers[matchIndex];

  // The headline number counts to its new value; a tween (not a spring) so it always lands exactly on it.
  const displayed = useMotionValue(credits);
  const animated = useTransform(displayed, (value) => count.format(Math.round(value)));
  useEffect(() => {
    if (reduceMotion) {
      displayed.set(credits);
      return;
    }
    const controls = animate(displayed, credits, { duration: 0.5, ease: [0.22, 1, 0.36, 1] });
    return () => controls.stop();
  }, [credits, reduceMotion, displayed]);

  const toggle = (index: number) => setAddOns((current) => current.map((on, position) => (position === index ? !on : on)));

  return (
    <>
      <div className="pr-plans">
        {creditTiers.map((tier, index) => (
          <Reveal key={tier.label} delay={index * 0.07}>
            <article className="pr-plan" data-match={index === matchIndex} data-testid={`card-credit-tier-${tier.label}`}>
              <div className="pr-plan-top">
                <span className="lp-meta">Credit allowance</span>
                {index === matchIndex && <span className="pr-plan-tag">Matches your estimate</span>}
              </div>
              <h3>{tier.label}<small> credits</small></h3>
              <p className="pr-price">{formatUsd(tier.monthlyUsd)}<span>/month</span></p>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal className="pr-estimator">
        <div className="pr-est-controls">
          <h3>Estimate your monthly credits.</h3>

          <ul className="pr-est-layers">
            {creditUsage.map((item, index) => (
              <li key={item.cost}>
                {index === 0 ? (
                  <div className="pr-est-layer" data-on="true" data-locked="true">
                    <span className="pr-est-check"><Lock size={11} aria-hidden="true" /></span>
                    <span className="pr-est-use">{item.use}</span>
                    <strong>{item.cost}</strong>
                  </div>
                ) : (
                  <button type="button" className="pr-est-layer" role="switch" aria-checked={addOns[index]} data-on={addOns[index]} onClick={() => toggle(index)}>
                    <span className="pr-est-check">{addOns[index] && <Check size={12} aria-hidden="true" />}</span>
                    <span className="pr-est-use">{item.use}</span>
                    <strong>{item.cost}</strong>
                  </button>
                )}
              </li>
            ))}
          </ul>

          <div className="pr-est-slider">
            <label htmlFor={sliderId}>
              <span>Hotels researched per month</span>
              <output htmlFor={sliderId}>{count.format(properties)}</output>
            </label>
            <input
              id={sliderId}
              type="range"
              min={PROPERTIES.min}
              max={PROPERTIES.max}
              step={PROPERTIES.step}
              value={properties}
              onChange={(event) => setProperties(Number(event.target.value))}
              style={{ '--fill': `${((properties - PROPERTIES.min) / (PROPERTIES.max - PROPERTIES.min)) * 100}%` } as CSSProperties}
            />
          </div>
        </div>

        <div className="pr-est-result">
          <span className="pr-est-label">Estimated credits per month</span>
          <p className="pr-est-total" aria-hidden="true"><motion.span>{animated}</motion.span></p>
          <p className="pr-est-formula">
            {count.format(properties)} properties × {perProperty} {perProperty === 1 ? 'credit' : 'credits'} each
          </p>

          <div className="pr-meter" aria-hidden="true">
            <div className="pr-meter-rail"><i style={{ transform: `scaleX(${meterPosition(credits)})` }} data-over={match === null} /></div>
            <div className="pr-meter-ticks">
              {creditTiers.map((tier, index) => (
                <span key={tier.label} data-match={index === matchIndex}>{tier.label}</span>
              ))}
            </div>
          </div>

          <div className="pr-est-match" role="status">
            <span className="pr-visually-hidden">{count.format(credits)} estimated credits per month. </span>
            {match ? (
              <>
                <span className="pr-est-label">Fits within</span>
                <p><strong>{match.label} credits</strong> <span>{formatUsd(match.monthlyUsd)}/month</span></p>
              </>
            ) : (
              <>
                <span className="pr-est-label">Above the listed allowances</span>
                <p><strong>More than {count.format(largestAllowance)} credits</strong></p>
              </>
            )}
          </div>
          <Link href="/contact" className="lp-button lp-button-brass">{match ? 'Discuss this allowance' : 'Scope a custom allowance'} <ArrowRight size={15} /></Link>
          <p className="pr-est-note">Estimate only.</p>
        </div>
      </Reveal>
    </>
  );
}
