import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';

import { useTranslate } from '../../../../i18n/utils';
import RowBlockHeader from '../../RowBlockHeader';
import { SliderStatusesItem } from './slider-statuses-item';
import { useSliderStatusesBlock } from './hooks';

const SliderStatusesBlock = ({ status, statusItems }) => {
  const {
    sliderRef,
    sliderSettings,
    getProgressTrackStyles,
  } = useSliderStatusesBlock({ statusItems });

  return (
    <div className="slider-statuses-block">
      <RowBlockHeader
        title={useTranslate('performance.statuses.section.heading.text')}
        status={status}
      />
      <p className="slider-statuses-block-description" data-testid="slider-statuses-block-description">
        {useTranslate('performance.statuses.section.description.text')}
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

const StatusPropType = PropTypes.shape({
  status_uid: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  active: PropTypes.bool.isRequired,
  color: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  statusPoints: PropTypes.number.isRequired,
  points: PropTypes.number.isRequired,
});

SliderStatusesBlock.propTypes = {
  status: PropTypes.string,
  statusItems: PropTypes.arrayOf(StatusPropType),
};

SliderStatusesBlock.defaultProps = {
  status: '',
  statusItems: {},
};

export default SliderStatusesBlock;
