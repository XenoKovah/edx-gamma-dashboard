import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  CORNER_BOTTOM,
  CORNER_BOTTOM_LEFT,
  CORNER_BOTTOM_RIGHT,
  CORNER_NONE, CORNER_TOP,
  CORNER_TOP_LEFT,
  CORNER_TOP_RIGHT,
} from '../constants';

const DashboardSection = ({
  fullWidth, corner, children, className,
}) => (
  <section
    className={classNames('dashboard-section', { 'full-width': fullWidth }, corner, className)}
    data-testid="dashboard-section"
  >
    {children}
  </section>
);

DashboardSection.propTypes = {
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
  className: PropTypes.string,
};

DashboardSection.defaultProps = {
  fullWidth: false,
  corner: CORNER_NONE,
  className: undefined,
};

export default DashboardSection;
