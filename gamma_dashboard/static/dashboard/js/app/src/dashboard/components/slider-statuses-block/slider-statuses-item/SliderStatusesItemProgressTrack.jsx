import React from 'react';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { OverlayTrigger, Tooltip } from '@openedx/paragon';

import { progressEndStylesTypes, progressTrackStylesTypes } from './propTypes';

import messages from '../../../../i18n';

const SliderStatusesItemProgressTrack = ({
  progressTrackStyles, points, progressTrackEndStyles, progressEndStyles,
}) => {
  const intl = useIntl();

  const translations = {
    progressTrackItemText: intl.formatMessage(messages.performanceStatusesSectionProgressTrackItemText, {
      pointsCount: points,
    }),
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
            aria-label={translations.progressTrackItemText}
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
