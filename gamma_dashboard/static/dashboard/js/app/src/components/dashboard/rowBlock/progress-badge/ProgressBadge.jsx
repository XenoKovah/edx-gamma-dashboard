import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { OverlayTrigger, Popover, useToggle } from '@openedx/paragon';

import { ProgressPropType } from '../../../propTypes';
import { PopoverContent } from './popover-content';
import { getTotalProgress, updateProgressView } from './utils';
import ProgressBadgeItem from './ProgressBadgeItem';

const ProgressBadge = ({ data, center, children }) => {
  const [isPopoverOpen, openPopover, closePopover] = useToggle(false);
  const popoverElementRef = useRef(null);
  const badgeElementRef = useRef(null);
  const progressElementRef = useRef(null);

  const {
    title,
    url: imageSrc,
    progress,
    points,
    statusPoints,
    dependencies = [],
  } = data;

  const { hasPopup, totalProgressPercent } = getTotalProgress(data);

  const popupProps = hasPopup
    ? {
      data: {
        badgeDependencies: dependencies,
        statusDependency: data.statusDependency || null,
        progress: progress || {},
        points,
        statusPoints,
      },
    } : null;

  useEffect(() => {
    updateProgressView(progressElementRef.current, totalProgressPercent);
  }, [totalProgressPercent]);

  if (!hasPopup && !popupProps) {
    return (
      <ProgressBadgeItem
        title={title}
        imageSrc={imageSrc}
        badgeRef={badgeElementRef}
        center={center}
        progressRef={progressElementRef}
        totalProgressPercent={totalProgressPercent}
      >
        {children}
      </ProgressBadgeItem>
    );
  }

  const handleBadgeKeyDown = ({ key }) => {
    if (key === 'Enter') {
      openPopover();
      requestAnimationFrame(() => {
        const firstElement = popoverElementRef.current?.firstElementChild;
        if (firstElement) {
          firstElement.focus({ preventScroll: true });
        }
      });
    }
  };

  const handlePopoverKeyDown = ({ key }) => {
    if (key === 'Escape' || key === 'Tab') {
      closePopover();
      badgeElementRef.current?.focus();
    }
  };

  const handlePopoverOpen = () => openPopover();
  const handlePopoverClose = () => closePopover();

  const renderPopover = (props) => (
    <div ref={popoverElementRef}>
      <Popover
        id="popover-positioned-popover"
        datatest-id="popover-positioned-popover"
        tabIndex={0}
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        onFocus={handlePopoverOpen}
        onBlur={handlePopoverClose}
        onKeyDown={handlePopoverKeyDown}
        {...props}
      >
        <Popover.Title as="h3">
          <strong>{title}</strong>
        </Popover.Title>
        <PopoverContent
          title={title}
          data={popupProps.data}
        />
      </Popover>
    </div>
  );

  return (
    <OverlayTrigger
      show={isPopoverOpen}
      key="progress-badge-popover"
      overlay={renderPopover}
      placement="auto"
    >
      <ProgressBadgeItem
        title={title}
        imageSrc={imageSrc}
        badgeRef={badgeElementRef}
        center={center}
        hasPopup
        progressRef={progressElementRef}
        totalProgressPercent={totalProgressPercent}
        role="button"
        aria-haspopup={hasPopup}
        aria-expanded={isPopoverOpen}
        tabIndex={0}
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        onBlur={handlePopoverClose}
        onKeyDown={handleBadgeKeyDown}
      >
        {children}
      </ProgressBadgeItem>
    </OverlayTrigger>
  );
};

ProgressBadge.propTypes = {
  slug: PropTypes.string,
  data: PropTypes.shape({
    title: PropTypes.string,
    url: PropTypes.string,
    progress: PropTypes.shape(ProgressPropType),
    done: PropTypes.bool,
    active: PropTypes.bool,
    points: PropTypes.number,
    statusPoints: PropTypes.number,
    dependencies: PropTypes.arrayOf(PropTypes.string),
    statusDependency: PropTypes.string,
  }),
  center: PropTypes.bool,
  children: PropTypes.node,
};

ProgressBadge.defaultProps = {
  slug: '',
  data: {
    title: '',
    url: '',
    progress: {},
    done: false,
    active: false,
    points: -1,
    statusPoints: 0,
  },
  center: false,
  children: null,
};

export default ProgressBadge;
