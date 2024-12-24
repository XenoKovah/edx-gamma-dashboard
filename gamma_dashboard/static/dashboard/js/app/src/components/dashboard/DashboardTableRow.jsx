import React from 'react';
import PropTypes from 'prop-types';

const DashboardTableRow = ({ children }) => (
  <div
    className="dashboard-table-row"
    data-testid="dashboard-table-row"
  >
    {children}
  </div>
);

DashboardTableRow.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DashboardTableRow;
