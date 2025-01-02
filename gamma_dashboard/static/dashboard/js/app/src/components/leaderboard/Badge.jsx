import React from 'react';
import PropTypes from 'prop-types';
import { Image } from '@openedx/paragon';

import { buildURL } from '../../utils';
import { useTranslate } from '../../i18n/utils';

const Badge = ({ url }) => (
  <Image
    className="badge-item"
    data-testid="leaderboard-badge"
    src={buildURL(url)}
    alt={useTranslate('performance.badges.item.image.alternative.text')}
  />
);

Badge.propTypes = {
  url: PropTypes.string.isRequired,
};

export default Badge;
