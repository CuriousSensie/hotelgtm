import type { ReactNode } from 'react';

import { ownershipSamples } from '@/content/home';

/*
 * Small product-style previews for the four "The work" cards on /company.
 * Illustrative only: every record comes from the invented `ownershipSamples`. The visible
 * "Illustrative" label sits once on the page's hero map, so each frame only says so to screen readers.
 */

const primary = ownershipSamples[0];
const ownerOf = (index: number) => ownershipSamples[index].entities[2];

function Frame({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="co-vig" role="img" aria-label={`${label}. Illustrative sample data.`}>
      {children}
    </div>
  );
}

function PropertyVignette() {
  return (
    <Frame label="Sample list of hotel properties with location and profile">
      {ownershipSamples.map((sample) => (
        <div className="co-vig-row" key={sample.id}>
          <strong>{sample.hotel.name}</strong>
          <span>{sample.hotel.place}</span>
        </div>
      ))}
    </Frame>
  );
}

function OwnershipVignette() {
  const [brand, operator, owner] = primary.entities;
  return (
    <Frame label="Sample record linking a hotel to its owner, operator and brand">
      {[owner, operator, brand].map((entity) => (
        <div className="co-vig-row co-vig-row-kv" key={entity.kind}>
          <span className="co-vig-key">{entity.kind}</span>
          <strong>{entity.name}</strong>
        </div>
      ))}
    </Frame>
  );
}

function PeopleVignette() {
  const people = primary.entities.flatMap((entity) => entity.people).sort((a, b) => a.rank - b.rank).slice(0, 3);
  return (
    <Frame label="Sample decision-makers ranked by decision authority">
      {people.map((person) => (
        <div className="co-vig-row co-vig-row-person" key={person.id}>
          <i className="og-rank" data-top={person.rank === 1}>{person.rank}</i>
          <strong>{person.name}</strong>
          <span>{person.authority}</span>
        </div>
      ))}
    </Frame>
  );
}

function RouteVignette() {
  const accounts = [
    { name: ownerOf(0).name, stage: 'Priority' },
    { name: ownerOf(2).name, stage: 'Planned' },
    { name: ownerOf(1).name, stage: 'Next' },
  ];
  return (
    <Frame label="Sample account list ordered by go-to-market priority">
      {accounts.map((account, index) => (
        <div className="co-vig-row co-vig-row-route" key={account.name}>
          <strong>{account.name}</strong>
          <span className="co-vig-pill" data-first={index === 0}>{account.stage}</span>
        </div>
      ))}
    </Frame>
  );
}

/** One vignette per scope item, in the order the items are listed on the page. */
export const scopeVignettes: ReactNode[] = [
  <PropertyVignette key="property" />,
  <OwnershipVignette key="ownership" />,
  <PeopleVignette key="people" />,
  <RouteVignette key="route" />,
];
