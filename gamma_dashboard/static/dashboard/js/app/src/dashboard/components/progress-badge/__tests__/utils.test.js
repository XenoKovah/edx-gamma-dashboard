import { calculateStatusProgress } from '../utils';

describe('calculateStatusProgress', () => {
  it('computes a floored percentage', () => {
    expect(calculateStatusProgress(125, 250)).toBe(50);
  });

  it('clamps negative totals (penalty badges) to 0', () => {
    expect(calculateStatusProgress(-20000, 250)).toBe(0);
  });

  it('clamps overshoot to 100', () => {
    expect(calculateStatusProgress(500, 250)).toBe(100);
  });

  it('returns 0 when the status has no point threshold', () => {
    expect(calculateStatusProgress(10, 0)).toBe(0);
    expect(calculateStatusProgress(10, undefined)).toBe(0);
  });
});
