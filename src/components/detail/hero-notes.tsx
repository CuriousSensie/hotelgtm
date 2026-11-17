import type { CSSProperties } from 'react';

export type NotesRow = { name: string; sub: string; rank?: number };
export type NotesGroup = { label: string; rows: NotesRow[] };

type HeroNotesProps = {
  bar: string;
  groups: NotesGroup[];
};

/**
 * Hero card: a short chain (market, group, people) filled with invented demo records.
 * Decorative, so it is hidden from assistive technology like the aside it replaces.
 */
export function HeroNotes({ bar, groups }: HeroNotesProps) {
  return (
    <div className="dp-notes lp-rise" style={{ animationDelay: '.15s' }} aria-hidden="true">
      <div className="dp-vig-bar"><span>{bar}</span><span>Illustrative</span></div>
      <div className="dp-notes-body">
        {groups.map((group, index) => (
          <div className="dp-notes-group lp-rise" key={group.label} style={{ animationDelay: `${0.3 + index * 0.16}s` } as CSSProperties}>
            <span className="dp-notes-label">{group.label}</span>
            {group.rows.map((row) => (
              <div className="dp-notes-row" key={row.name}>
                {row.rank !== undefined && <span className="og-rank" data-top={row.rank === 1}>{row.rank}</span>}
                <strong>{row.name}</strong>
                <span>{row.sub}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
