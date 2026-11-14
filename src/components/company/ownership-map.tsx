import { ArrowRight } from 'lucide-react';

function HotelIcon() {
  return (
    <svg viewBox="0 0 54 54" aria-hidden="true" focusable="false">
      <path d="M7 47V20l13-8V6h14v9l13 7v25H7Z" fill="none" stroke="currentColor" strokeWidth="1.35" />
      <path d="M20 12V6h14v9M14 27h5m-5 8h5m8-8h5m-5 8h5m8-8h5m-5 8h5M23 47V38h9v9" fill="none" stroke="currentColor" strokeWidth="1.15" />
      <path d="M7 47h40" stroke="currentColor" strokeWidth="1.35" />
    </svg>
  );
}

/** Diagram on /company: property → owner/operator entities → decision-makers → GTM route. */
export function OwnershipMap() {
  return (
    <figure className="ownership-map" aria-label="Hotel property relationships mapped to decision-makers and GTM action">
      <div className="ownership-map-topline">
        <span>HOTELGTM / RELATIONSHIP MAP</span>
        <span className="ownership-map-status"><i /> RESEARCH VIEW</span>
      </div>
      <div className="ownership-map-property">
        <HotelIcon />
        <div><span>PROPERTY / HOTEL</span><strong>Target property</strong></div>
        <span className="ownership-map-index">01</span>
      </div>
      <div className="ownership-map-connector"><span>OWNERSHIP + OPERATING LINKS</span></div>
      <div className="ownership-map-entities">
        <div><span>02 / CONTROL</span><strong>Owner entity</strong><small>Portfolio + parent links</small></div>
        <div><span>03 / OPERATE</span><strong>Management co.</strong><small>Operator + brand context</small></div>
      </div>
      <div className="ownership-map-connector"><span>DECISION-MAKERS</span></div>
      <div className="ownership-map-people"><span>GENERAL MANAGER</span><span>PROCUREMENT</span><span>OPERATIONS</span></div>
      <div className="ownership-map-action"><span>ACCOUNT CONTEXT</span><ArrowRight size={14} /><strong>Prioritized GTM route</strong></div>
      <figcaption>Connect property records to the people and entities behind each hotel account.</figcaption>
    </figure>
  );
}
