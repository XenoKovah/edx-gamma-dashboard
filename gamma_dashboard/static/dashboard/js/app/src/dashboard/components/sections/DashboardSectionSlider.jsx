import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@openedx/paragon';

import DashboardSectionHeader from './DashboardSectionHeader';
import DashboardSection from './DashboardSection';

const DashboardSectionSlider = ({
  title,
  status,
  description,
  content,
  items,
  buttonData: {
    title: buttonTitle,
    onClick: buttonOnClick,
  },
  fullWidth,
}) => (
  <DashboardSection fullWidth={fullWidth}>
    <DashboardSectionHeader
      title={title}
      status={status}
      description={description}
    />
    <p
      className="block-description"
      data-testid="slider-statuses-block-description"
    >
      {content}
    </p>
    <ul
      className="progress-badges-list p-0 mb-0"
      data-testid="progress-badges-list"
    >
      {items}
    </ul>
    <div className="progress-badges-details-btn-wrapper">
      <Button
        data-testid="progress-badges-details-btn"
        title={buttonTitle}
        variant="outline-primary"
        onClick={buttonOnClick}
      >
        {buttonTitle}
      </Button>
    </div>
  </DashboardSection>
);

DashboardSectionSlider.propTypes = {
  title: PropTypes.string,
  status: PropTypes.string,
  description: PropTypes.string,
  content: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.node),
  buttonData: PropTypes.shape({
    title: PropTypes.string,
    onClick: PropTypes.func,
  }),
  fullWidth: PropTypes.bool,
};

DashboardSectionSlider.defaultProps = {
  title: '',
  status: '',
  description: '',
  content: '',
  items: null,
  buttonData: {
    title: '',
    onClick: () => {},
  },
  fullWidth: false,
};
export default DashboardSectionSlider;
