import React from 'react';
import PropTypes from 'prop-types';

// Ref-forwarding so a caller can scroll one specific section into view — the All
// Accomplishments page does this when a per-badge leaderboard deep-links to a
// single category. Rendering without a ref behaves exactly as it did before.
const DashboardSectionContainer = React.forwardRef(({ children }, ref) => (
  <div
    ref={ref}
    className="dashboard-section-container"
    data-testid="dashboard-section-container"
  >
    {children}
  </div>
));

DashboardSectionContainer.displayName = 'DashboardSectionContainer';

DashboardSectionContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DashboardSectionContainer;
