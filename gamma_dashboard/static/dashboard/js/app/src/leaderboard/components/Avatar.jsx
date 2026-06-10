import React from 'react';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Avatar as AvatarImage } from '@openedx/paragon';
import { Award as AwardIcon } from '@openedx/paragon/icons';

import { capitalizeFirstLetter } from '../../utils';
import { COLOR_PALETTE } from '../../constants';

import messages from '../../i18n';

const CUP_COLORS = [COLOR_PALETTE.gold, COLOR_PALETTE.silver, COLOR_PALETTE.bronze];

const Avatar = ({
  username, urlProfileImage, isDefaultImage, position, plainPosition,
}) => {
  const intl = useIntl();

  const firstLetter = capitalizeFirstLetter(username).charAt(0) || '-';

  const translations = {
    avatarAltText: intl.formatMessage(messages.leaderboardAvatarAltText, { username }),
  };

  const getPositionForAvatar = () => {
    if (position === null) {
      return (
        <span className="avatar-position avatar-position_undefined">?</span>
      );
    }
    // The winner medals (gold/silver/bronze) only make sense for the ranked-by-points
    // leaderboard; the in-progress list shows plain rank numbers instead.
    if (!plainPosition && position >= 1 && position <= 3) {
      return (
        <span className="avatar-position avatar-position_winner">
          <AwardIcon style={{ color: CUP_COLORS[position - 1] }} aria-label={position} />
        </span>
      );
    }
    return (
      <span className="avatar-position">{position}</span>
    );
  };

  return (
    <div
      className="avatar-wrapper"
      data-testid="avatar"
      style={{ backgroundColor: !urlProfileImage ? COLOR_PALETTE.avatarImageBgGray : 'transparent' }}
    >
      {urlProfileImage ? (
        <AvatarImage
          size="md"
          // Flag the placeholder image so the dark theme can recolor only it,
          // leaving real uploaded photos untouched.
          className={classNames('flex-shrink-0', { 'avatar-image_default': isDefaultImage })}
          src={urlProfileImage}
          alt={translations.avatarAltText}
        />
      ) : (
        <span
          className="avatar-letter"
          data-testid="avatar-letter-logo"
          style={{ color: COLOR_PALETTE.avatarLetterBgGray }}
        >
          {firstLetter}
        </span>
      )}
      {getPositionForAvatar()}
    </div>
  );
};

Avatar.propTypes = {
  urlProfileImage: PropTypes.string,
  isDefaultImage: PropTypes.bool,
  username: PropTypes.string,
  position: PropTypes.number,
  plainPosition: PropTypes.bool,
};

Avatar.defaultProps = {
  urlProfileImage: null,
  isDefaultImage: false,
  username: null,
  position: null,
  plainPosition: false,
};

export default Avatar;
