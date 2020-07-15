import React from 'react';
import PropTypes from 'prop-types';

import { getRandomColors } from '../../utility/colorTools';
import '../../styles/app/leaderboard/avatar.scss';


const Avatar = ({ username, imageUrl }) => {
    const firstLetter = username ? username.charAt(0).toUpperCase() : '-'

    const randomColors = getRandomColors();

    return (
        <div
            className="avatar"
            data-testid="avatar"
            style={{backgroundColor: randomColors.backgroundColor}}
        >
            <div
                className="avatar-letter"
                data-testid="avatar-letter"
                style={{color: randomColors.fontColor}}
            >
                {firstLetter}
            </div>
        </div>
    );
}

Avatar.propTypes = {
    username: PropTypes.string,
    imageUrl: PropTypes.string
};

export default Avatar;
