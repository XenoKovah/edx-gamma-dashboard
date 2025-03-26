import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@openedx/paragon';

import DashboardSectionHeader from './DashboardSectionHeader';
import DashboardSection from './DashboardSection';

const DashboardSectionAvatar = ({
  title,
  items,
  status,
  content,
  description,
  buttonData: {
    title: buttonTitle,
    onClick: buttonOnClick,
  },
}) => (
  <DashboardSection>
    <DashboardSectionHeader
      title={title}
      status={status}
      description={description}
    />
    <p
      className="slider-statuses-block-description"
      data-testid="slider-statuses-block-description"
    >
      {content}
    </p>
    <ul
      className="progress-avatar-list p-0 mb-0"
      data-testid="progress-avatar-list"
    >
      {items}
    </ul>
    <div className="progress-avatar-details-btn-wrapper">
      <Button
        data-testid="progress-avatar-details-btn-wrapper"
        title={buttonTitle}
        variant="outline-primary"
        onClick={buttonOnClick}
      >
        {buttonTitle}
      </Button>
    </div>
  </DashboardSection>
);

DashboardSectionAvatar.propTypes = {
  title: PropTypes.string,
  status: PropTypes.string,
  description: PropTypes.string,
  content: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.node),
  buttonData: PropTypes.shape({
    title: PropTypes.string,
    onClick: PropTypes.func,
  }),
};

DashboardSectionAvatar.defaultProps = {
  title: '',
  status: '',
  description: '',
  content: '',
  items: null,
  buttonData: {
    title: '',
    onClick: () => {},
  },

};
export default DashboardSectionAvatar;
