import '@testing-library/jest-dom';

import { buildURL } from '../urlTools';

const relativeUrl = '/some-relative-url';

describe('function buildURL', () => {
  const baseUrl = 'http://base-url';
  window.GAMIFICATION_BASE_URL = baseUrl;

  it('test get original url if it starts with http://', () => {
    const url = 'http://some-test-absolute-url';
    expect(buildURL(url)).toBe(url);
  });

  it('test get original url if it starts with https://', () => {
    const url = 'https://other-test-absolute-url';
    expect(buildURL(url)).toBe(url);
  });

  it('test building absolute url from relative', () => {
    expect(buildURL(relativeUrl)).toBe(`${baseUrl}${relativeUrl}`);
  });

  it('test building absolute url from relative - start and trailing slash at both parts', () => {
    expect(buildURL(relativeUrl)).toBe(`${baseUrl}${relativeUrl}`);
  });

  it('test building absolute url from relative  - no start and trailing slash at both parts', () => {
    expect(buildURL(relativeUrl)).toBe(`${baseUrl}${relativeUrl}`);
  });

  it('test logs a console message if window.GAMIFICATION_BASE_URL is not set', () => {
    const url = undefined;
    window.GAMIFICATION_BASE_URL = url;
    const messageLog = 'window.GAMIFICATION_BASE_URL is not set';
    const consoleSpy = jest.spyOn(console, 'log');
    buildURL(url);

    expect(consoleSpy).toHaveBeenCalledWith(messageLog);
  });
});
