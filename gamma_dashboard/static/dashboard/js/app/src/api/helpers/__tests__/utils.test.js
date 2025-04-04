import {
  toCamelCase,
  toSnakeCase,
  convertKeysToCamelCase,
  convertKeysToSnakeCase,
  getCsrfToken,
  getDefaultHeaders,
} from '../utils';

describe('utils', () => {
  describe('toCamelCase', () => {
    it('should convert snake_case to camelCase', () => {
      expect(toCamelCase('hello_world')).toBe('helloWorld');
      expect(toCamelCase('user_first_name')).toBe('userFirstName');
      expect(toCamelCase('api_key')).toBe('apiKey');
    });

    it('should handle single word strings', () => {
      expect(toCamelCase('hello')).toBe('hello');
      expect(toCamelCase('world')).toBe('world');
    });

    it('should handle empty string', () => {
      expect(toCamelCase('')).toBe('');
    });
  });

  describe('toSnakeCase', () => {
    it('should convert camelCase to snake_case', () => {
      expect(toSnakeCase('helloWorld')).toBe('hello_world');
      expect(toSnakeCase('userFirstName')).toBe('user_first_name');
      expect(toSnakeCase('apiKey')).toBe('api_key');
    });

    it('should handle single word strings', () => {
      expect(toSnakeCase('hello')).toBe('hello');
      expect(toSnakeCase('world')).toBe('world');
    });

    it('should handle empty string', () => {
      expect(toSnakeCase('')).toBe('');
    });
  });

  describe('convertKeysToCamelCase', () => {
    it('should convert object keys to camelCase', () => {
      const input = {
        user_name: 'John',
        first_name: 'Doe',
        contact_info: {
          phone_number: '1234567890',
          email_address: 'john@example.com',
        },
      };

      const expected = {
        userName: 'John',
        firstName: 'Doe',
        contactInfo: {
          phoneNumber: '1234567890',
          emailAddress: 'john@example.com',
        },
      };

      expect(convertKeysToCamelCase(input)).toEqual(expected);
    });

    it('should handle arrays', () => {
      const input = [
        { user_name: 'John' },
        { user_name: 'Jane' },
      ];

      const expected = [
        { userName: 'John' },
        { userName: 'Jane' },
      ];

      expect(convertKeysToCamelCase(input)).toEqual(expected);
    });

    it('should preserve action key', () => {
      const input = {
        action: 'create',
        user_name: 'John',
      };

      const expected = {
        action: 'create',
        userName: 'John',
      };

      expect(convertKeysToCamelCase(input)).toEqual(expected);
    });

    it('should handle primitive values', () => {
      expect(convertKeysToCamelCase('hello')).toBe('hello');
      expect(convertKeysToCamelCase(123)).toBe(123);
      expect(convertKeysToCamelCase(null)).toBe(null);
      expect(convertKeysToCamelCase(undefined)).toBe(undefined);
    });

    it('should handle empty objects and arrays', () => {
      expect(convertKeysToCamelCase({})).toEqual({});
      expect(convertKeysToCamelCase([])).toEqual([]);
    });
  });

  describe('convertKeysToSnakeCase', () => {
    it('should convert object keys to snake_case', () => {
      const input = {
        userName: 'John',
        firstName: 'Doe',
        contactInfo: {
          phoneNumber: '1234567890',
          emailAddress: 'john@example.com',
        },
      };

      const expected = {
        user_name: 'John',
        first_name: 'Doe',
        contact_info: {
          phone_number: '1234567890',
          email_address: 'john@example.com',
        },
      };

      expect(convertKeysToSnakeCase(input)).toEqual(expected);
    });

    it('should handle arrays', () => {
      const input = [
        { userName: 'John' },
        { userName: 'Jane' },
      ];

      const expected = [
        { user_name: 'John' },
        { user_name: 'Jane' },
      ];

      expect(convertKeysToSnakeCase(input)).toEqual(expected);
    });

    it('should preserve action key', () => {
      const input = {
        action: 'create',
        userName: 'John',
      };

      const expected = {
        action: 'create',
        user_name: 'John',
      };

      expect(convertKeysToSnakeCase(input)).toEqual(expected);
    });

    it('should handle primitive values', () => {
      expect(convertKeysToSnakeCase('hello')).toBe('hello');
      expect(convertKeysToSnakeCase(123)).toBe(123);
      expect(convertKeysToSnakeCase(null)).toBe(null);
      expect(convertKeysToSnakeCase(undefined)).toBe(undefined);
    });

    it('should handle empty objects and arrays', () => {
      expect(convertKeysToSnakeCase({})).toEqual({});
      expect(convertKeysToSnakeCase([])).toEqual([]);
    });
  });

  describe('getCsrfToken', () => {
    beforeEach(() => {
      document.cookie = '';
    });

    it('should return undefined when no CSRF token is present', () => {
      expect(getCsrfToken()).toBeUndefined();
    });

    it('should return the CSRF token when present', () => {
      document.cookie = 'csrftoken=test_token';
      expect(getCsrfToken()).toBe('test_token');
    });

    it('should return the correct token when multiple cookies are present', () => {
      document.cookie = 'other_cookie=value; csrftoken=test_token; another_cookie=value';
      expect(getCsrfToken()).toBe('test_token');
    });
  });

  describe('getDefaultHeaders', () => {
    beforeEach(() => {
      document.cookie = '';
    });

    it('should return headers with Content-Type and CSRF token when token is present', () => {
      document.cookie = 'csrftoken=test_token';
      expect(getDefaultHeaders()).toEqual({
        'Content-Type': 'application/json',
        'X-CSRFToken': 'test_token',
      });
    });
  });
});
