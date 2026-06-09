import { addPositionInCompetitors, addPositionInTop10 } from '../utils';

/**
 * Build the LeaderboardTable props for the per-badge (filtered) leaderboard page.
 *
 * Unlike the personalized leaderboard, the badge leaderboard is a flat list of
 * up to the top 100 earners already ranked by points, so positions are simply
 * 1..N with no competitor delimiter. The current user (when among the earners)
 * is highlighted via the `rank` returned by the backend.
 *
 * @param {Object} data - The badge leaderboard response.
 * @param {Array<Object>} [data.top10] - The ranked badge earners.
 * @param {number|null} [data.rank] - The requesting user's rank among earners.
 * @returns {{ rank: number, profiles: Array<Object>, delimiter: null }}
 */
export const getBadgeLeaderboardTableProps = (data = {}) => {
  const { top10 = [], rank = null } = data;
  return {
    rank: rank || 0,
    profiles: addPositionInTop10(top10),
    delimiter: null,
  };
};

/**
 * Build the LeaderboardTable props for the "In progress" section of the per-badge
 * page: users with non-zero progress who have not completed the badge yet, already
 * ranked by their progress percentage (descending). Positions are 1..N and the
 * requesting user (when present) is highlighted via `inProgressRank`.
 *
 * @param {Object} data - The badge leaderboard response.
 * @param {Array<Object>} [data.inProgress] - The ranked in-progress members.
 * @param {number|null} [data.inProgressRank] - The requesting user's rank among them.
 * @returns {{ rank: number, profiles: Array<Object>, delimiter: null }}
 */
export const getBadgeInProgressProps = (data = {}) => {
  const { inProgress = [], inProgressRank = null } = data;
  return {
    rank: inProgressRank || 0,
    profiles: addPositionInTop10(inProgress),
    delimiter: null,
  };
};

export const getLeaderboardTableProps = (data) => {
  const {
    top10, systemStatuses, rank, userUid, urlProfileImage, profileUrl, competitors,
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
    case top10.length === 0 || !userUid:
      // for the initial render
      propsObj.profiles = [];
      break;
    case !rank: {
      // user is not ranked yet
      const profilesTop9 = profilesTop10.slice(0, 9);
      const currentUser = {
        userUid,
        urlProfileImage,
        profileUrl,
        signupSource: null,
        points: 0,
        badges: {},
        systemStatuses: [],
        systemEvents: [],
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
