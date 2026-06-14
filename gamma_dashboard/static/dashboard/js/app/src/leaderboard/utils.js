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

// The backend returns up to the top 100 ranked members (the response key is
// still `top10` for back-compatibility). Mirror that limit here so a user
// ranked anywhere in the top 100 sees the full list, and users below it see
// the whole top 100 followed by their own competitor window.
const TOP_MEMBERS_LIMIT = 100;

export const getLeaderboardTableProps = (data) => {
  const {
    top10, systemStatuses, rank, userUid, urlProfileImage, profileUrl, competitors,
  } = data;
  const profilesTop = addPositionInTop10(top10);
  const propsObj = {
    delimiter: null,
    rank,
    profiles: [],
    systemStatuses,
  };

  // Delimiter marks the gap after the last top-list member, before the current
  // user (when unranked) or their competitor window (when ranked below the list).
  const topDelimiter = profilesTop.length - 1;

  switch (true) {
    case top10.length === 0 || !userUid:
      // for the initial render
      propsObj.profiles = [];
      break;
    case !rank: {
      // user is not ranked yet: show the full top list, then the current user.
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
      propsObj.profiles = [...profilesTop, currentUser];
      propsObj.delimiter = topDelimiter >= 0 ? topDelimiter : null;
      break;
    }
    case rank <= TOP_MEMBERS_LIMIT:
      // user within the top list
      propsObj.profiles = profilesTop;
      break;
    default: {
      // user below the top list: show the full top list, then their competitors.
      const competitorsList = addPositionInCompetitors(competitors, userUid, rank);
      propsObj.profiles = [...profilesTop, ...competitorsList];
      propsObj.delimiter = topDelimiter >= 0 ? topDelimiter : null;
    }
  }
  return propsObj;
};

/**
 * Convert a 2-letter ISO 3166-1 country code to its flag emoji.
 *
 * Flag emoji are a pair of Unicode "regional indicator" symbols
 * (U+1F1E6..U+1F1FF), one per letter (A -> U+1F1E6). Returns '' for a
 * missing/invalid code so a learner without a public country simply gets no flag.
 *
 * @param {string} code - e.g. 'JP'
 * @returns {string} the flag emoji, or '' when the code is missing/invalid.
 */
export const countryCodeToFlag = (code) => {
  if (typeof code !== 'string') {
    return '';
  }
  const cc = code.trim().toUpperCase();
  if (!/^[A-Z]{2}$/.test(cc)) {
    return '';
  }
  return String.fromCodePoint(...[...cc].map((char) => 0x1F1E6 + char.charCodeAt(0) - 65));
};
