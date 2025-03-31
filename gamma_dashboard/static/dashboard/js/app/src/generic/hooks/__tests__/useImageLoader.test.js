import { renderHook } from '@testing-library/react-hooks';

import { useImageLoader } from '..';

describe('useImageLoader', () => {
  const imageUrl = 'https://example.com/image.jpg';
  const fallbackUrl = 'https://example.com/fallback.jpg';
  const brokenUrl = 'https://example.com/broken.jpg';

  let originalImage;

  beforeAll(() => {
    originalImage = global.Image;

    global.Image = class {
      constructor() {
        // eslint-disable-next-line no-underscore-dangle
        this._src = '';
        this.onload = null;
        this.onerror = null;
      }

      set src(value) {
        // eslint-disable-next-line no-underscore-dangle
        this._src = value;
        setTimeout(() => {
          if (value === imageUrl) {
            // eslint-disable-next-line no-unused-expressions
            this.onload && this.onload();
          } else if (value === brokenUrl) {
            // eslint-disable-next-line no-unused-expressions
            this.onerror && this.onerror();
          }
        }, 0);
      }

      get src() {
        // eslint-disable-next-line no-underscore-dangle
        return this._src;
      }
    };
  });

  afterAll(() => {
    global.Image = originalImage;
  });

  it('should return fallback when no imageUrl is provided', () => {
    const { result } = renderHook(() => useImageLoader(null, fallbackUrl));
    expect(result.current).toBe(fallbackUrl);
  });

  it('should load image and return imageUrl if successful', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useImageLoader(imageUrl, fallbackUrl));

    expect(result.current).toBe(fallbackUrl);

    await waitForNextUpdate();

    expect(result.current).toBe(imageUrl);
  });
});
