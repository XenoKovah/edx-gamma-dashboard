import React from 'react';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { Image } from '@openedx/paragon';

import { buildURL } from '../../utils';

import messages from '../../i18n';

const Badge = ({ url }) => {
  const intl = useIntl();

  return (
    <Image
      className="badge-item"
      data-testid="leaderboard-badge"
      src={buildURL(url)}
      alt={intl.formatMessage(messages.performanceBadgesItemImageAlternativeText)}
    />
  );
};

Badge.propTypes = {
  url: PropTypes.string.isRequired,
};

export default Badge;
