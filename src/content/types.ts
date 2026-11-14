/** Shared shape for service pages (/data, /go-to-market, …) and use-case pages (/use-cases/*). */
export type DetailPageContent = {
  path: string;
  title: string;
  description: string;
  eyebrow: string;
  /** Rendered as `{lead}<br /><em>{emphasis}</em>`. */
  heading: { lead: string; emphasis: string };
  lede: string;
  sections: { number: string; title: string; copy: string; bullets: string[] }[];
  related: { label: string; href: string; description: string }[];
};

export type UseCaseContent = DetailPageContent & {
  slug: string;
  /** Featured audiences appear in navigation and get higher sitemap priority. */
  featured: boolean;
  /** Fills "…brief for your {contactAudience}." in the closing contact band. */
  contactAudience: string;
};
