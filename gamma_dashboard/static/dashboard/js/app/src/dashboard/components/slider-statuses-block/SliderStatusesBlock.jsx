import React from 'react';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import Slider from 'react-slick';

import { StatusPropType } from '../../propTypes';
import { DashboardSectionHeader } from '../sections';
import { SliderStatusesItem } from './slider-statuses-item';
import { useSliderStatusesBlock } from './hooks';

import messages from '../../../i18n';

const SliderStatusesBlock = ({ status, statusItems }) => {
  const intl = useIntl();
  const {
    sliderRef,
    sliderSettings,
    getProgressTrackStyles,
  } = useSliderStatusesBlock({ statusItems });

  return (
    <div className="slider-statuses-block">
      <DashboardSectionHeader
        title={intl.formatMessage(messages.performanceStatusesSectionHeadingText)}
        status={status}
      />
      <p className="slider-statuses-block-description" data-testid="slider-statuses-block-description">
        {intl.formatMessage(messages.performanceStatusesSectionDescriptionText)}
      </p>
      {statusItems.length ? (
        <div className="slider-statuses-block-item">
          <Slider {...sliderSettings} ref={sliderRef}>
            {statusItems.map(({
              status_uid: statusUid, url, title, statusPoints, points, // eslint-disable-line camelcase
            }, index) => {
              const isStatusComplete = points >= statusPoints;
              const {
                badgeStyles,
                progressTrackStyles,
                progressTrackEndStyles,
                progressEndStyles,
              } = getProgressTrackStyles(index, statusItems);

              return (
                <SliderStatusesItem
                  url={url}
                  title={title}
                  points={points}
                  key={statusUid}
                  statusUid={statusUid}
                  badgeStyles={badgeStyles}
                  statusPoints={statusPoints}
                  isStatusComplete={isStatusComplete}
                  progressEndStyles={progressEndStyles}
                  progressTrackStyles={progressTrackStyles}
                  progressTrackEndStyles={progressTrackEndStyles}
                />
              );
            })}
          </Slider>
        </div>
      ) : null}
    </div>
  );
};

SliderStatusesBlock.propTypes = {
  status: PropTypes.string,
  statusItems: PropTypes.arrayOf(PropTypes.shape(StatusPropType)),
};

SliderStatusesBlock.defaultProps = {
  status: '',
  statusItems: {},
};

export default SliderStatusesBlock;
