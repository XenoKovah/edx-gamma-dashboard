import React from 'react';
import PropTypes from 'prop-types';
import { Alert as BaseAlert } from '@openedx/paragon';

const Alert = ({
  variant, icon, title, className, children,
}) => (
  <BaseAlert className={className} variant={variant} icon={icon}>
    <BaseAlert.Heading>
      {title}
    </BaseAlert.Heading>
    {children}
  </BaseAlert>
);

Alert.propTypes = {
  variant: PropTypes.string.isRequired,
  icon: PropTypes.element,
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
};

Alert.defaultProps = {
  icon: null,
  className: '',
  children: null,
};

export default Alert;
