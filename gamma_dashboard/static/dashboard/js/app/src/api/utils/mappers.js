/**
 * Extracts a mapping of status slugs to titles.
 *
 * @param {Array<{ slug: string, title: string }>} systemStatuses - List of system statuses.
 * @returns {Object<string, string>} - An object mapping status slugs to their titles.
 */
export const mapStatusTitles = (systemStatuses) => Object.fromEntries(
  systemStatuses.map(({ slug, title }) => [slug, title]),
);

/**
 * Extracts a mapping of event types to titles.
 *
 * @param {Array<{ event_type: string, title: string }>} systemEvents - List of system events.
 * @returns {Object<string, string>} - An object mapping event types to their titles.
 */
export const mapEventTitles = (systemEvents) => Object.fromEntries(
  systemEvents.map(({ event_type, title }) => [event_type, title]), // eslint-disable-line camelcase
);
