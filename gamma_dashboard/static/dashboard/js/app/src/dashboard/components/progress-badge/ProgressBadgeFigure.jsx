import React from 'react';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Image } from '@openedx/paragon';

import { buildURL } from '../../../utils';

import messages from '../../../i18n';

const ProgressBadgeFigure = ({ imageSrc, isDisabled }) => {
  const intl = useIntl();

  const translations = {
    figureImageAltText: intl.formatMessage(messages.dashboardProgressBadgeFigureImageScreenReaderText),
  };

  return (
    <div
      className={classNames('progress-badge-figure', {
        'progress-badge-figure-disabled': isDisabled,
      })}
      data-testid="progress-badge-figure"
    >
      <Image
        className="progress-badge-figure-image"
        data-testid="progress-badge-figure-image"
        src={buildURL(imageSrc)}
        alt={translations.figureImageAltText}
      />
    </div>
  );
};

ProgressBadgeFigure.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool,
};

ProgressBadgeFigure.defaultProps = {
  isDisabled: false,
};

export default ProgressBadgeFigure;
