import React from 'react';
import PropTypes from 'prop-types';
import { OverlayTrigger, Tooltip } from '@openedx/paragon';

import { useTranslate } from '../../../../../i18n/utils';
import { progressEndStylesTypes, progressTrackStylesTypes } from './propTypes';

const SliderStatusesItemProgressTrack = ({
  progressTrackStyles, points, progressTrackEndStyles, progressEndStyles,
}) => {
  const messages = {
    progressTrackItemText: useTranslate('performance.statuses.section.progress-track.item.text', { pointsCount: points }),
  };

  return (
    <div className="slider-item-progress">
      <div
        className="slider-item-progress-track"
        style={progressTrackStyles}
      >
        <OverlayTrigger
          key="bottom"
          placement="bottom"
          overlay={(
            <Tooltip id="tooltip-points" className="slider-item-progress-track-tooltip">
              {points}
            </Tooltip>
          )}
        >
          <div
            className="slider-item-progress-track-end"
            style={progressTrackEndStyles}
            role="button"
            tabIndex={0}
            aria-label={messages.progressTrackItemText}
          />
        </OverlayTrigger>
      </div>
      <div
        className="slider-item-progress-end"
        style={progressEndStyles}
      />
    </div>
  );
};

SliderStatusesItemProgressTrack.propTypes = {
  progressTrackStyles: PropTypes.shape(progressEndStylesTypes).isRequired,
  points: PropTypes.number.isRequired,
  progressTrackEndStyles: PropTypes.shape(progressTrackStylesTypes).isRequired,
  progressEndStyles: PropTypes.shape(progressEndStylesTypes).isRequired,
};

export default SliderStatusesItemProgressTrack;
