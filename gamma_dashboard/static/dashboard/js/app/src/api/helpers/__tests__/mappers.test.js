import {
  mapStatusTitles,
  mapEventTitles,
  mapStatusItems,
  mapKeysToCamelCase,
  createBadgeMap,
} from '../mappers';

describe('mappers', () => {
  describe('mapStatusTitles', () => {
    it('should map status slugs to titles', () => {
      const systemStatuses = [
        { slug: 'status1', title: 'Status One' },
        { slug: 'status2', title: 'Status Two' },
      ];

      const result = mapStatusTitles(systemStatuses);
      expect(result).toEqual({
        status1: 'Status One',
        status2: 'Status Two',
      });
    });

    it('should handle empty array', () => {
      const result = mapStatusTitles([]);
      expect(result).toEqual({});
    });

    it('should handle undefined input', () => {
      const result = mapStatusTitles(undefined);
      expect(result).toEqual({});
    });
  });

  describe('mapEventTitles', () => {
    it('should map event types to titles', () => {
      const systemEvents = [
        { event_type: 'event1', title: 'Event One' },
        { event_type: 'event2', title: 'Event Two' },
      ];

      const result = mapEventTitles(systemEvents);
      expect(result).toEqual({
        event1: 'Event One',
        event2: 'Event Two',
      });
    });

    it('should handle empty array', () => {
      const result = mapEventTitles([]);
      expect(result).toEqual({});
    });

    it('should handle undefined input', () => {
      const result = mapEventTitles(undefined);
      expect(result).toEqual({});
    });
  });

  describe('mapStatusItems', () => {
    it('should map status items with camelCase keys', () => {
      const statuses = [
        { status_points: 100, title: 'Status One' },
        { status_points: 200, title: 'Status Two' },
      ];
      const points = 150;

      const result = mapStatusItems(statuses, points);
      expect(result).toEqual([
        { statusPoints: 100, points: 150, title: 'Status One' },
        { statusPoints: 200, points: 150, title: 'Status Two' },
      ]);
    });

    it('should preserve additional properties', () => {
      const statuses = [
        { status_points: 100, title: 'Status One', extra: 'value' },
      ];
      const points = 150;

      const result = mapStatusItems(statuses, points);
      expect(result).toEqual([
        {
          statusPoints: 100, points: 150, title: 'Status One', extra: 'value',
        },
      ]);
    });

    it('should handle empty array', () => {
      const result = mapStatusItems([], 150);
      expect(result).toEqual([]);
    });

    it('should handle undefined input', () => {
      const result = mapStatusItems(undefined, 150);
      expect(result).toEqual([]);
    });
  });

  describe('mapKeysToCamelCase', () => {
    it('should convert snake_case keys to camelCase', () => {
      const dataObjects = {
        user_info: { first_name: 'John', last_name: 'Doe' },
        badge_data: { badge_id: 1, badge_name: 'Test Badge' },
      };

      const result = mapKeysToCamelCase(dataObjects);
      expect(result).toEqual({
        user_info: { firstName: 'John', lastName: 'Doe' },
        badge_data: { badgeId: 1, badgeName: 'Test Badge' },
      });
    });

    it('should handle empty object', () => {
      const result = mapKeysToCamelCase({});
      expect(result).toEqual({});
    });

    it('should handle undefined input', () => {
      const result = mapKeysToCamelCase(undefined);
      expect(result).toEqual({});
    });
  });

  describe('createBadgeMap', () => {
    it('should create a map of badges keyed by slug', () => {
      const badges = [
        { slug: 'badge1', title: 'Badge One' },
        { slug: 'badge2', title: 'Badge Two' },
      ];

      const result = createBadgeMap(badges);
      expect(result).toBeInstanceOf(Map);
      expect(result.get('badge1')).toEqual({ slug: 'badge1', title: 'Badge One' });
      expect(result.get('badge2')).toEqual({ slug: 'badge2', title: 'Badge Two' });
    });

    it('should handle empty array', () => {
      const result = createBadgeMap([]);
      expect(result).toBeInstanceOf(Map);
      expect(result.size).toBe(0);
    });

    it('should handle undefined input', () => {
      const result = createBadgeMap(undefined);
      expect(result).toBeInstanceOf(Map);
      expect(result.size).toBe(0);
    });

    it('should handle badges with duplicate slugs', () => {
      const badges = [
        { slug: 'badge1', title: 'Badge One' },
        { slug: 'badge1', title: 'Duplicate Badge' },
      ];

      const result = createBadgeMap(badges);
      expect(result.get('badge1')).toEqual({ slug: 'badge1', title: 'Duplicate Badge' });
    });
  });
});
