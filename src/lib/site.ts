export const SITE_ORIGIN = 'https://hotelgtm.com';
export const SITE_NAME = 'HotelGTM';
export const CONTACT_EMAIL = 'hello@alderhospitality.com';

export const DEFAULT_TITLE = 'HotelGTM | Hotel Ownership Intelligence & B2B GTM';
export const DEFAULT_DESCRIPTION =
  'Reach hotel owners, management companies and executive decision-makers with verified hospitality data, tailored GTM playbooks and pipeline execution.';

/** Builds a mailto link; body lines are joined with newlines and URI-encoded. */
export function mailto(subject: string, body?: string): string {
  const params = [`subject=${encodeURIComponent(subject)}`];
  if (body) params.push(`body=${encodeURIComponent(body)}`);
  return `mailto:${CONTACT_EMAIL}?${params.join('&')}`;
}
