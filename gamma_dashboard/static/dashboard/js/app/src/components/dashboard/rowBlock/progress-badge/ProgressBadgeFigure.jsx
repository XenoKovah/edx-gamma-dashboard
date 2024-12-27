import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Image } from '@openedx/paragon';

import { useTranslate } from '../../../../i18n/utils';
import { buildURL } from '../../../../utils';

const ProgressBadgeFigure = ({ setReferenceElement, imageSrc, isDisabled }) => (
  <div
    className={classNames('progress-badge-figure', {
      'progress-badge-figure-disabled': isDisabled,
    })}
    data-testid="progress-badge-figure"
    ref={setReferenceElement}
  >
    <Image
      className="progress-badge-figure-image"
      data-testid="progress-badge-figure-image"
      src={buildURL(imageSrc)}
      alt={useTranslate('dashboard.progress-badge.figure.image.screen-reader.text')}
    />
  </div>
);

ProgressBadgeFigure.propTypes = {
  setReferenceElement: PropTypes.func.isRequired,
  imageSrc: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool,
};

ProgressBadgeFigure.defaultProps = {
  isDisabled: false,
};

export default ProgressBadgeFigure;
