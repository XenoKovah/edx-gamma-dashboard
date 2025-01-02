import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import SliderStatusesItemProgressTrack from './SliderStatusesItemProgressTrack';
import SliderStatusesItemInfo from './SliderStatusesItemInfo';
import { badgeStylesTypes, progressEndStylesTypes, progressTrackStylesTypes } from './propTypes';

const SliderStatusesItem = ({
  url,
  title,
  points,
  statusUid,
  badgeStyles,
  statusPoints,
  isStatusComplete,
  progressEndStyles,
  progressTrackStyles,
  progressTrackEndStyles,
}) => (
  <div
    className={classNames('slider-item', {
      'with-progress': parseFloat(progressTrackStyles.width),
    })}
    key={statusUid}
    data-testid="slider-item"
  >
    <SliderStatusesItemInfo
      url={url}
      title={title}
      points={points}
      badgeStyles={badgeStyles}
      statusPoints={statusPoints}
      isStatusComplete={isStatusComplete}
    />
    <SliderStatusesItemProgressTrack
      points={points}
      progressEndStyles={progressEndStyles}
      progressTrackStyles={progressTrackStyles}
      progressTrackEndStyles={progressTrackEndStyles}
    />
  </div>
);

SliderStatusesItem.propTypes = {
  statusUid: PropTypes.string.isRequired,
  progressTrackStyles: PropTypes.shape(progressEndStylesTypes).isRequired,
  isStatusComplete: PropTypes.bool.isRequired,
  badgeStyles: PropTypes.shape(badgeStylesTypes).isRequired,
  statusPoints: PropTypes.number.isRequired,
  points: PropTypes.number.isRequired,
  progressTrackEndStyles: PropTypes.shape(progressTrackStylesTypes).isRequired,
  progressEndStyles: PropTypes.shape(progressEndStylesTypes).isRequired,
  url: PropTypes.string,
  title: PropTypes.string,
};

SliderStatusesItem.defaultProps = {
  url: '',
  title: '',
};

export default SliderStatusesItem;
