import React from 'react';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { Image, OverlayTrigger, Tooltip } from '@openedx/paragon';

import { resolveUrl } from '../../utils';
import { GAMMA_ADMIN_BASE_URL } from '../../constants';
import { buildBadgeLeaderboardUrl } from '../../routes/constants';

import messages from '../../i18n';

const Badge = ({ url, title, slug }) => {
  const intl = useIntl();
  const altText = title || intl.formatMessage(messages.performanceBadgesItemImageAlternativeText);

  const image = (
    <Image
      className="badge-item"
      data-testid="leaderboard-badge"
      src={resolveUrl(url, GAMMA_ADMIN_BASE_URL)}
      alt={altText}
    />
  );

  // When the badge has a slug, link the icon to its (site-wide) per-badge leaderboard.
  // A plain anchor is used so it works both inside the standalone leaderboard SPA and
  // from the LMS course-leaderboard tab (a full navigation to the dashboard page).
  const content = slug ? (
    <a
      href={buildBadgeLeaderboardUrl(slug)}
      className="badge-item-link"
      data-testid="leaderboard-badge-link"
      aria-label={title || undefined}
    >
      {image}
    </a>
  ) : (
    <span className="badge-item-wrapper">{image}</span>
  );

  if (!title) {
    return content;
  }

  return (
    <OverlayTrigger
      placement="top"
      overlay={<Tooltip id={`leaderboard-badge-tooltip-${slug || 'badge'}`}>{title}</Tooltip>}
    >
      {content}
    </OverlayTrigger>
  );
};

Badge.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string,
  slug: PropTypes.string,
};

Badge.defaultProps = {
  title: '',
  slug: '',
};

export default Badge;
