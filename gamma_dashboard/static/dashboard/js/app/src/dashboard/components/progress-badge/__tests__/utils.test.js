import { calculateBadgeProgress, getTotalProgress } from '../utils';

describe('calculateBadgeProgress', () => {
  it('returns 0 for empty or nullish progress', () => {
    expect(calculateBadgeProgress({})).toBe(0);
    expect(calculateBadgeProgress(null)).toBe(0);
    expect(calculateBadgeProgress(undefined)).toBe(0);
  });

  it('averages per-event progress for the goal-keyed object shape', () => {
    const progress = {
      stop_video: { count: 5, goal: { count: 10 } },
      problem_check: { count: 0, goal: { count: 10 } },
    };
    // 50% of one event + 0% of the other, split evenly across two events.
    expect(calculateBadgeProgress(progress)).toBe(25);
  });

  it('caps each event at its goal', () => {
    const progress = {
      stop_video: { count: 30, goal: { count: 10 } },
      problem_check: { count: 0, goal: { count: 10 } },
    };
    expect(calculateBadgeProgress(progress)).toBe(50);
  });

  it('never returns NaN for the raw array-shaped progress of a completed badge', () => {
    // Completed badges carry achievement progress as an array of
    // `{ events, is_achieved }` entries, which have no top-level `goal`.
    const arrayShaped = [{ events: { edx_x: { goal: 1, count: 1 } }, is_achieved: true }];
    const result = calculateBadgeProgress(arrayShaped);
    expect(Number.isNaN(result)).toBe(false);
    expect(result).toBe(0);
  });
});

describe('getTotalProgress', () => {
  it('hides the progress ring and reports 100 for a completed badge, even with array-shaped progress', () => {
    const data = {
      done: true,
      progress: [{ events: { edx_x: { goal: 1, count: 1 } }, is_achieved: true }],
    };
    const { showProgressRing, totalProgressPercent } = getTotalProgress(data);

    expect(showProgressRing).toBe(false);
    expect(totalProgressPercent).toBe(100);
    expect(Number.isNaN(totalProgressPercent)).toBe(false);
  });

  it('shows the progress ring with a numeric percent for an incomplete badge', () => {
    const data = {
      done: false,
      progress: {
        stop_video: { count: 5, goal: { count: 10 } },
      },
    };
    const { showProgressRing, totalProgressPercent } = getTotalProgress(data);

    expect(showProgressRing).toBe(true);
    // Single event at 5/10 -> 50%.
    expect(totalProgressPercent).toBe(50);
  });

  it('drives the ring off the student/status point ratio for statuses', () => {
    expect(getTotalProgress({ isActive: false, points: 50, statusPoints: 100 }))
      .toEqual({ showProgressRing: true, totalProgressPercent: 50 });
  });

  it('returns no ring and zero progress for unrecognised data', () => {
    expect(getTotalProgress({})).toEqual({ showProgressRing: false, totalProgressPercent: 0 });
  });
});
