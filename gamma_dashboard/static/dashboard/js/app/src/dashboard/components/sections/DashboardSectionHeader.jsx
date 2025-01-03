import React from 'react';
import PropTypes from 'prop-types';
import { Badge } from '@openedx/paragon';

const DashboardSectionHeader = ({ title, status, description }) => (
  <header
    className="dashboard-section-header"
    data-testid="dashboard-section-header"
  >
    {title && (
      <h2
        className="dashboard-section-header-title"
        data-testid="dashboard-section-header-title"
      >
        {title}
      </h2>
    )}
    {status && (
      <div
        className="dashboard-section-header-status"
        data-testid="dashboard-section-header-status"
      >
        <Badge variant="info">{status}</Badge>
      </div>
    )}
    {description && (
      <p
        className="dashboard-section-header-description"
        data-testid="dashboard-section-header-description"
      >
        {description}
      </p>
    )}
  </header>
);

DashboardSectionHeader.propTypes = {
  title: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  description: PropTypes.string,
};

DashboardSectionHeader.defaultProps = {
  description: null,
};

export default DashboardSectionHeader;
