import type { CSSProperties } from 'react';

type BriefComposerProps = {
  to: string;
  subject: string;
  /** The pre-filled email body, exactly as the mailto link sends it. */
  body: string;
};

const delay = (index: number): CSSProperties => ({ animationDelay: `${0.35 + index * 0.11}s` });

/** Preview of the email draft the primary button opens: greeting, then one blank line per prompt. */
export function BriefComposer({ to, subject, body }: BriefComposerProps) {
  const lines = body.split('\n').filter((line) => line.trim().length > 0);
  const [greeting, ...prompts] = lines;

  return (
    <figure className="ct-composer" aria-label="Preview of the pre-filled email brief">
      <div className="ct-composer-bar">
        <span>HotelGTM / Your brief</span>
        <span className="ct-composer-state"><i /> Draft</span>
      </div>
      <dl className="ct-composer-meta">
        <div><dt>To</dt><dd>{to}</dd></div>
        <div><dt>Subject</dt><dd>{subject}</dd></div>
      </dl>
      <div className="ct-composer-body">
        <p className="ct-composer-line" style={delay(0)}>{greeting}</p>
        {prompts.map((prompt, index) => (
          <p className="ct-composer-line ct-composer-field" style={delay(index + 1)} key={prompt}>
            <span>{prompt}</span>
            <i aria-hidden="true">{index === 0 && <b className="ct-caret" />}</i>
          </p>
        ))}
      </div>
    </figure>
  );
}
