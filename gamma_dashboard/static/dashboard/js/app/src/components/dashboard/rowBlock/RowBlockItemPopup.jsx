import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import { capitalizeFirstLetter } from '../../../utils';
import { isRtl } from '../../../constants';
import { useTranslate } from '../../../i18n/utils';

const RowBlockItemPopup = forwardRef(({ title, data, ...props }, ref) => {
  const { statusDependency } = data;
  const badgeDependencies = data.badgeDependencies || [];
  const progress = data.progress || {};
  const points = data.points || 0;
  const { statusPoints } = data;
  const dependsOnBadgesText = useTranslate('dashboard.badges.depends.on.badges.text');
  const dependsOnStatusesText = useTranslate('dashboard.badges.depends.on.status.text');

  const bodyItems = [];
  for (const progressItem in progress) {
    if (Object.hasOwn(progress, progressItem)) {
      const progressValues = progress[progressItem];
      const { count, goal, title: progressTitle } = progressValues;

      bodyItems.push((
        <ul key={`progress-${progressItem}`} className="item-list">
          <li className="item-list-item">
            <span className="list-item-counter-text">
              {`${Math.min(count, goal)}/${goal}`}
            </span>
            {capitalizeFirstLetter(progressTitle)}
          </li>
        </ul>
      ));
    }
  }

  if (badgeDependencies.length > 0) {
    bodyItems.push((
      <React.Fragment key="badge-dependencies">
        <div className="list-item-dependency-title">
          { isRtl ? `:${dependsOnBadgesText}` : `${dependsOnBadgesText}:` }
        </div>
        <ul className="item-list">
          {badgeDependencies.map((badge) => (
            <li key={badge} className="item-list-item">
              {badge}
            </li>
          ))}
        </ul>
      </React.Fragment>
    ));
  }

  if (statusDependency) {
    bodyItems.push((
      <React.Fragment key="status-dependencies">
        <div className="list-item-dependency-title">
          { isRtl ? `:${dependsOnStatusesText}` : `${dependsOnStatusesText}:` }
        </div>
        <ul className="item-list">
          <li className="item-list-item">
            {statusDependency}
          </li>
        </ul>
      </React.Fragment>
    ));
  }
  if (statusPoints) {
    bodyItems.push((
      <ul key="status-points" className="item-list">
        <li className="item-list-item">
          <span className="list-item-counter-text">
            {`${points}/${statusPoints}`}
          </span>
        </li>
      </ul>
    ));
  }

  return (
    <div
      className="row-block-item-popup"
      data-testid="row-block-item-popup"
      ref={ref}
      {... props}
    >
      <div className="item-head" data-testid="item-head">
        {title}
      </div>
      <div className="item-body" data-testid="item-body">
        {bodyItems}
      </div>
    </div>
  );
});

const EventPropType = PropTypes.shape({
  count: PropTypes.number.isRequired,
  goal: PropTypes.number.isRequired,
});

RowBlockItemPopup.propTypes = {
  title: PropTypes.string,
  data: PropTypes.shape({
    badgeDependencies: PropTypes.arrayOf(PropTypes.string),
    statusDependency: PropTypes.string,
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
    points: PropTypes.number,
    statusPoints: PropTypes.number,
  }),
};

RowBlockItemPopup.defaultProps = {
  title: '',
  data: {
    badgeDependencies: [],
    statusDependency: '',
    progress: {},
    points: -1,
    statusPoints: 0,
  },
};

export default RowBlockItemPopup;
