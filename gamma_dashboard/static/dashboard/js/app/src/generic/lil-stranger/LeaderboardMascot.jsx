import React from 'react';

import LilStrangerLink from './LilStrangerLink';
import championsImage from '../../assets/images/leaderboard-champions.webp';

/** The podium picture shown, centered, above the heading of every leaderboard page. */
const LeaderboardMascot = () => (
  <div className="leaderboard-mascot" data-testid="leaderboard-mascot">
    <LilStrangerLink>
      <img
        className="leaderboard-mascot-image"
        src={championsImage}
        alt="WE are the champions, my friend!"
      />
    </LilStrangerLink>
  </div>
);

export default LeaderboardMascot;
