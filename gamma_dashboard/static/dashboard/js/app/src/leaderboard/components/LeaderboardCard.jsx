import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { breakpoints, Card, useMediaQuery } from '@openedx/paragon';

import { ProfilePropType } from '../propTypes';
import Avatar from './Avatar';
import BadgeList from './BadgeList';

import defaultProfileImg from '../../assets/images/default-profile-image.png';

const LeaderboardCard = ({ profile, rank }) => {
  const {
    userUid: username = '',
    points = 0,
    badges = {},
    position,
  } = profile;

  const selfPosition = position === rank;
  const isSmall = useMediaQuery({ maxWidth: breakpoints.small.maxWidth });

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
        position={profile.position}
      />
      <Card.Body
        size="sm"
        className="d-flex align-items-center"
      >
        <Card.Header
          title={username}
          size="sm"
        />
        <span
          className="leaderboard-card-progress"
          data-testid="progress-cell"
        >
          {points}
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
};

export default LeaderboardCard;
