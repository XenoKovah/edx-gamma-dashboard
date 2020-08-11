import '@testing-library/jest-dom';
import { buildURL } from '../urlTools';

describe('function buildURL', () => {

    it('test get original url if it starts with http://', () => {
        const url = 'http://some-test-absolute-url';
        expect(buildURL(url)).toBe(url);
    });

    it('test get original url if it starts with https://', () => {
        const url = 'https://other-test-absolute-url';
        expect(buildURL(url)).toBe(url);
    });

    it('test building absolute url from relative', () => {
        const base_url = 'http://base-url';
        window.GAMIFICATION_BASE_URL = base_url;
        const url = '/some-relative-url';
        expect(buildURL(url)).toBe(`${base_url}${url}`);
    });
});