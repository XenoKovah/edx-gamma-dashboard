import React from 'react';
import PropTypes from 'prop-types';

const SubHeader = ({ title, actions, ...props }) => (
  <div className="gamification-title-wrapper d-flex justify-content-between align-items-center">
    <h1
      data-testid={props.id}
      tabIndex={-1}
      {...props}
    >
      {title}
    </h1>
    {/* Page-level controls, sat at the far end of the heading row by the wrapper's
        space-between. Rendered beside the heading rather than inside it so they stay
        out of the page's accessible title. */}
    {actions}
  </div>
);

SubHeader.propTypes = {
  id: PropTypes.string,
  title: PropTypes.node.isRequired,
  actions: PropTypes.node,
};

SubHeader.defaultProps = {
  id: undefined,
  actions: null,
};

export default SubHeader;
