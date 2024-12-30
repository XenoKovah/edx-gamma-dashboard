import React from 'react';
import PropTypes from 'prop-types';

import { capitalizeFirstLetter } from '../../../../../utils';

const ProgressBlock = ({ progressValues }) => {
  const { count = 0, goal = 0, title: progressTitle = '' } = progressValues || {};

  return (
    <ul>
      <li>
        <span>
          {`${Math.min(count, goal)}/${goal}`}
        </span>
        {capitalizeFirstLetter(progressTitle)}
      </li>
    </ul>
  );
};

ProgressBlock.propTypes = {
  progressValues: PropTypes.shape({
    count: PropTypes.number,
    goal: PropTypes.number,
    title: PropTypes.string,
  }).isRequired,
};

export default ProgressBlock;
