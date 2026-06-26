import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useIntl } from 'react-intl';
import { breakpoints, Card, useMediaQuery } from '@openedx/paragon';

import { ProfilePropType } from '../propTypes';
import { countryCodeToFlag } from '../utils';
import { buildCountryLeaderboardUrl } from '../../routes/constants';
import Avatar from './Avatar';
import BadgeList from './BadgeList';

import messages from '../../i18n';
import defaultProfileImg from '../../assets/images/default-profile-image.png';

const LeaderboardCard = ({ profile, currentUserUid, showProgress }) => {
  const intl = useIntl();
  const {
    userUid: username = '',
    points = 0,
    badges = {},
    profileUrl,
    country = '',
    progressPercent = null,
  } = profile;

  // Show the percentage when one is provided (in-progress members, and completed
  // members who have no course points -> 100%); otherwise show the points score.
  const hasProgressPercent = progressPercent !== null && progressPercent !== undefined;
  // Highlight the viewer's own row by identity, not by position: with shared ranks
  // a position number is no longer unique, so matching on it would highlight every
  // learner tied with the viewer (or, when the viewer's rank differs from their row
  // index, the wrong learner entirely).
  const isCurrentUser = !!currentUserUid && username === currentUserUid;
  const isSmall = useMediaQuery({ maxWidth: breakpoints.small.maxWidth });

  // When the backend resolves a platform user, it provides a link to their profile page.
  // Render the username as that link; otherwise (e.g. an unknown user) keep it as plain text.
  const usernameNode = profileUrl ? (
    <a
      className="leaderboard-card-username-link"
      href={profileUrl}
      data-testid="leaderboard-card-username-link"
      aria-label={intl.formatMessage(messages.leaderboardProfileLinkLabel, { username })}
    >
      {username}
    </a>
  ) : username;

  // Country flag (only when the learner shares their country publicly): a link to
  // that country's leaderboard. Null when private/unknown so nothing renders.
  const flag = countryCodeToFlag(country);
  const countryNode = flag ? (
    <a
      className="leaderboard-card-country-link"
      href={buildCountryLeaderboardUrl(country)}
      data-testid="leaderboard-card-country-link"
      aria-label={intl.formatMessage(messages.leaderboardCountryLinkLabel, { country })}
      title={intl.formatMessage(messages.leaderboardCountryLinkLabel, { country })}
    >
      <span role="img" aria-hidden="true">{flag}</span>
    </a>
  ) : null;

  return (
    <Card
      orientation={isSmall ? 'vertical' : 'horizontal'}
      className={classNames(
        'leaderboard-card align-items-center py-3 px-4',
        { highlighted: isCurrentUser },
      )}
      data-testid="leaderboard-card"
    >
      <Avatar
        username={username}
        urlProfileImage={profile.urlProfileImage || defaultProfileImg}
        isDefaultImage={!profile.urlProfileImage}
        position={profile.position}
        plainPosition={showProgress}
      />
      <Card.Body
        size="sm"
        className="d-flex align-items-center"
      >
        <Card.Header
          title={usernameNode}
          size="sm"
        />
        <span
          className="leaderboard-card-country"
          data-testid="country-cell"
        >
          {countryNode}
        </span>
        <span
          className="leaderboard-card-progress"
          data-testid="progress-cell"
        >
          {hasProgressPercent ? `${progressPercent}%` : points}
        </span>
      </Card.Body>
      <Card.Footer className="p-0 mt-3 mt-md-0 overflow-auto">
        <BadgeList badges={badges} />
      </Card.Footer>
    </Card>
  );
};

LeaderboardCard.propTypes = {
  profile: PropTypes.shape(ProfilePropType).isRequired,
  currentUserUid: PropTypes.string,
  showProgress: PropTypes.bool,
};

LeaderboardCard.defaultProps = {
  currentUserUid: null,
  showProgress: false,
};

export default LeaderboardCard;
