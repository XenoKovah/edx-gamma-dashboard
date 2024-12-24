import React from 'react';
import PropTypes from 'prop-types';
import {
  CORNER_BOTTOM,
  CORNER_BOTTOM_LEFT,
  CORNER_BOTTOM_RIGHT,
  CORNER_NONE, CORNER_TOP,
  CORNER_TOP_LEFT,
  CORNER_TOP_RIGHT,
} from './constants';

const DashboardTableRowBlock = ({ fullWidth, corner, children }) => (
  <div
    className={`dashboard-table-row-block ${fullWidth ? 'full-width' : ''} ${corner}`}
    data-testid="dashboard-table-row-block"
  >
    {children}
  </div>
);

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
  ]),
  children: PropTypes.node.isRequired,
};

DashboardTableRowBlock.defaultProps = {
  fullWidth: false,
  corner: CORNER_NONE,
};

export default DashboardTableRowBlock;
