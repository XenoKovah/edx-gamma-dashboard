function addPositionInTop10(listUsers) {
  return listUsers.map((user, index) => ({
    ...user,
    position: index + 1,
  }));
}

function findIndexByUserUid(listUsers, userUid) {
  return listUsers.findIndex(user => user.user_uid === userUid);
}

function addPositionInCompetitors(listUsers, userUid, rank) {
  const startIndex = rank - findIndexByUserUid(listUsers, userUid);
  return listUsers.map((user, index) => ({
    ...user,
    position: startIndex + index,
  }));
}

function getCookieByName(cookieName) {
  const cookies = document.cookie.split('; ');
  for (const cookie of cookies) {
    const [name, value] = cookie.split('=');
    if (name === cookieName) {
      return decodeURIComponent(value);
    }
  }
  return null;
}

export {
  addPositionInTop10,
  addPositionInCompetitors,
  findIndexByUserUid,
  getCookieByName,
};
