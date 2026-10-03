import { getBadgeStyles } from '../utils';

describe('getBadgeStyles', () => {
  const prevItem = { statusPoints: 2000000 };
  const currentItem = { statusPoints: 20000000 };

  it('keeps the level being worked toward grey but fully visible', () => {
    expect(getBadgeStyles(false, false, 16732756, currentItem, prevItem))
      .toEqual({ filter: 'grayscale(1)', opacity: '1' });
  });

  it('shows a reached level in full colour', () => {
    expect(getBadgeStyles(false, true, 20000000, currentItem, prevItem))
      .toEqual({ filter: 'grayscale(0)', opacity: '1' });
  });

  it('keeps an unreached first level grey but fully visible', () => {
    expect(getBadgeStyles(true, false, 500, { statusPoints: 2000 }, undefined))
      .toEqual({ filter: 'grayscale(1)', opacity: '1' });
  });

  it('fades levels beyond the current goal', () => {
    expect(getBadgeStyles(false, false, 1000, currentItem, prevItem))
      .toEqual({ filter: 'grayscale(1)', opacity: '0.3' });
  });
});
