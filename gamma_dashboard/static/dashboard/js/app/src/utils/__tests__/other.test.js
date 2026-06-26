import '@testing-library/jest-dom';
import {
  addPositionInCompetitors,
  addPositionInTop10,
  findIndexByUserUid,
  getCookieByName,
} from '..';

describe('addPositionInCompetitors', () => {
  it('should correctly add positions to competitors list', () => {
    const listUsers = [
      { userUid: 'user1' },
      { userUid: 'user2' },
      { userUid: 'user3' },
    ];
    const userUid = 'user2';
    const rank = 235;
    const expectedListUsers = [
      { userUid: 'user1', position: 234 },
      { userUid: 'user2', position: 235 },
      { userUid: 'user3', position: 236 },
    ];

    const result = addPositionInCompetitors(listUsers, userUid, rank);

    expect(result).toEqual(expectedListUsers);
  });

  it('shares a position for competitors tied with the reference user, no gaps (dense)', () => {
    // Head competitors are always strictly above the reference user (the backend
    // builds the window that way); ties can only appear at/below the reference user.
    const listUsers = [
      { userUid: 'a', points: 900 },
      { userUid: 'b', points: 850 },
      { userUid: 'me', points: 800 },
      { userUid: 'd', points: 800 },
      { userUid: 'e', points: 750 },
    ];

    const result = addPositionInCompetitors(listUsers, 'me', 103);

    // me is anchored at its rank (103); d ties me so it shares 103; e is the next
    // distinct value so it is 104 (dense — no gap).
    expect(result.map((user) => user.position)).toEqual([101, 102, 103, 103, 104]);
  });
});

describe('findIndexByUserUid', () => {
  it('should return the correct index of the user with the specified userUid', () => {
    const listUsers = [
      { userUid: 'user1' },
      { userUid: 'user2' },
      { userUid: 'user3' },
    ];
    const userUid = 'user2';
    const expectedIndex = 1;

    const result = findIndexByUserUid(listUsers, userUid);

    expect(result).toEqual(expectedIndex);
  });

  it('should return -1 if no user with the specified userUid is found', () => {
    const listUsers = [
      { userUid: 'user1' },
      { userUid: 'user2' },
      { userUid: 'user3' },
    ];
    const userUid = 'user5';
    const expectedIndex = -1;

    const result = findIndexByUserUid(listUsers, userUid);

    expect(result).toEqual(expectedIndex);
  });
});

describe('addPositionInTop10', () => {
  it('should add position to each user in the list', () => {
    const listUsers = [
      { name: 'User0' },
      { name: 'User1' },
      { name: 'User2' },
      { name: 'User3' },
    ];
    const expectedListUsers = [
      { name: 'User0', position: 1 },
      { name: 'User1', position: 2 },
      { name: 'User2', position: 3 },
      { name: 'User3', position: 4 },
    ];

    const result = addPositionInTop10(listUsers);

    expect(result).toEqual(expectedListUsers);
  });

  it('gives users tied on points the same position with no gaps (dense ranking)', () => {
    const listUsers = [
      { userUid: 'a', points: 570 },
      { userUid: 'b', points: 570 },
      { userUid: 'c', points: 530 },
      { userUid: 'd', points: 500 },
      { userUid: 'e', points: 500 },
    ];

    const result = addPositionInTop10(listUsers);

    // Tied scores share a rank; the next distinct score is the next number (no gap).
    expect(result.map((user) => user.position)).toEqual([1, 1, 2, 3, 3]);
  });

  it('ranks ties by a custom value accessor (e.g. progress percentage)', () => {
    const listUsers = [
      { userUid: 'a', progressPercent: 50, points: 999 },
      { userUid: 'b', progressPercent: 50, points: 1 },
      { userUid: 'c', progressPercent: 10, points: 500 },
    ];

    const result = addPositionInTop10(listUsers, (user) => user.progressPercent);

    // a and b share a position because they have the same percentage, despite
    // differing points; the points are ignored by this accessor.
    expect(result.map((user) => user.position)).toEqual([1, 1, 2]);
  });
});

describe('getCookieByName', () => {
  beforeEach(() => {
    Object.defineProperty(document, 'cookie', {
      writable: true,
      value: '',
    });
  });

  it('should return the cookie value if the cookie exists', () => {
    document.cookie = 'username=JohnDoe';
    expect(getCookieByName('username')).toBe('JohnDoe');
  });

  it('should return null if the cookie is not found', () => {
    document.cookie = 'username=JohnDoe';
    expect(getCookieByName('session')).toBeNull();
  });

  it('should correctly handle multiple cookies', () => {
    document.cookie = 'username=JohnDoe; session=abc123';
    expect(getCookieByName('username')).toBe('JohnDoe');
    expect(getCookieByName('session')).toBe('abc123');
  });

  it('should decode cookie values', () => {
    document.cookie = 'data=Hello%20World';
    expect(getCookieByName('data')).toBe('Hello World');
  });

  it('should return null if no cookies are set', () => {
    expect(getCookieByName('anyCookie')).toBeNull();
  });

  it('should correctly handle cookies with similar names', () => {
    document.cookie = 'user=John; username=Jane';
    expect(getCookieByName('user')).toBe('John');
    expect(getCookieByName('username')).toBe('Jane');
  });
});
