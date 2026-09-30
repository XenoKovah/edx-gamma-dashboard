import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@openedx/paragon';

import DashboardSectionHeader from './DashboardSectionHeader';
import DashboardSection from './DashboardSection';
import DashboardSectionImage from './DashboardSectionImage';

const DashboardSectionSlider = ({
  title,
  status,
  description,
  content,
  contentLink,
  image,
  items,
  buttonData: {
    title: buttonTitle,
    onClick: buttonOnClick,
    href: buttonHref,
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
    {contentLink && (
      <p
        className="block-description small"
        data-testid="slider-content-link"
      >
        <a href={contentLink.href}>{contentLink.text}</a>
      </p>
    )}
    {image && <DashboardSectionImage src={image} />}
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
        {...(buttonHref ? { href: buttonHref } : { onClick: buttonOnClick })}
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
  contentLink: PropTypes.shape({
    text: PropTypes.string,
    href: PropTypes.string,
  }),
  image: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.node),
  buttonData: PropTypes.shape({
    title: PropTypes.string,
    onClick: PropTypes.func,
    href: PropTypes.string,
  }),
  fullWidth: PropTypes.bool,
};

DashboardSectionSlider.defaultProps = {
  title: '',
  status: '',
  description: '',
  content: '',
  contentLink: null,
  image: null,
  items: null,
  buttonData: {
    title: '',
    onClick: () => {},
    href: null,
  },
  fullWidth: false,
};
export default DashboardSectionSlider;
