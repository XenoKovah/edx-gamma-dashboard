import PropTypes from 'prop-types';

import { ProgressPropType, StatusPropType } from '../generic/propTypes';

const ProgressDataPropType = PropTypes.objectOf(
  PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      points: PropTypes.number.isRequired,
    }),
  ),
);

const ChartDataPropType = PropTypes.objectOf(
  PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      points: PropTypes.number.isRequired,
      title: PropTypes.string,
    }),
  ]),
);

const BadgeItemPropType = PropTypes.arrayOf(
  PropTypes.shape({
    title: PropTypes.string,
    url: PropTypes.string,
    progress: PropTypes.objectOf(
      PropTypes.shape({
        count: PropTypes.number.isRequired,
        goal: PropTypes.number.isRequired,
      }),
    ),
    done: PropTypes.bool,
    active: PropTypes.bool,
    points: PropTypes.number,
    statusPoints: PropTypes.number,
  }),
);

export {
  ProgressDataPropType,
  ChartDataPropType,
  BadgeItemPropType,
  ProgressPropType,
  StatusPropType,
};
