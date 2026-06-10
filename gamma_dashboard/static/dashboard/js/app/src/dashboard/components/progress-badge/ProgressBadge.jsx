import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { OverlayTrigger, Popover, useToggle } from '@openedx/paragon';

import { ProgressPropType } from '../../propTypes';
import { PopoverContent } from './popover-content';
import { getTotalProgress, updateProgressView } from './utils';
import ProgressBadgeItem from './ProgressBadgeItem';
import { buildBadgeLeaderboardUrl } from '../../../routes/constants';

const ProgressBadge = ({
  slug, data, center, children,
}) => {
  const [isPopoverOpen, openPopover, closePopover] = useToggle(false);
  const popoverElementRef = useRef(null);
  const badgeElementRef = useRef(null);
  const progressElementRef = useRef(null);

  const {
    title,
    description = '',
    manualCriteria = '',
    image: badgeImageUrl,
    objectUri: achievedBadgeImageUrl,
    progress,
    points,
    statusPoints,
    dependencies = [],
  } = data;

  const imageSrc = badgeImageUrl || achievedBadgeImageUrl;

  // Each badge links to its own (filtered) leaderboard page showing the users who earned it.
  // The slug is provided explicitly by the caller; fall back to the slug carried on the badge
  // data itself (completed badges expose `slug`, in-progress badges expose `id`).
  const resolvedSlug = slug || data.slug || data.id;
  const badgeHref = resolvedSlug ? buildBadgeLeaderboardUrl(resolvedSlug) : null;

  const { showProgressRing, totalProgressPercent } = getTotalProgress(data);

  // `done` is only present on badge entries (statuses use `isActive`); for badges
  // `points` is the completion award, for statuses it is the student's points.
  const isBadge = data.done !== undefined;
  const isCompletedBadge = isBadge && Boolean(data.done);

  // In-progress items show their criteria/progress on hover. Completed badges
  // keep an informational popover (description + points granted), but only when
  // there's something to say — otherwise they render as a bare earned figure.
  const hasPopover = showProgressRing || (isCompletedBadge && Boolean(description || points));

  const popupProps = hasPopover
    ? {
      data: {
        description,
        manualCriteria,
        badgeDependencies: dependencies,
        statusDependency: data.statusDependency || null,
        progress: progress || {},
        points,
        statusPoints,
        isCompleted: isCompletedBadge,
        completionPoints: isBadge ? (points || 0) : 0,
      },
    } : null;

  useEffect(() => {
    updateProgressView(progressElementRef.current, totalProgressPercent);
  }, [totalProgressPercent]);

  if (!hasPopover) {
    return (
      <ProgressBadgeItem
        title={title}
        imageSrc={imageSrc}
        badgeRef={badgeElementRef}
        center={center}
        inProgress={showProgressRing}
        progressRef={progressElementRef}
        totalProgressPercent={totalProgressPercent}
        to={badgeHref}
      >
        {children}
      </ProgressBadgeItem>
    );
  }

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
        className="progress-badge-popover"
        tabIndex={0}
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        onFocus={handlePopoverOpen}
        onBlur={handlePopoverClose}
        onKeyDown={handlePopoverKeyDown}
        {...props}
      >
        <Popover.Title as="h3">
          <strong>{title.toUpperCase()}</strong>
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
        inProgress={showProgressRing}
        progressRef={progressElementRef}
        totalProgressPercent={totalProgressPercent}
        to={badgeHref}
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        onLinkFocus={handlePopoverOpen}
        onLinkBlur={handlePopoverClose}
      >
        {children}
      </ProgressBadgeItem>
    </OverlayTrigger>
  );
};

ProgressBadge.propTypes = {
  slug: PropTypes.string,
  data: PropTypes.shape({
    id: PropTypes.string,
    slug: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    manualCriteria: PropTypes.string,
    image: PropTypes.string,
    objectUri: PropTypes.string,
    progress: PropTypes.oneOfType([
      PropTypes.shape(ProgressPropType),
      PropTypes.arrayOf(PropTypes.shape(ProgressPropType)),
    ]),
    done: PropTypes.bool,
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
    image: '',
    progress: {},
    done: false,
    points: -1,
    statusPoints: 0,
  },
  center: false,
  children: null,
};

export default ProgressBadge;
