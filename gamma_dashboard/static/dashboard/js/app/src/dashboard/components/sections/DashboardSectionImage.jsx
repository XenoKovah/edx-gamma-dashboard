import React from 'react';
import PropTypes from 'prop-types';

const DashboardSectionImage = ({ src }) => (
  <div className="dashboard-section-image-wrapper">
    <img
      className="dashboard-section-image"
      data-testid="dashboard-section-image"
      src={src}
      alt=""
    />
  </div>
);

DashboardSectionImage.propTypes = {
  src: PropTypes.string.isRequired,
};

export default DashboardSectionImage;
