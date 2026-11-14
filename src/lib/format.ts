const longDate = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

/** Formats an ISO date (YYYY-MM-DD) as e.g. "21 October 2026". */
export const formatLongDate = (isoDate: string): string => longDate.format(new Date(`${isoDate}T00:00:00Z`));
