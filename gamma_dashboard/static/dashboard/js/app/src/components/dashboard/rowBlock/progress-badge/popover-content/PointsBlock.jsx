import React from 'react';
import PropTypes from 'prop-types';

const PointsBlock = ({ studentPoints, statusPoints }) => (
  <ul>
    <li>
      <span>
        {`${studentPoints}/${statusPoints}`}
      </span>
    </li>
  </ul>
);

PointsBlock.propTypes = {
  studentPoints: PropTypes.number.isRequired,
  statusPoints: PropTypes.number.isRequired,
};

export default PointsBlock;
