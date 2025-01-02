import PropTypes from 'prop-types';

export const ProgressDataPropType = PropTypes.objectOf(
  PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      points: PropTypes.number.isRequired,
    }),
  ),
);

export const ChartDataPropType = PropTypes.objectOf(
  PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      points: PropTypes.number.isRequired,
      title: PropTypes.string,
    }),
  ]),
);

export const BadgeItemPropType = PropTypes.arrayOf(
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
