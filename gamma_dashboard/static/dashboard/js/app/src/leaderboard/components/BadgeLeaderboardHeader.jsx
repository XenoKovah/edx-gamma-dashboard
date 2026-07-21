import React from 'react';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { Image } from '@openedx/paragon';

import { resolveUrl, sanitizeDescriptionHtml } from '../../utils';
import { GAMMA_ADMIN_BASE_URL } from '../../constants';
import { buildAccomplishmentsCategoryUrl } from '../../routes/constants';

import messages from '../../i18n';

/**
 * Header shown at the top of the per-badge leaderboard page: the badge's
 * category above the badge title, above a large (4x leaderboard-row size) badge
 * image, with the badge description below it, all centered.
 *
 * The category is a link into that category's section of the All
 * Accomplishments page. Badges with no category (and older Gamma builds, which
 * do not send the field at all) simply render without it.
 */
const BadgeLeaderboardHeader = ({ badge }) => {
  const intl = useIntl();
  const {
    title, description, url, category,
  } = badge;

  if (!title && !url && !description) {
    return null;
  }

  const trimmedCategory = (category || '').trim();

  return (
    <header
      className="badge-leaderboard-header text-center"
      data-testid="badge-leaderboard-header"
    >
      {trimmedCategory && (
        <a
          className="badge-leaderboard-header-category"
          data-testid="badge-leaderboard-header-category"
          href={buildAccomplishmentsCategoryUrl(trimmedCategory)}
          title={intl.formatMessage(messages.badgeLeaderboardCategoryLinkTitle, {
            category: trimmedCategory,
          })}
        >
          {trimmedCategory}
        </a>
      )}
      {title && (
        <h2
          className="badge-leaderboard-header-title"
          data-testid="badge-leaderboard-header-title"
        >
          {title}
        </h2>
      )}
      {url && (
        <Image
          className="badge-leaderboard-header-image"
          data-testid="badge-leaderboard-header-image"
          src={resolveUrl(url, GAMMA_ADMIN_BASE_URL)}
          alt={intl.formatMessage(messages.badgeLeaderboardImageAltText, { title: title || '' })}
        />
      )}
      {description && (
        // Descriptions are staff-authored and may include a simple link (e.g. a
        // Course Completion badge linking the course name to its class page), so
        // render sanitized HTML rather than plain text. See sanitizeDescriptionHtml.
        <p
          className="badge-leaderboard-header-description"
          data-testid="badge-leaderboard-header-description"
          dangerouslySetInnerHTML={{ __html: sanitizeDescriptionHtml(description) }}
        />
      )}
    </header>
  );
};

BadgeLeaderboardHeader.propTypes = {
  badge: PropTypes.shape({
    slug: PropTypes.string,
    title: PropTypes.string,
    category: PropTypes.string,
    description: PropTypes.string,
    url: PropTypes.string,
  }),
};

BadgeLeaderboardHeader.defaultProps = {
  badge: {},
};

export default BadgeLeaderboardHeader;
