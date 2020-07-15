import React from 'react';

import '@testing-library/jest-dom';
import { render, cleanup } from '@testing-library/react';

import RowBlockItemPopup from '../RowBlockItemPopup';


afterEach(cleanup);

describe('<RowBlockItemPopup>', () => {
    it('renders with correct `status` data', () => {
        const title = 'Test title';
        const data = {
            points: 180,
            statusPoints: 250
        };
        const progressString = `${data.points}/${data.statusPoints}`;

        const { getByText } = render(
            <RowBlockItemPopup
                title={title}
                data={data}
            />
        );

        expect(getByText(title)).toBeInTheDocument();
        expect(getByText(progressString)).toBeInTheDocument();
    });

    it('renders with correct `badge` data', () => {
        const title = 'Test title';
        const badgeDependencies = [
            'Test badge 1',
            'Test badge 2'
        ];
        const statusDependency = 'Test status';

        const data = {
            badgeDependencies: badgeDependencies,
            progress: {
                edx_bookmark_added: {
                    count: 0,
                    goal: 1
                },
                problem_graded:{
                    count: 0,
                    goal: 2
                }
            },
            statusDependency: statusDependency
        };

        const { getByText } = render(
            <RowBlockItemPopup
                title={title}
                data={data}
            />
        );

        expect(getByText(title)).toBeInTheDocument();

        for (const progressItemName in data.progress) {
            const progressCount = data.progress[progressItemName].count;
            const progressGoal = data.progress[progressItemName].goal;

            const itemProgressString = `${progressCount}/${progressGoal}`;
            const itemTitle = `${progressItemName.slice(0, 1).toUpperCase()}${progressItemName.slice(1)}`;

            expect(getByText(itemProgressString)).toBeInTheDocument();
            expect(getByText(itemTitle)).toBeInTheDocument();
        }

        expect(getByText('Depends on badges:')).toBeInTheDocument();
        for (const badgeName of badgeDependencies) {
            expect(getByText(badgeName)).toBeInTheDocument();
        }

        expect(getByText('Depends on status:')).toBeInTheDocument();
        expect(getByText(statusDependency)).toBeInTheDocument();
    });

    it('renders without data', () => {
        const { getByTestId } = render(<RowBlockItemPopup />);

        const popup = getByTestId('row-block-item-popup');
        const head = getByTestId('item-head');
        const body = getByTestId('item-body');

        expect(popup).toBeInTheDocument();
        expect(head).toBeInTheDocument();
        expect(body).toBeInTheDocument();
    });
});
