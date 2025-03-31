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

const ProcessingStatePropType = PropTypes.shape({
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  isSuccess: PropTypes.bool.isRequired,
});

const AvatarProcessingStatesPropType = PropTypes.shape({
  details: PropTypes.shape({
    update: ProcessingStatePropType.isRequired,
    select: ProcessingStatePropType.isRequired,
  }).isRequired,
}).isRequired;

const IdPropType = PropTypes.oneOfType([PropTypes.string, PropTypes.number]);

const AvatarRulePropType = PropTypes.shape({
  id: IdPropType.isRequired,
  eventConfiguration: PropTypes.number,
  action: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  filters: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  createdAt: PropTypes.string,
});

const AvatarPropType = PropTypes.shape({
  id: IdPropType.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string.isRequired,
  rules: PropTypes.arrayOf(AvatarRulePropType),
  stage: PropTypes.number,
  created_at: PropTypes.string,
});

const AvatarSetsPropType = PropTypes.arrayOf(
  PropTypes.shape({
    id: IdPropType.isRequired,
    title: PropTypes.string,
    avatars: PropTypes.arrayOf(AvatarPropType).isRequired,
  }),
).isRequired;

export {
  ProgressDataPropType,
  ChartDataPropType,
  BadgeItemPropType,
  ProgressPropType,
  StatusPropType,
  ProcessingStatePropType,
  AvatarProcessingStatesPropType,
  IdPropType,
  AvatarSetsPropType,
  AvatarPropType,
  AvatarRulePropType,
};
