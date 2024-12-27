import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { usePopper } from 'react-popper';
import classNames from 'classnames';

import RowBlockItemPopup from '../RowBlockItemPopup';
import ProgressBadgeDiagram from './ProgressBadgeDiagram';
import ProgressBadgeFigure from './ProgressBadgeFigure';
import { getTotalProgress, updateProgressView } from './utils';

const DEFAULT_POPPER_STYLES = {
  placement: 'auto',
  scroll: false,
};

const ProgressBadge = ({ data, center, children }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, DEFAULT_POPPER_STYLES);

  const progressRef = useRef(null);

  const {
    title,
    url: imageSrc,
    progress,
    points,
    statusPoints,
  } = data;

  const dependencies = data.dependencies || [];
  const { hasPopup, totalProgressPercent } = getTotalProgress(data);

  const itemProps = hasPopup ? {
    onMouseEnter: () => setShowPopup(true),
    onMouseLeave: () => setShowPopup(false),
  } : {};

  const popupProps = hasPopup
    ? {
      style: showPopup
        ? { visibility: 'visible', opacity: 1 }
        : {},
      data: {
        badgeDependencies: dependencies,
        statusDependency: data.statusDependency || null,
        progress: progress || {},
        points,
        statusPoints,
      },
    } : null;

  useEffect(() => {
    updateProgressView(progressRef.current, totalProgressPercent);
  }, [totalProgressPercent]);

  return (
    <li
      className={classNames('progress-badge', {
        'progress-badge-center': center,
        'progress-badge-completed': !hasPopup,
      })}
      data-testid="progress-badge"
      /* eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role */
      role="button"
      aria-haspopup="true"
      aria-expanded={hasPopup}
      tabIndex={0}
      {...itemProps}
    >
      {hasPopup ? (
        <>
          <p className="total-progress-percent" data-testid="total-progress-percent">
            {totalProgressPercent}%
          </p>
          <ProgressBadgeDiagram totalProgressPercent={totalProgressPercent} progressRef={progressRef}>
            <ProgressBadgeFigure imageSrc={imageSrc} setReferenceElement={setReferenceElement} isDisabled />
          </ProgressBadgeDiagram>
        </>
      ) : (
        <ProgressBadgeFigure imageSrc={imageSrc} setReferenceElement={setReferenceElement} />
      )}
      <div className="progress-badge-title" data-testid="progress-badge-title">
        {title}
      </div>
      {hasPopup && popupProps && (
        <RowBlockItemPopup
          ref={setPopperElement}
          title={title}
          style={{ ...styles.popper, ...popupProps.style }}
          data={popupProps.data}
          {...attributes.popper}
        />
      )}
      {children}
    </li>
  );
};

const EventPropType = PropTypes.shape({
  count: PropTypes.number.isRequired,
  goal: PropTypes.number.isRequired,
});

ProgressBadge.propTypes = {
  slug: PropTypes.string,
  data: PropTypes.shape({
    title: PropTypes.string,
    url: PropTypes.string,
    progress: PropTypes.shape({
      edxForumCommentCreated: EventPropType,
      openassessmentblockSaveSubmission: EventPropType,
      edxBookmarkAdded: EventPropType,
      edxForumThreadCreated: EventPropType,
      edxForumResponseCreated: EventPropType,
      edxForumThreadVoted: EventPropType,
      stopVideo: EventPropType,
      edxCertificateCreated: EventPropType,
      edxGradesProblemSubmitted: EventPropType,
      edxCourseEnrollmentActivated: EventPropType,
      problemCheck: EventPropType,
      problemGraded: EventPropType,
    }),
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
