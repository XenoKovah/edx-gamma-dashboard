import '@testing-library/jest-dom';
import { getUserStatus } from '../statusTools';

const emptyStatusMessage = 'No status so far';

describe('function getUserStatus', () => {
  it('test getting correct status from system_statuses', () => {
    const testSystemStatuses = [
      { title: 'Bronze', status_points: 10 },
      { title: 'Silver', status_points: 50 },
      { title: 'Gold', status_points: 100 },
    ];

    expect(getUserStatus(testSystemStatuses, 0, emptyStatusMessage)).toBe('No status so far');
    expect(getUserStatus(testSystemStatuses, 9, emptyStatusMessage)).toBe('No status so far');
    expect(getUserStatus(testSystemStatuses, 10, emptyStatusMessage)).toBe('Bronze');
    expect(getUserStatus(testSystemStatuses, 49, emptyStatusMessage)).toBe('Bronze');
    expect(getUserStatus(testSystemStatuses, 50, emptyStatusMessage)).toBe('Silver');
    expect(getUserStatus(testSystemStatuses, 99, emptyStatusMessage)).toBe('Silver');
    expect(getUserStatus(testSystemStatuses, 100, emptyStatusMessage)).toBe('Gold');
    expect(getUserStatus(testSystemStatuses, 2000, emptyStatusMessage)).toBe('Gold');
  });

  it('test getting status if no system_statuses', () => {
    expect(getUserStatus([], 0, emptyStatusMessage)).toBe('No status so far');
    expect(getUserStatus(null, 100, emptyStatusMessage)).toBe('No status so far');
    expect(getUserStatus(undefined, 999, emptyStatusMessage)).toBe('No status so far');
  });

  it('test getting status from one system status only', () => {
    const testSystemStatuses = [{ title: 'Bronze', status_points: 10 }];

    expect(getUserStatus(testSystemStatuses, 0, emptyStatusMessage)).toBe('No status so far');
    expect(getUserStatus(testSystemStatuses, 9, emptyStatusMessage)).toBe('No status so far');
    expect(getUserStatus(testSystemStatuses, 10, emptyStatusMessage)).toBe('Bronze');
    expect(getUserStatus(testSystemStatuses, 99999, emptyStatusMessage)).toBe('Bronze');
  });
});
