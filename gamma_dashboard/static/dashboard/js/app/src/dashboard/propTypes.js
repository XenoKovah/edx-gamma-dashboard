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
        title: PropTypes.string.isRequired,
        slug: PropTypes.string,
        description: PropTypes.string,
        done: PropTypes.bool,
        progress: PropTypes.oneOfType([
          PropTypes.arrayOf(
            PropTypes.shape({
              events: PropTypes.objectOf(
                PropTypes.shape({
                  goal: PropTypes.number.isRequired,
                  last: PropTypes.string,
                  count: PropTypes.number.isRequired,
                }),
              ),
            }),
          ),
          PropTypes.objectOf(
            PropTypes.shape({
              count: PropTypes.number.isRequired,
              goal: PropTypes.number.isRequired,
              title: PropTypes.string,
            }),
          ),
        ]),
        objectId: PropTypes.number,
        objectUri: PropTypes.string,
        isActive: PropTypes.bool,
        id: PropTypes.string,
        image: PropTypes.string,
        dependencies: PropTypes.arrayOf(PropTypes.string),
        statusDependency: PropTypes.arrayOf(PropTypes.string),
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
  eventConfiguration: PropTypes.number,
  action: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  filters: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  createdAt: PropTypes.string,
});

const AvatarPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  rules: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      eventConfiguration: PropTypes.number.isRequired,
      action: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
      filters: PropTypes.object, // eslint-disable-line react/forbid-prop-types
      createdAt: PropTypes.string,
    }),
  ).isRequired,
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
