export const SITE_ORIGIN = 'https://hotelgtm.com';
export const SITE_NAME = 'HotelGTM';
export const CONTACT_EMAIL = 'hello@alderhospitality.com';

export const DEFAULT_TITLE = 'HotelGTM | Hotel Ownership Data & B2B Go-to-Market';
export const DEFAULT_DESCRIPTION =
  'Hotel ownership data, management-company mapping and go-to-market support for B2B teams selling into hospitality. Know who owns, runs and signs.';

/** Builds a mailto link; body lines are joined with newlines and URI-encoded. */
export function mailto(subject: string, body?: string): string {
  const params = [`subject=${encodeURIComponent(subject)}`];
  if (body) params.push(`body=${encodeURIComponent(body)}`);
  return `mailto:${CONTACT_EMAIL}?${params.join('&')}`;
}
