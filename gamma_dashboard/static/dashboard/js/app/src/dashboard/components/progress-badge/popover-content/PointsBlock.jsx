import React from 'react';
import PropTypes from 'prop-types';
import { Badge } from '@openedx/paragon';

const PointsBlock = ({ studentPoints, statusPoints }) => (
  <ul className="pl-3 pr-3">
    <li>
      <Badge className="ml-2 mr-2" variant="info">
        {`${studentPoints}/${statusPoints}`}
      </Badge>
    </li>
  </ul>
);

PointsBlock.propTypes = {
  studentPoints: PropTypes.number.isRequired,
  statusPoints: PropTypes.number.isRequired,
};

export default PointsBlock;
