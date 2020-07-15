import React from 'react';

import '@testing-library/jest-dom';
import { render, cleanup } from '@testing-library/react';

import StatusRoadmapChart from '../StatusRoadmapChart';

import { statusRoadmap } from '../../../../fixtures/dashboard';


afterEach(cleanup);


const CHART_TITLE = 'Status Roadmap';
const CHART_DESCRIPTION = 'Here you can track your status progress: see how many points you have so far and how much is left for each status';


describe('<StatusRoadmapChart>', () => {
    it('renders', () => {
        const { getByText, getAllByText } = render(
            <StatusRoadmapChart
                data={statusRoadmap.statuses}
                points={statusRoadmap.points}
            />
        );

        const title = getByText(CHART_TITLE);
        const description = getByText(CHART_DESCRIPTION);
        const progressValues = getAllByText('180');

        expect(title).toBeInTheDocument();
        expect(description).toBeInTheDocument();
        expect(progressValues.length).toBe(2);
    });

    it('renders without data', () => {
        const { getByText, getAllByText } = render(<StatusRoadmapChart />);

        const title = getByText(CHART_TITLE);
        const description = getByText(CHART_DESCRIPTION);
        const progressValues = getAllByText('0');

        expect(title).toBeInTheDocument();
        expect(description).toBeInTheDocument();
        expect(progressValues.length).toBe(2);
    });
});
