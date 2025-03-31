import { getActualImageUrl, isIdle } from '../utils';

describe('getActualImageUrl', () => {
  const fallback = 'https://fallback.url/image.png';
  const baseUrl = 'https://gamma.admin/';

  it('returns fallback if avatarSetData is null', () => {
    expect(getActualImageUrl(null, true, baseUrl, fallback)).toBe(fallback);
  });

  it('returns fallback if avatar image is missing in a selectable set', () => {
    const avatarSet = { avatars: [{ image: null }] };
    expect(getActualImageUrl(avatarSet, true, baseUrl, fallback)).toBe(fallback);
  });

  it('returns full URL using last avatar image if set is selectable', () => {
    const avatarSet = {
      avatars: [
        { image: '/images/1.png' },
        { image: '/images/2.png' },
      ],
    };
    expect(getActualImageUrl(avatarSet, true, baseUrl, fallback)).toBe(`${baseUrl}/images/2.png`);
  });

  it('returns full URL using main image if set is not selectable', () => {
    const avatarSet = {
      image: '/images/main.png',
      avatars: [{ image: '/images/ignored.png' }],
    };
    expect(getActualImageUrl(avatarSet, false, baseUrl, fallback)).toBe(`${baseUrl}/images/main.png`);
  });

  it('returns fallback if no avatars and no main image', () => {
    const avatarSet = {};
    expect(getActualImageUrl(avatarSet, true, baseUrl, fallback)).toBe(fallback);
  });

  it('returns absolute avatar image as-is if set is selectable', () => {
    const avatarSet = {
      avatars: [
        { image: 'https://cdn.example.com/images/1.png' },
        { image: 'https://cdn.example.com/images/2.png' },
      ],
    };
    expect(getActualImageUrl(avatarSet, true, baseUrl, fallback)).toBe('https://cdn.example.com/images/2.png');
  });

  it('returns absolute main image as-is if set is not selectable', () => {
    const avatarSet = {
      image: 'https://cdn.example.com/images/main.png',
      avatars: [{ image: 'https://cdn.example.com/images/ignored.png' }],
    };
    expect(getActualImageUrl(avatarSet, false, baseUrl, fallback)).toBe('https://cdn.example.com/images/main.png');
  });
});

describe('isIdle', () => {
  it('returns true if all flags are false', () => {
    expect(isIdle({ isLoading: false, isSuccess: false, isError: false })).toBe(true);
  });

  it('returns false if isLoading is true', () => {
    expect(isIdle({ isLoading: true, isSuccess: false, isError: false })).toBe(false);
  });

  it('returns false if isSuccess is true', () => {
    expect(isIdle({ isLoading: false, isSuccess: true, isError: false })).toBe(false);
  });

  it('returns false if isError is true', () => {
    expect(isIdle({ isLoading: false, isSuccess: false, isError: true })).toBe(false);
  });

  it('returns false if multiple flags are true', () => {
    expect(isIdle({ isLoading: true, isSuccess: true, isError: true })).toBe(false);
  });
});
