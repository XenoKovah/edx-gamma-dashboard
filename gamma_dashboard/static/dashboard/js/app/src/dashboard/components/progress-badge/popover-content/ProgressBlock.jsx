import React from 'react';
import PropTypes from 'prop-types';
import { Badge } from '@openedx/paragon';

import { capitalizeFirstLetter } from '../../../../utils';

const ProgressBlock = ({ progressValues }) => {
  const { count = 0, goal = {}, title: progressTitle = '' } = progressValues || {};
  const targetValue = goal?.count || goal?.points || 0;

  return (
    <ul className="pl-3 pr-3 mb-0">
      <li>
        <Badge className="ml-2 mr-2" variant="info">
          {`${Math.min(count, targetValue)}/${targetValue}`}
        </Badge>
        {capitalizeFirstLetter(progressTitle)}
      </li>
    </ul>
  );
};

ProgressBlock.propTypes = {
  progressValues: PropTypes.shape({
    count: PropTypes.number,
    goal: PropTypes.shape({
      count: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      points: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    }),
    title: PropTypes.string,
  }).isRequired,
};

export default ProgressBlock;
