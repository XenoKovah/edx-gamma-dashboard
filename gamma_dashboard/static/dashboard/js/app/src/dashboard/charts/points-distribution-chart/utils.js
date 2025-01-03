/**
 * Prepares an array of events for charting from the given data object.
 */
export const prepareEvents = (data) => {
  const events = [];
  Object.entries(data).forEach(([key, value]) => {
    const points = typeof value.points === 'number' ? value.points : value;
    events.splice(value[0], 0, {
      name: value.title ?? key,
      value: points,
    });
  });
  return events;
};
