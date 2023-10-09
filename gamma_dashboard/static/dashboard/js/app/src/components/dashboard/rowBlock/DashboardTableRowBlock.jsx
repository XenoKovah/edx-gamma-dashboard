import React from 'react';
import PropTypes from 'prop-types';

import '../../../styles/app/dashboard/table-row-block.scss';


export const CORNER_NONE = 'none';
export const CORNER_TOP_LEFT = 'top-left';
export const CORNER_TOP_RIGHT = 'top-right';
export const CORNER_BOTTOM_LEFT = 'bottom-left';
export const CORNER_BOTTOM_RIGHT = 'bottom-right';
export const CORNER_BOTTOM = 'bottom';
export const CORNER_TOP = 'top';


const DashboardTableRowBlock = ({ fullWidth, corner, children }) => {
    let cornerClass = '';

    if (corner !== CORNER_NONE) {
        cornerClass = corner;
    }

    return (
        <div
            className={
                `dashboard-table-row-block ${fullWidth ? 'full-width' : ''} ${corner}`
            }
            data-testid={'dashboard-table-row-block'}
        >
            {children}
        </div>
    );
};

DashboardTableRowBlock.propTypes = {
    fullWidth: PropTypes.bool,
    corner: PropTypes.oneOf([
        CORNER_NONE,
        CORNER_TOP_LEFT,
        CORNER_TOP_RIGHT,
        CORNER_BOTTOM_LEFT,
        CORNER_BOTTOM_RIGHT,
        CORNER_BOTTOM,
        CORNER_TOP,
    ])
};

DashboardTableRowBlock.defaultProps = {
    fullWidth: false,
    corner: CORNER_NONE
}

export default DashboardTableRowBlock;
