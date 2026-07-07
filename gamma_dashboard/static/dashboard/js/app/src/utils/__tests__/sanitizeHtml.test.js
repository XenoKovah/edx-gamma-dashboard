import { sanitizeDescriptionHtml } from '../sanitizeHtml';

describe('sanitizeDescriptionHtml', () => {
  it('passes plain text through unchanged', () => {
    expect(sanitizeDescriptionHtml('Just plain text.')).toBe('Just plain text.');
  });

  it('keeps a safe anchor and forces target/rel', () => {
    const out = sanitizeDescriptionHtml(
      'Completed the course <a href="https://ost2.fyi/Arch1001">Architecture 1001</a>',
    );
    expect(out).toContain('href="https://ost2.fyi/Arch1001"');
    expect(out).toContain('target="_blank"');
    expect(out).toContain('rel="noopener noreferrer"');
    expect(out).toContain('Architecture 1001');
  });

  it('strips script tags but keeps surrounding text', () => {
    const out = sanitizeDescriptionHtml('Hi<script>alert(1)</script> there');
    expect(out).not.toContain('<script');
    expect(out).toContain('Hi');
    expect(out).toContain('there');
  });

  it('removes javascript: and other unsafe hrefs', () => {
    const out = sanitizeDescriptionHtml('<a href="javascript:alert(1)">x</a>');
    expect(out).not.toContain('javascript:');
  });

  it('handles empty/nullish input', () => {
    expect(sanitizeDescriptionHtml('')).toBe('');
    expect(sanitizeDescriptionHtml(undefined)).toBe('');
    expect(sanitizeDescriptionHtml(null)).toBe('');
  });
});
