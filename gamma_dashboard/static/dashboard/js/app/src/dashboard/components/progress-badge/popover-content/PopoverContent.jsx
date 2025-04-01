import React from 'react';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { Popover } from '@openedx/paragon';

import { ProgressPropType } from '../../../propTypes';
import DependencyBlock from './DependencyBlock';
import PointsBlock from './PointsBlock';
import ProgressBlock from './ProgressBlock';

import messages from '../../../../i18n';

const PopoverContent = ({ data }) => {
  const intl = useIntl();
  const {
    statusDependency,
    statusPoints,
    badgeDependencies = [],
    progress: studentProgress = {},
    points: studentPoints = 0,
  } = data;

  const translations = {
    dependsOnBadgesText: intl.formatMessage(messages.dashboardBadgesDependsOnBadgesText),
    dependsOnStatusesText: intl.formatMessage(messages.dashboardBadgesDependsOnStatusText),
  };

  const renderProgressItems = () => Object.entries(studentProgress).map(([progressItem, progressValues]) => (
    <ProgressBlock
      key={`progress-${progressItem}`}
      progressValues={progressValues}
    />
  ));

  const renderDependencyBlock = (text, items) => (
    <DependencyBlock
      text={text}
      items={items}
    />
  );

  const renderStatusPoints = () => (
    <PointsBlock
      statusPoints={statusPoints}
      studentPoints={studentPoints}
    />
  );

  const bodyItems = [
    ...renderProgressItems(),
    ...(badgeDependencies.length > 0
      ? [renderDependencyBlock(translations.dependsOnBadgesText, badgeDependencies)]
      : []),
    ...(statusDependency
      ? [renderDependencyBlock(translations.dependsOnStatusesText, [statusDependency])]
      : []),
    ...(statusPoints ? [renderStatusPoints()] : []),
  ];

  return (
    <Popover.Content datatest-id="popover-content">
      {bodyItems}
    </Popover.Content>
  );
};

PopoverContent.propTypes = {
  data: PropTypes.shape({
    badgeDependencies: PropTypes.arrayOf(PropTypes.string),
    statusDependency: PropTypes.string,
    progress: PropTypes.shape(ProgressPropType),
    points: PropTypes.number,
    statusPoints: PropTypes.number,
  }),
};

PopoverContent.defaultProps = {
  data: {
    badgeDependencies: [],
    statusDependency: '',
    progress: {},
    points: -1,
    statusPoints: 0,
  },
};

export default PopoverContent;
