import '@testing-library/jest-dom';
import { getUserStatus } from '../statusTools';

describe('function getUserStatus', () => {
  it('test getting correct status from system_statuses', () => {
    const testSystemStatuses = [
      { title: 'Bronze', status_points: 10 },
      { title: 'Silver', status_points: 50 },
      { title: 'Gold', status_points: 100 },
    ];

    expect(getUserStatus(testSystemStatuses, 0)).toBe('No status so far');
    expect(getUserStatus(testSystemStatuses, 9)).toBe('No status so far');
    expect(getUserStatus(testSystemStatuses, 10)).toBe('Bronze');
    expect(getUserStatus(testSystemStatuses, 49)).toBe('Bronze');
    expect(getUserStatus(testSystemStatuses, 50)).toBe('Silver');
    expect(getUserStatus(testSystemStatuses, 99)).toBe('Silver');
    expect(getUserStatus(testSystemStatuses, 100)).toBe('Gold');
    expect(getUserStatus(testSystemStatuses, 2000)).toBe('Gold');
  });

  it('test getting status if no system_statuses', () => {
    expect(getUserStatus([], 0)).toBe('No status so far');
    expect(getUserStatus(null, 100)).toBe('No status so far');
    expect(getUserStatus(undefined, 999)).toBe('No status so far');
  });

  it('test getting status from one system status only', () => {
    const testSystemStatuses = [{ title: 'Bronze', status_points: 10 }];

    expect(getUserStatus(testSystemStatuses, 0)).toBe('No status so far');
    expect(getUserStatus(testSystemStatuses, 9)).toBe('No status so far');
    expect(getUserStatus(testSystemStatuses, 10)).toBe('Bronze');
    expect(getUserStatus(testSystemStatuses, 99999)).toBe('Bronze');
  });
});
