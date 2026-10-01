import React from 'react';
import PropTypes from 'prop-types';

import { URLS } from '../../routes/constants';

/**
 * Wraps a Li'l Stranger image so that clicking it opens the mascot's "says hello" page.
 * The page is served by the LMS (ost2_lil_stranger plugin), outside this app's router, so
 * this is a plain link rather than a router <Link>.
 */
const LilStrangerLink = ({ children, className }) => (
  <a
    className={className}
    href={URLS.lilStranger}
    aria-label="Say hello to Li'l Stranger"
    data-testid="lil-stranger-link"
  >
    {children}
  </a>
);

LilStrangerLink.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

LilStrangerLink.defaultProps = {
  className: undefined,
};

export default LilStrangerLink;
