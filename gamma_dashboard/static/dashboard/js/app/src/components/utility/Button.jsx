import React from 'react';
import PropTypes from 'prop-types';

import '../../styles/app/utility/button.scss';


const Button = ({ title, onClick }) => (
    <a
        className={'btn'}
        data-testid={'button'}
        href='#'
        onClick={(event) => {event.preventDefault(); onClick()}}
    >
        {title}
    </a>
);

Button.propTypes = {
    title: PropTypes.string,
    onClick: PropTypes.func,
};

export default Button;
