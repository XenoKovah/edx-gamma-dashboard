import React from 'react';
import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';

import { renderWithProviders } from '../../../../setupTests';
import RowBlockItemPopup from '../RowBlockItemPopup';

afterEach(cleanup);

describe('<RowBlockItemPopup>', () => {
  it('renders with correct `status` data', () => {
    const title = 'Test title';
    const data = {
      points: 180,
      statusPoints: 250,
    };
    const progressString = `${data.points}/${data.statusPoints}`;

    const { getByText } = renderWithProviders(
      <RowBlockItemPopup
        title={title}
        data={data}
      />,
    );

    expect(getByText(title)).toBeInTheDocument();
    expect(getByText(progressString)).toBeInTheDocument();
  });

  it('renders with correct but zeroed `status` data', () => {
    const title = 'Test title';
    const data = {
      points: 0,
      statusPoints: 669,
    };
    const progressString = `${data.points}/${data.statusPoints}`;

    const { getByText } = renderWithProviders(
      <RowBlockItemPopup
        title={title}
        data={data}
      />,
    );

    expect(getByText(title)).toBeInTheDocument();
    expect(getByText(progressString)).toBeInTheDocument();
  });

  it('renders with correct `badge` data', () => {
    const title = 'Test title';
    const badgeDependencies = [
      'Test badge 1',
      'Test badge 2',
    ];
    const statusDependency = 'Test status';

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

    const { getByText } = renderWithProviders(
      <RowBlockItemPopup
        title={title}
        data={data}
      />,
    );

    expect(getByText(title)).toBeInTheDocument();

    for (const progressItemName in data.progress) {
      if (Object.hasOwn(data.progress, progressItemName)) { // Guard statement
        const progressCount = data.progress[progressItemName].count;
        const progressGoal = data.progress[progressItemName].goal;

        const itemProgressString = `${progressCount}/${progressGoal}`;
        const itemTitle = `${data.progress[progressItemName]
          .title.slice(0, 1).toUpperCase()}${data.progress[progressItemName].title.slice(1)}`;

        expect(getByText(itemProgressString)).toBeInTheDocument();
        expect(getByText(itemTitle)).toBeInTheDocument();
      }
    }

    expect(getByText('Depends on badges:')).toBeInTheDocument();
    for (const badgeName of badgeDependencies) {
      expect(getByText(badgeName)).toBeInTheDocument();
    }

    expect(getByText('Depends on status:')).toBeInTheDocument();
    expect(getByText(statusDependency)).toBeInTheDocument();
  });

  it('renders without data', () => {
    const { getByTestId } = renderWithProviders(<RowBlockItemPopup />);

    const popup = getByTestId('row-block-item-popup');
    const head = getByTestId('item-head');
    const body = getByTestId('item-body');

    expect(popup).toBeInTheDocument();
    expect(head).toBeInTheDocument();
    expect(body).toBeInTheDocument();
  });

  it('displays progress count value if it equals the goal value', () => {
    const title = 'Test title';
    const badgeDependencies = [
      'Test badge',
    ];

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

    const { getByText } = renderWithProviders(
      <RowBlockItemPopup
        title={title}
        data={data}
      />,
    );

    expect(getByText('4/4')).toBeInTheDocument();
  });

  it('displays the goal value for the progress if progress is greater than the goal', () => {
    const title = 'Test title';
    const badgeDependencies = [
      'Test badge',
    ];

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

    const { getByText } = renderWithProviders(
      <RowBlockItemPopup
        title={title}
        data={data}
      />,
    );

    expect(getByText('4/4')).toBeInTheDocument();
    expect(getByText('Problem graded')).toBeInTheDocument();
  });

  it('displays progress count value if it equals 0', () => {
    const title = 'Test title';
    const badgeDependencies = [
      'Test badge',
    ];

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

    const { getByText } = renderWithProviders(
      <RowBlockItemPopup
        title={title}
        data={data}
      />,
    );

    expect(getByText('0/4')).toBeInTheDocument();
    expect(getByText('Problem graded')).toBeInTheDocument();
  });

  it('displays progress count value if it does not exceed the goal value', () => {
    const title = 'Test title';
    const badgeDependencies = [
      'Test badge',
    ];

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

    const { getByText } = renderWithProviders(
      <RowBlockItemPopup
        title={title}
        data={data}
      />,
    );

    expect(getByText('1/4')).toBeInTheDocument();
  });
});
