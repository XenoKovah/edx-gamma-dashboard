import React from 'react';
import PropTypes from 'prop-types';
import { Badge } from '@openedx/paragon';

import { capitalizeFirstLetter } from '../../../../../utils';

const ProgressBlock = ({ progressValues }) => {
  const { count = 0, goal = 0, title: progressTitle = '' } = progressValues || {};

  return (
    <ul className="pl-3 pr-3">
      <li>
        <Badge className="ml-2 mr-2" variant="info">
          {`${Math.min(count, goal)}/${goal}`}
        </Badge>
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
