import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useIntl } from 'react-intl';
import { breakpoints, Card, useMediaQuery } from '@openedx/paragon';

import { ProfilePropType } from '../propTypes';
import Avatar from './Avatar';
import BadgeList from './BadgeList';

import messages from '../../i18n';
import defaultProfileImg from '../../assets/images/default-profile-image.png';

const LeaderboardCard = ({ profile, rank, showProgress }) => {
  const intl = useIntl();
  const {
    userUid: username = '',
    points = 0,
    badges = {},
    position,
    profileUrl,
    progressPercent = null,
  } = profile;

  // Show the percentage when one is provided (in-progress members, and completed
  // members who have no course points -> 100%); otherwise show the points score.
  const hasProgressPercent = progressPercent !== null && progressPercent !== undefined;
  const selfPosition = position === rank;
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

  return (
    <Card
      orientation={isSmall ? 'vertical' : 'horizontal'}
      className={classNames(
        'leaderboard-card align-items-center py-3 px-4',
        { highlighted: selfPosition },
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
  rank: PropTypes.number.isRequired,
  showProgress: PropTypes.bool,
};

LeaderboardCard.defaultProps = {
  showProgress: false,
};

export default LeaderboardCard;
