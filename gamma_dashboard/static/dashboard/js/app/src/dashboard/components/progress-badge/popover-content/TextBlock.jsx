import React from 'react';
import PropTypes from 'prop-types';

import { isRtl } from '../../../../constants';

/**
 * A free-text block for the badge popover — used for the badge description and, for
 * manually-assigned badges, the "Manual assignment criteria" text. When a `label` is
 * given it is shown (bold) as a preface, mirroring the dependency block styling.
 */
const TextBlock = ({ label, text }) => (
  <div className="progress-badge-popover-text-block mb-1">
    {label && (
      <p className="mb-0">
        <strong>{isRtl ? `:${label}` : `${label}:`}</strong>
      </p>
    )}
    <p className={`mb-0${label ? ' pl-3 pr-3' : ''}`}>{text}</p>
  </div>
);

TextBlock.propTypes = {
  label: PropTypes.string,
  text: PropTypes.string.isRequired,
};

TextBlock.defaultProps = {
  label: '',
};

export default TextBlock;
