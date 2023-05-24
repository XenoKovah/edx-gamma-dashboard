function addPositionInTop10(listUsers) {
    return listUsers.map((user, index) => {
        user.position = index + 1;
        return user;
    });
};

function findIndexByUserUid(listUsers, userUid) {
    return listUsers.findIndex(user => user.user_uid === userUid);
};

function addPositionInCompetitors(listUsers, userUid, rank) {
    const startIndex = rank - findIndexByUserUid(listUsers, userUid);
    return listUsers.map((user, index) => {
        user.position = startIndex + index;
        return user;
    });
};

export {addPositionInTop10, addPositionInCompetitors, findIndexByUserUid};
