import React from 'react';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { Image } from '@openedx/paragon';

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

  // The title is surfaced via the native `title` attribute rather than a Paragon
  // tooltip: these icons live inside an `overflow: hidden` leaderboard Card, which
  // clips/mis-positions an inline popper tooltip. The browser renders the native
  // tooltip at the cursor, above everything, so it never overlaps the icon.
  if (!slug) {
    // No per-badge leaderboard to link to; still surface the title on hover.
    return (
      <span className="badge-item-wrapper" title={title || undefined}>
        {image}
      </span>
    );
  }

  // When the badge has a slug, link the icon to its (site-wide) per-badge leaderboard.
  // A plain anchor is used so it works both inside the standalone leaderboard SPA and
  // from the LMS course-leaderboard tab (a full navigation to the dashboard page).
  return (
    <a
      href={buildBadgeLeaderboardUrl(slug)}
      className="badge-item-link"
      data-testid="leaderboard-badge-link"
      title={title || undefined}
      aria-label={title || undefined}
    >
      {image}
    </a>
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
