import React from 'react';
import PropTypes from 'prop-types';

import '../../styles/app/leaderboard/avatar.scss';

const getRandomColors = () => {
    const colors = {
        backgroundColor: 'rgb(0, 0, 0)',
        fontColor: '#FFFFFF'
    };

    const getRandomInt = (max) => {
        return Math.floor(Math.random() * Math.floor(max));
    };

    const getContrastLevel = (r, g, b) => {
        return (Math.round(r * 299) + Math.round(g * 587) + Math.round(b * 114)) / 1000
    }

    const r = getRandomInt(255);
    const g = getRandomInt(255);
    const b = getRandomInt(255);

    const contrastLevel = getContrastLevel(r, g, b);

    colors.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    colors.fontColor = contrastLevel < 128 ? 'white' : 'black';

    return colors;
}

function Avatar(props) {
    const { username } = props;
    const firstLetter = username ? username.charAt(0).toUpperCase() : '-'

    const randomColors = getRandomColors();

    return (
        <div
            className="avatar"
            style={{backgroundColor: randomColors.backgroundColor}}
        >
            <div
                className="avatar-letter"
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
