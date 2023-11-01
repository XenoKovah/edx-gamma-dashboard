import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import { OverlayTrigger, Tooltip } from '@edx/paragon';
import 'slick-carousel/slick/slick.scss';
import 'slick-carousel/slick/slick-theme.scss';

import CompleteIcon from '../../../../assets/icons/complete-icon.svg';
import '../../../../styles/app/dashboard/statuses-block.scss';
import { buildURL } from '../../../../utility/urlTools';
import { useStatusesBlock } from './useStatusesBlock';

const StatusesBlock = ({ status, statusItems }) => {
  const {
    sliderRef,
    sliderSettings,
    getProgressTrackStyles,
  } = useStatusesBlock({ statusItems });

  return (
    <div className="statuses-block">
      <div className="table-row-block-header" data-testid="table-row-block-header">
        <div className="table-row-block-title" data-testid="row-block-title">Your Statuses</div>
        <div className="table-row-block-status" data-testid="row-block-status"><span>{status}</span></div>
        <div className="table-row-block-description" data-testid="row-block-description"></div>
      </div>
      <p className="row-block-text" data-testid="row-block-text">
        The more points you have, the higher status you own.
      </p>
      {statusItems.length ? (
        <div className="statuses-block__slider">
          <Slider {...sliderSettings} ref={sliderRef}>
            {statusItems.map(({ status_uid, url, title, statusPoints, points }, index) => {
              const isStatusComplete = points >= statusPoints;
              const {
                badgeStyles,
                progressTrackStyles,
                progressTrackEndStyles,
                progressEndStyles
              } = getProgressTrackStyles(index);

              return (
                <div className="slider-item" key={status_uid} data-testid="slider-item">
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
                        data-testid="row-block-item-figure-image"
                        src={buildURL(url)}
                        style={badgeStyles}
                        alt="Status icon"
                      />
                    </div>
                    <div
                      className="row-block-item-title"
                      data-testid="row-block-item-title"
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
                        overlay={
                          <Tooltip id="tooltip-points">
                            {points}
                          </Tooltip>
                        }
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
              )
            })}
          </Slider>
        </div>
      ) : null}
    </div>
  );
};

StatusesBlock.defaultProps = {
  status: '0 of 0',
  statusItems: [],
};

StatusesBlock.propTypes = {
  status: PropTypes.string,
  statusItems: PropTypes.array,
};

export default StatusesBlock;
