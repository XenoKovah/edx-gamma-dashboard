import React from 'react';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Spinner } from '@openedx/paragon';

import messages from '../../i18n';

const Loader = ({ className }) => {
  const intl = useIntl();

  return (
    <div className={classNames('loader', className)}>
      <Spinner
        animation="border"
        screenReaderText={intl.formatMessage(messages.genericLoaderScreenReaderText)}
      />
    </div>
  );
};

Loader.propTypes = {
  className: PropTypes.string,
};

Loader.defaultProps = {
  className: undefined,
};

export default Loader;
