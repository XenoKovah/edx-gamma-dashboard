import React from 'react';
import PropTypes from 'prop-types';

import '../../styles/app/utility/close-window-button.scss';


const CloseWindowButton = ({ onClick }) => (
    <button
        className={'close-window-button'}
        data-testid={'close-window-button'}
        onClick={(event) => { event.preventDefault(); onClick() }}
    >
    </button>
);

CloseWindowButton.propTypes = {
    onClick: PropTypes.func
};

CloseWindowButton.defaultProps = {
    onClick: () => {}
};

export default CloseWindowButton;
