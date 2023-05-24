import React from 'react';
import PropTypes from 'prop-types';

import cupGold from './images/cup-gold.svg';
import cupSilver from './images/cup-silver.svg';
import cupBronze from './images/cup-bronze.svg';
import '../../styles/app/leaderboard/avatar.scss';


const Avatar = ({ username, urlProfileImage, position }) => {
  const firstLetter = username ? username.charAt(0).toUpperCase() : '-';
  const getPositionForAvatar = () => {
    const cups = [cupGold, cupSilver, cupBronze];
    switch (position) {
      case 1:
      case 2:
      case 3:
        return (
          <span className="Avatar-Position Avatar-Position_winner">
            <img src={cups[position - 1]} alt=""/>
          </span>
        );
      case null:
        return (
          <span className="Avatar-Position Avatar-Position_undefined">?</span>
        );
      default:
        return (
          <span className="Avatar-Position">{position}</span>
        );
    }
  };

  return (
    <div
      className="Avatar"
      data-testid="avatar"
      style={urlProfileImage ? { backgroundImage: `url(${urlProfileImage})` } : { backgroundColor: "#cde4fc" }}
    >
      <>
        {!urlProfileImage && (
          <span
            className="Avatar-Logo"
            data-testid="avatar-logo"
            style={{ color: "#303030" }}
          >
            {firstLetter}
          </span>
        )}
        {getPositionForAvatar()}
      </>
    </div>
  );
}

Avatar.propTypes = {
  urlProfileImage: PropTypes.string,
  username: PropTypes.string,
  position: PropTypes.number
};

Avatar.defaultProps = {
  urlProfileImage: null,
  username: null,
  position: null
};

export default Avatar;
