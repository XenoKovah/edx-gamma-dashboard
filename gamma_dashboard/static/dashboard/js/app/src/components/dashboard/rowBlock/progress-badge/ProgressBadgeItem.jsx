import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import ProgressBadgeDiagram from './ProgressBadgeDiagram';
import ProgressBadgeFigure from './ProgressBadgeFigure';

const ProgressBadgeItem = ({
  badgeRef,
  center,
  hasPopup,
  totalProgressPercent,
  progressRef,
  imageSrc,
  title,
  children,
  ...props
}) => (
  <li
    ref={badgeRef}
    className={classNames('progress-badge', {
      'progress-badge-center': center,
      'progress-badge-completed': !hasPopup,
    })}
    data-testid="progress-badge"
    {...props}
  >
    {hasPopup ? (
      <>
        <p className="total-progress-percent" data-testid="total-progress-percent">
          {totalProgressPercent}%
        </p>
        <ProgressBadgeDiagram
          totalProgressPercent={totalProgressPercent}
          progressRef={progressRef}
        >
          <ProgressBadgeFigure imageSrc={imageSrc} isDisabled />
        </ProgressBadgeDiagram>
      </>
    ) : (
      <ProgressBadgeFigure imageSrc={imageSrc} />
    )}
    <div className="progress-badge-title" data-testid="progress-badge-title">
      {title}
    </div>
    {children}
  </li>
);

ProgressBadgeItem.propTypes = {
  badgeRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  center: PropTypes.bool,
  hasPopup: PropTypes.bool,
  totalProgressPercent: PropTypes.number,
  progressRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  imageSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};

ProgressBadgeItem.defaultProps = {
  badgeRef: null,
  center: false,
  hasPopup: false,
  totalProgressPercent: 0,
  progressRef: null,
  children: null,
};

export default ProgressBadgeItem;
