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
  PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        progress: PropTypes.objectOf(
          PropTypes.shape({
            count: PropTypes.number.isRequired,
            goal: PropTypes.shape({
              points: PropTypes.string,
              count: PropTypes.string,
            }),
            title: PropTypes.string.isRequired,
          }),
        ),
        dependencies: PropTypes.arrayOf(PropTypes.string),
        statusDependency: PropTypes.oneOfType([
          PropTypes.arrayOf(PropTypes.string),
          PropTypes.oneOf([null]),
        ]),
        done: PropTypes.bool.isRequired,
        isActive: PropTypes.bool.isRequired,
      }),
    ]),
  ),
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
  action: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    ]),
  ),
  filters: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  createdAt: PropTypes.string,
});

const AvatarPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  rules: PropTypes.arrayOf(AvatarRulePropType).isRequired,
  stage: PropTypes.number,
  createdAt: PropTypes.string.isRequired,
});

const AvatarSetsPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  avatars: PropTypes.arrayOf(AvatarPropType).isRequired,
  useInCourses: PropTypes.arrayOf(PropTypes.number).isRequired,
  isDraft: PropTypes.bool.isRequired,
  createdAt: PropTypes.string.isRequired,
});

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
