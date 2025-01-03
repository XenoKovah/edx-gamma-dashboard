import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const ProgressBadgeDiagram = ({ totalProgressPercent, progressRef, children }) => (
  <div className={classNames('progress-badge-diagram progress')} data-percent={totalProgressPercent} ref={progressRef}>
    <div className="piece left" />
    <div className="piece right" />
    {children}
  </div>
);

ProgressBadgeDiagram.propTypes = {
  totalProgressPercent: PropTypes.number.isRequired,
  progressRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]).isRequired,
  children: PropTypes.node,
};

ProgressBadgeDiagram.defaultProps = {
  children: null,
};

export default ProgressBadgeDiagram;
