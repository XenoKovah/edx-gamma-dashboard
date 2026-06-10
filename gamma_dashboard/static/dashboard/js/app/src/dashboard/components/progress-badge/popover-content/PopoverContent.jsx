import React from 'react';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { Popover } from '@openedx/paragon';

import { ProgressPropType } from '../../../propTypes';
import DependencyBlock from './DependencyBlock';
import PointsBlock from './PointsBlock';
import ProgressBlock from './ProgressBlock';
import TextBlock from './TextBlock';

import messages from '../../../../i18n';

const PopoverContent = ({ data }) => {
  const intl = useIntl();
  const {
    description = '',
    manualCriteria = '',
    statusDependency,
    statusPoints,
    badgeDependencies = [],
    progress: studentProgress = {},
    points: studentPoints = 0,
  } = data;

  const translations = {
    dependsOnBadgesText: intl.formatMessage(messages.dashboardBadgesDependsOnBadgesText),
    dependsOnStatusesText: intl.formatMessage(messages.dashboardBadgesDependsOnStatusText),
    manualCriteriaText: intl.formatMessage(messages.dashboardBadgesManualCriteriaText),
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
    // Shown on hover for every incomplete badge.
    ...(description ? [<TextBlock key="description" text={description} />] : []),
    // Manual-only (rule-less) badges surface their manual assignment criteria here.
    ...(manualCriteria
      ? [<TextBlock key="manual-criteria" label={translations.manualCriteriaText} text={manualCriteria} />]
      : []),
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
    description: PropTypes.string,
    manualCriteria: PropTypes.string,
    badgeDependencies: PropTypes.arrayOf(PropTypes.string),
    statusDependency: PropTypes.string,
    progress: PropTypes.shape(ProgressPropType),
    points: PropTypes.number,
    statusPoints: PropTypes.number,
  }),
};

PopoverContent.defaultProps = {
  data: {
    description: '',
    manualCriteria: '',
    badgeDependencies: [],
    statusDependency: '',
    progress: {},
    points: -1,
    statusPoints: 0,
  },
};

export default PopoverContent;
