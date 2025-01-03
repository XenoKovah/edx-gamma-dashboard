import React from 'react';
import '@testing-library/jest-dom';
import { cleanup, waitFor } from '@testing-library/react';

import { capitalizeFirstLetter } from '../../../utils';
import { renderWithProviders } from '../../../setupTests';
import { PopoverContent } from '../progress-badge/popover-content';

import messages from '../../../i18n/en';

afterEach(cleanup);

const badgeDependencies = ['Test badge 1'];

const getProgressString = ({ points, statusPoints }) => `${points}/${statusPoints}`;

describe('<PopoverContent>', () => {
  it('renders with correct `status` data', () => {
    const data = {
      points: 180,
      statusPoints: 250,
    };
    const progressString = getProgressString(data);

    const { getByText } = renderWithProviders(<PopoverContent data={data} />);

    expect(getByText(progressString)).toBeInTheDocument();
  });

  it('renders with correct but zeroed `status` data', () => {
    const data = {
      points: 0,
      statusPoints: 669,
    };
    const progressString = getProgressString(data);

    const { getByText } = renderWithProviders(<PopoverContent data={data} />);

    expect(getByText(progressString)).toBeInTheDocument();
  });

  it('renders with correct `badge` data', () => {
    const statusDependency = 'Test status';
    badgeDependencies.push('Test badge 2');

    const data = {
      badgeDependencies,
      progress: {
        edx_bookmark_added: {
          count: 0,
          goal: 1,
          title: 'edx bookmark added',
        },
        problem_graded: {
          count: 0,
          goal: 2,
          title: 'problem graded',
        },
      },
      statusDependency,
    };

    const { getByText } = renderWithProviders(<PopoverContent data={data} />);

    for (const [progressItemName, progressItem] of Object.entries(data.progress)) {
      if (Object.hasOwn(data.progress, progressItemName)) {
        const { count: progressCount, goal: progressGoal, title } = progressItem;

        const itemProgressString = `${progressCount}/${progressGoal}`;
        const itemTitle = capitalizeFirstLetter(title);

        expect(getByText(itemProgressString)).toBeInTheDocument();
        expect(getByText(itemTitle)).toBeInTheDocument();
      }
    }

    expect(getByText(`${messages['dashboard.badges.depends.on.badges.text'].defaultMessage}:`)).toBeInTheDocument();
    for (const badgeName of badgeDependencies) {
      expect(getByText(badgeName)).toBeInTheDocument();
    }

    expect(getByText(`${messages['dashboard.badges.depends.on.status.text'].defaultMessage}:`)).toBeInTheDocument();
    expect(getByText(statusDependency)).toBeInTheDocument();
  });

  it('renders without data', () => {
    const { getByTestId } = renderWithProviders(<PopoverContent />);

    waitFor(() => {
      const popup = getByTestId('popover-positioned-popover');
      const content = getByTestId('popover-content');

      expect(popup).toBeInTheDocument();
      expect(content).toBeInTheDocument();
    });
  });

  it('displays progress count value if it equals the goal value', () => {
    const data = {
      badgeDependencies,
      progress: {
        problem_graded: {
          count: 4,
          goal: 4,
          title: 'problem graded',
        },
      },
    };

    const { getByText } = renderWithProviders(<PopoverContent data={data} />);

    expect(getByText('4/4')).toBeInTheDocument();
  });

  it('displays the goal value for the progress if progress is greater than the goal', () => {
    const data = {
      badgeDependencies,
      progress: {
        problem_graded: {
          count: 5,
          goal: 4,
          title: 'problem graded',
        },
      },
    };

    const { getByText } = renderWithProviders(<PopoverContent data={data} />);

    expect(getByText('4/4')).toBeInTheDocument();
    expect(getByText('Problem graded')).toBeInTheDocument();
  });

  it('displays progress count value if it equals 0', () => {
    const data = {
      badgeDependencies,
      progress: {
        problem_graded: {
          count: 0,
          goal: 4,
          title: 'problem graded',
        },
      },
    };

    const { getByText } = renderWithProviders(<PopoverContent data={data} />);

    expect(getByText('0/4')).toBeInTheDocument();
    expect(getByText('Problem graded')).toBeInTheDocument();
  });

  it('displays progress count value if it does not exceed the goal value', () => {
    const data = {
      badgeDependencies,
      progress: {
        problem_graded: {
          count: 1,
          goal: 4,
          title: 'problem graded',
        },
      },
    };

    const { getByText } = renderWithProviders(<PopoverContent data={data} />);

    expect(getByText('1/4')).toBeInTheDocument();
  });
});
