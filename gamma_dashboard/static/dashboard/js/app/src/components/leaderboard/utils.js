import { addPositionInCompetitors, addPositionInTop10 } from '../../utility/utils';

export const getLeaderboardTableProps = (data) => {
  const {
    top10, systemStatuses, rank, userUid, urlProfileImage, competitors,
  } = data;
  const profilesTop10 = addPositionInTop10(top10);
  const propsObj = {
    delimiter: null,
    rank,
    profiles: [],
    systemStatuses,
  };

  // The given delimiter is intended to separate the top 3 users
  // from the current user and their six closest competitors.
  const DELIMITER_POSITION_FOR_TOP_3 = 2;
  // This delimiter is intended to separate the first 9 users
  // from the current user who doesn't have a rank yet.
  const DELIMITER_POSITION_FOR_TOP_9 = 8;
  // there is a possibility that the total number of users will be less than 10.
  const delimiterPosition = profilesTop10.length < 10 ? profilesTop10.length - 1 : DELIMITER_POSITION_FOR_TOP_9;

  switch (true) {
    case top10.length === 0 && !userUid:
      // for the initial render
      break;
    case !rank: {
      // user is not ranked yet
      const profilesTop9 = profilesTop10.slice(0, 9);
      const currentUser = {
        user_uid: userUid,
        url_profile_image: urlProfileImage,
        signup_source: null,
        points: 0,
        badges: {},
        system_statuses: [],
        system_events: [],
        position: null,
      };
      propsObj.profiles = [...profilesTop9, currentUser];
      propsObj.delimiter = delimiterPosition >= 0 ? delimiterPosition : null;
      break;
    }
    case rank <= 10:
      // user in top 10
      propsObj.profiles = profilesTop10;
      break;
    default: {
      const profilesTop3 = profilesTop10.slice(0, 3);
      const competitorsList = addPositionInCompetitors(competitors, userUid, rank);
      propsObj.profiles = [...profilesTop3, ...competitorsList];
      propsObj.delimiter = DELIMITER_POSITION_FOR_TOP_3;
    }
  }
  return propsObj;
};
