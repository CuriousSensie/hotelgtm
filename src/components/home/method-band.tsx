const steps = [
  { index: '01', title: 'Choose target accounts', copy: 'Set the hotel types, locations and markets that fit your product.' },
  { index: '02', title: 'Find owners and buyers', copy: 'Connect each hotel to its ownership and operating group, then identify relevant contacts.' },
  { index: '03', title: 'Plan and start outreach', copy: 'Prioritize accounts and prepare a clear approach for the people involved in buying.' },
];

export function MethodBand() {
  return (
    <section className="method-band">
      <div>
        <span className="eyebrow">How the service works</span>
        <h2>From target list<br />to first conversation.</h2>
        <p>Use hotel data to select accounts, find the people involved and plan how to approach them.</p>
      </div>
      <div className="steps">
        {steps.map((step) => (
          <article className="step" key={step.index}>
            <span className="step-index">{step.index}</span>
            <div>
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
