import React from 'react';
import PropTypes from 'prop-types';

import LilStrangerLink from '../../../generic/lil-stranger/LilStrangerLink';

const DashboardSectionImage = ({ src }) => (
  <div className="dashboard-section-image-wrapper">
    <LilStrangerLink>
      <img
        className="dashboard-section-image"
        data-testid="dashboard-section-image"
        src={src}
        alt=""
      />
    </LilStrangerLink>
  </div>
);

DashboardSectionImage.propTypes = {
  src: PropTypes.string.isRequired,
};

export default DashboardSectionImage;
