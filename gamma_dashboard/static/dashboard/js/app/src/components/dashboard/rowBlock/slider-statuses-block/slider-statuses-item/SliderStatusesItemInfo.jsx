import React from 'react';
import PropTypes from 'prop-types';
import { Image } from '@openedx/paragon';

import { useTranslate as translate } from '../../../../../i18n/utils';
import { buildURL } from '../../../../../utils';
import { badgeStylesTypes } from './propTypes';

import CompleteIcon from '../../../../../assets/images/complete-icon.svg';

const SliderStatusesItemInfo = ({
  isStatusComplete, badgeStyles, statusPoints, points, url, title,
}) => (
  <div className="slider-item-info">
    {isStatusComplete && (
      <Image
        className="slider-item-info-icon"
        src={CompleteIcon}
        alt={translate('dashboard.slider-item.info.icon.complete.screen-reader.text')}
      />
    )}
    <div className="slider-item-info-image">
      <Image
        className="slider-item-status-image"
        data-testid="slider-item-status-image"
        src={buildURL(url)}
        style={badgeStyles}
        alt={translate('dashboard.slider-item.info.icon.status.screen-reader.text')}
      />
    </div>
    <div
      className="slider-item-info-title"
      data-testid="row-block-item-title"
      title={title}
    >
      {title}
    </div>
    <span className="slider-item-info-amount">
      {isStatusComplete ? statusPoints : points}/{statusPoints}
    </span>
  </div>
);

SliderStatusesItemInfo.propTypes = {
  isStatusComplete: PropTypes.bool.isRequired,
  badgeStyles: PropTypes.shape(badgeStylesTypes).isRequired,
  statusPoints: PropTypes.number.isRequired,
  points: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default SliderStatusesItemInfo;
