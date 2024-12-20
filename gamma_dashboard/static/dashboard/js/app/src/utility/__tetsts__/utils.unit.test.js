import '@testing-library/jest-dom';
import { addPositionInCompetitors, addPositionInTop10, findIndexByUserUid } from '../utils';

describe('addPositionInCompetitors', () => {
  it('should correctly add positions to competitors list', () => {
    const listUsers = [
      { user_uid: 'user1' },
      { user_uid: 'user2' },
      { user_uid: 'user3' },
    ];
    const userUid = 'user2';
    const rank = 235;
    const expectedListUsers = [
      { user_uid: 'user1', position: 234 },
      { user_uid: 'user2', position: 235 },
      { user_uid: 'user3', position: 236 },
    ];

    const result = addPositionInCompetitors(listUsers, userUid, rank);

    expect(result).toEqual(expectedListUsers);
  });
});

describe('findIndexByUserUid', () => {
  it('should return the correct index of the user with the specified userUid', () => {
    const listUsers = [
      { user_uid: 'user1' },
      { user_uid: 'user2' },
      { user_uid: 'user3' },
    ];
    const userUid = 'user2';
    const expectedIndex = 1;

    const result = findIndexByUserUid(listUsers, userUid);

    expect(result).toEqual(expectedIndex);
  });

  it('should return -1 if no user with the specified userUid is found', () => {
    const listUsers = [
      { user_uid: 'user1' },
      { user_uid: 'user2' },
      { user_uid: 'user3' },
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
});
