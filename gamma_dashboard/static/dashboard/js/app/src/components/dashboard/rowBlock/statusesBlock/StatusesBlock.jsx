import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import { OverlayTrigger, Tooltip } from '@openedx/paragon';

import { buildURL } from '../../../../utils';
import { useStatusesBlock } from './useStatusesBlock';

import 'slick-carousel/slick/slick.scss';
import 'slick-carousel/slick/slick-theme.scss';

import { useTranslate } from '../../../../i18n/utils';
import CompleteIcon from '../../../../assets/images/complete-icon.svg';

const StatusesBlock = ({ status, statusItems }) => {
  const {
    sliderRef,
    sliderSettings,
    getProgressTrackStyles,
  } = useStatusesBlock({ statusItems });

  return (
    <div className="statuses-block">
      <div className="table-row-block-header" data-testid="table-row-block-header">
        <div className="table-row-block-title" data-testid="row-block-title">
          {useTranslate('performance.statuses.section.heading.text')}
        </div>
        <div className="table-row-block-status" data-testid="row-block-status"><span>{status}</span></div>
        <div className="table-row-block-description" data-testid="row-block-description" />
      </div>
      <p className="row-block-text" data-testid="row-block-text">
        {useTranslate('performance.statuses.section.description.text')}
      </p>
      {statusItems.length ? (
        <div className="statuses-block__slider">
          <Slider {...sliderSettings} ref={sliderRef}>
            {statusItems.map(({
              status_uid, url, title, statusPoints, points, // eslint-disable-line camelcase
            }, index) => {
              const isStatusComplete = points >= statusPoints;
              const {
                badgeStyles,
                progressTrackStyles,
                progressTrackEndStyles,
                progressEndStyles,
              } = getProgressTrackStyles(index);

              return (
                <div
                  className={`slider-item ${parseFloat(progressTrackStyles.width) ? 'with-progress' : ''}`}
                  key={status_uid} // eslint-disable-line camelcase
                  data-testid="slider-item"
                >
                  <div className="slider-item__info">
                    {isStatusComplete && (
                      <img
                        className="slider-item__info-icon"
                        src={CompleteIcon}
                        alt="Complete icon"
                      />
                    )}
                    <div className="slider-item__info-image">
                      <img
                        className="slider-item__status-image"
                        data-testid="slider-item__status-image"
                        src={buildURL(url)}
                        style={badgeStyles}
                        alt="Status icon"
                      />
                    </div>
                    <div
                      className="row-block-item-title"
                      data-testid="row-block-item-title"
                      title={title}
                    >
                      {title}
                    </div>
                    <span className="slider-item__info-amount">
                      {isStatusComplete ? statusPoints : points}/{statusPoints}
                    </span>
                  </div>
                  <div className="slider-item__progress">
                    <div
                      className="slider-item__progress-track"
                      style={progressTrackStyles}
                    >
                      <OverlayTrigger
                        key="bottom"
                        placement="bottom"
                        overlay={(
                          <Tooltip id="tooltip-points">
                            {points}
                          </Tooltip>
                        )}
                      >
                        <div
                          className="slider-item__progress-track-end"
                          style={progressTrackEndStyles}
                        />
                      </OverlayTrigger>
                    </div>
                    <div
                      className="slider-item__progress-end"
                      style={progressEndStyles}
                    />
                  </div>
                </div>
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

StatusesBlock.propTypes = {
  status: PropTypes.string,
  statusItems: PropTypes.arrayOf(StatusPropType),
};

StatusesBlock.defaultProps = {
  status: '',
  statusItems: {},
};

export default StatusesBlock;
