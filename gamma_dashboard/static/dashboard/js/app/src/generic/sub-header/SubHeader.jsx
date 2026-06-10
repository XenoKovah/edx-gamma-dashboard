import React from 'react';
import PropTypes from 'prop-types';

const SubHeader = ({ title, ...props }) => (
  <div className="gamification-title-wrapper d-flex justify-content-between align-items-center">
    <h1
      data-testid={props.id}
      tabIndex={-1}
      {...props}
    >
      {title}
    </h1>
  </div>
);

SubHeader.propTypes = {
  id: PropTypes.string,
  title: PropTypes.node.isRequired,
};

SubHeader.defaultProps = {
  id: undefined,
};

export default SubHeader;
