import React from 'react';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { Image } from '@openedx/paragon';

import { resolveUrl } from '../../utils';
import { GAMMA_ADMIN_BASE_URL } from '../../constants';

import messages from '../../i18n';

const Badge = ({ url }) => {
  const intl = useIntl();

  return (
    <Image
      className="badge-item"
      data-testid="leaderboard-badge"
      src={resolveUrl(url, GAMMA_ADMIN_BASE_URL)}
      alt={intl.formatMessage(messages.performanceBadgesItemImageAlternativeText)}
    />
  );
};

Badge.propTypes = {
  url: PropTypes.string.isRequired,
};

export default Badge;
