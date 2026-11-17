/** Which illustrative vignette sits beside each numbered section of a service or use-case page. */

export type VignetteKind =
  | 'scope'
  | 'ownership'
  | 'contacts'
  | 'deliverable'
  | 'segments'
  | 'accounts'
  | 'sequence'
  | 'board'
  | 'engine'
  | 'cadence'
  | 'learn';

type PagePlan = {
  /** One vignette per section, in order. */
  kinds: VignetteKind[];
  /** Index into `ownershipSamples`, so neighbouring pages show different demo records. */
  sample: number;
};

const plans: Record<string, PagePlan> = {
  '/data': { kinds: ['scope', 'ownership', 'contacts', 'deliverable'], sample: 0 },
  '/go-to-market': { kinds: ['segments', 'accounts', 'sequence', 'learn'], sample: 1 },
  '/pipeline-execution': { kinds: ['board', 'engine', 'sequence', 'cadence'], sample: 2 },
  '/use-cases/property-management-asset-firms': { kinds: ['scope', 'contacts', 'board'], sample: 0 },
  '/use-cases/hospitality-tech-saas': { kinds: ['scope', 'contacts', 'sequence'], sample: 1 },
  '/use-cases/cre-investment': { kinds: ['scope', 'ownership', 'contacts'], sample: 2 },
  '/use-cases/vendors-infrastructure': { kinds: ['accounts', 'contacts', 'board'], sample: 2 },
  '/use-cases/suppliers': { kinds: ['scope', 'ownership', 'sequence'], sample: 1 },
  '/use-cases/investors': { kinds: ['scope', 'ownership', 'accounts'], sample: 0 },
  '/use-cases/operators': { kinds: ['ownership', 'accounts', 'contacts'], sample: 1 },
};

/** Used when a page is added to the content files without a plan here. */
const fallback: PagePlan = { kinds: ['scope', 'ownership', 'contacts', 'deliverable'], sample: 0 };

export const vignettePlan = (path: string): PagePlan => plans[path] ?? fallback;
