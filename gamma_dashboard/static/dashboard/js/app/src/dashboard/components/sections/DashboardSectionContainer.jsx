import React from 'react';
import PropTypes from 'prop-types';

const DashboardSectionContainer = ({ children }) => (
  <div
    className="dashboard-section-container"
    data-testid="dashboard-section-container"
  >
    {children}
  </div>
);

DashboardSectionContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DashboardSectionContainer;
