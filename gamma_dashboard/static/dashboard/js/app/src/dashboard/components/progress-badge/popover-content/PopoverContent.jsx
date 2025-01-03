import React from 'react';
import PropTypes from 'prop-types';
import { Popover } from '@openedx/paragon';

import { useTranslate } from '../../../../i18n/utils';
import { ProgressPropType } from '../../../propTypes';
import DependencyBlock from './DependencyBlock';
import PointsBlock from './PointsBlock';
import ProgressBlock from './ProgressBlock';

const PopoverContent = ({ data }) => {
  const {
    statusDependency,
    statusPoints,
    badgeDependencies = [],
    progress: studentProgress = {},
    points: studentPoints = 0,
  } = data;

  const messages = {
    dependsOnBadgesText: useTranslate('dashboard.badges.depends.on.badges.text'),
    dependsOnStatusesText: useTranslate('dashboard.badges.depends.on.status.text'),
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
      ? [renderDependencyBlock(messages.dependsOnBadgesText, badgeDependencies)]
      : []),
    ...(statusDependency
      ? [renderDependencyBlock(messages.dependsOnStatusesText, [statusDependency])]
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
