import React from 'react';
import PropTypes from 'prop-types';

import { isRtl } from '../../../../constants';
import { sanitizeDescriptionHtml } from '../../../../utils';

/**
 * A free-text block for the badge popover — used for the badge description and, for
 * manually-assigned badges, the "Manual assignment criteria" text. When a `label` is
 * given it is shown (bold) as a preface, mirroring the dependency block styling.
 *
 * Staff-authored text (description, manual criteria) may contain a simple hyperlink —
 * e.g. a Course Completion badge linking each required class — so those are rendered
 * as sanitized HTML via `asHtml`, matching the per-badge leaderboard page. Generated
 * strings (e.g. "Points for completion") stay plain text.
 */
const TextBlock = ({ label, text, asHtml }) => {
  const textClassName = `mb-0${label ? ' pl-3 pr-3' : ''}`;

  return (
    <div className="progress-badge-popover-text-block mb-1">
      {label && (
        <p className="mb-0">
          <strong>{isRtl ? `:${label}` : `${label}:`}</strong>
        </p>
      )}
      {asHtml ? (
        // Sanitized first (see sanitizeDescriptionHtml): only inline formatting and
        // anchors survive, and links are forced to open in a new tab.
        <p
          className={textClassName}
          dangerouslySetInnerHTML={{ __html: sanitizeDescriptionHtml(text) }}
        />
      ) : (
        <p className={textClassName}>{text}</p>
      )}
    </div>
  );
};

TextBlock.propTypes = {
  label: PropTypes.string,
  text: PropTypes.string.isRequired,
  asHtml: PropTypes.bool,
};

TextBlock.defaultProps = {
  label: '',
  asHtml: false,
};

export default TextBlock;
