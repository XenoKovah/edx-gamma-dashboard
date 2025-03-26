import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Spinner } from '@openedx/paragon';

import { useTranslate } from '../../i18n/utils';

const Loader = ({ className }) => (
  <div className={classNames('loader', className)}>
    <Spinner
      animation="border"
      screenReaderText={useTranslate('generic.loader.screenReader.text')}
    />
  </div>
);

Loader.propTypes = {
  className: PropTypes.string,
};

Loader.defaultProps = {
  className: undefined,
};

export default Loader;
