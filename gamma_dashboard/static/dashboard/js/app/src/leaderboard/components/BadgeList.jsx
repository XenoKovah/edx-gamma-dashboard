import React from 'react';
import { useIntl } from 'react-intl';
import PropType from 'prop-types';

import { BadgePropType } from '../propTypes';
import Badge from './Badge';

import messages from '../../i18n';

// How many badge icons a single leaderboard row will draw before collapsing the
// rest into a "+N" link. The most decorated learners hold several hundred badges
// each, so an uncapped board rendered thousands of <img> elements -- the row is a
// summary, and the learner's profile is where the full set belongs.
export const MAX_VISIBLE_BADGES = 50;

const BadgeList = ({ badges, profileUrl }) => {
  const intl = useIntl();

  const badgeKeys = Object.keys(badges);
  const visibleKeys = badgeKeys.slice(0, MAX_VISIBLE_BADGES);
  const hiddenCount = badgeKeys.length - visibleKeys.length;

  const translations = {
    emptyBadgesText: intl.formatMessage(messages.performanceBadgesEmptyMessageText),
    moreBadgesText: intl.formatMessage(messages.performanceBadgesMoreItemsText, { count: hiddenCount }),
  };

  const overflow = hiddenCount > 0 && (
    <li>
      {profileUrl ? (
        <a
          href={profileUrl}
          className="badge-item-more"
          data-testid="leaderboard-badge-overflow"
          title={translations.moreBadgesText}
        >
          {`+${intl.formatNumber(hiddenCount)}`}
        </a>
      ) : (
        <span
          className="badge-item-more"
          data-testid="leaderboard-badge-overflow"
          title={translations.moreBadgesText}
        >
          {`+${intl.formatNumber(hiddenCount)}`}
        </span>
      )}
    </li>
  );

  return (
    <ul className="badge-list list-unstyled m-0">
      {badgeKeys.length ? (
        <>
          {visibleKeys.map((id) => (
            <li key={id}>
              <Badge
                key={id}
                url={badges[id].url}
                title={badges[id].title}
                slug={badges[id].slug}
              />
            </li>
          ))}
          {overflow}
        </>
      ) : (
        translations.emptyBadgesText
      )}
    </ul>
  );
};

BadgeList.propTypes = {
  badges: PropType.shape(BadgePropType),
  profileUrl: PropType.string,
};

BadgeList.defaultProps = {
  profileUrl: '',
};

export default BadgeList;
