import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { GAMMA_ADMIN_BASE_URL } from '../../../constants';
import { resolveUrl } from '../../../utils/urlTools';
import ProgressBadgeDiagram from './ProgressBadgeDiagram';
import ProgressBadgeFigure from './ProgressBadgeFigure';

const ProgressBadgeItem = ({
  badgeRef,
  center,
  inProgress,
  totalProgressPercent,
  progressRef,
  imageSrc,
  title,
  to,
  onLinkFocus,
  onLinkBlur,
  children,
  ...props
}) => {
  const imageUrl = resolveUrl(imageSrc, GAMMA_ADMIN_BASE_URL);

  const figureAndTitle = (
    <>
      {inProgress ? (
        <>
          <p className="total-progress-percent" data-testid="total-progress-percent">
            {totalProgressPercent}%
          </p>
          <ProgressBadgeDiagram
            totalProgressPercent={totalProgressPercent}
            progressRef={progressRef}
          >
            <ProgressBadgeFigure imageSrc={imageUrl} isDisabled />
          </ProgressBadgeDiagram>
        </>
      ) : (
        <ProgressBadgeFigure imageSrc={imageUrl} />
      )}
      <h3 className="progress-badge-title" data-testid="progress-badge-title">
        {title}
      </h3>
    </>
  );

  return (
    <li
      ref={badgeRef}
      className={classNames('progress-badge', {
        'progress-badge-center': center,
        'progress-badge-completed': !inProgress,
      })}
      data-testid="progress-badge"
      {...props}
    >
      {to ? (
        <a
          href={to}
          className="progress-badge-link"
          data-testid="progress-badge-link"
          onFocus={onLinkFocus}
          onBlur={onLinkBlur}
        >
          {figureAndTitle}
        </a>
      ) : figureAndTitle}
      {children}
    </li>
  );
};

ProgressBadgeItem.propTypes = {
  badgeRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  center: PropTypes.bool,
  inProgress: PropTypes.bool,
  totalProgressPercent: PropTypes.number,
  progressRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  imageSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  to: PropTypes.string,
  onLinkFocus: PropTypes.func,
  onLinkBlur: PropTypes.func,
  children: PropTypes.node,
};

ProgressBadgeItem.defaultProps = {
  badgeRef: null,
  center: false,
  inProgress: false,
  totalProgressPercent: 0,
  progressRef: null,
  to: null,
  onLinkFocus: undefined,
  onLinkBlur: undefined,
  children: null,
};

export default ProgressBadgeItem;
