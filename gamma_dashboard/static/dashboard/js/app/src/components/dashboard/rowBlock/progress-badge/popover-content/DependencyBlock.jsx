import React from 'react';
import PropTypes from 'prop-types';

import { isRtl } from '../../../../../constants';

const DependencyBlock = ({ text, items }) => (
  <>
    <p>
      {isRtl ? `:${text}` : `${text}:`}
    </p>
    <ul>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  </>
);

DependencyBlock.propTypes = {
  text: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default DependencyBlock;
