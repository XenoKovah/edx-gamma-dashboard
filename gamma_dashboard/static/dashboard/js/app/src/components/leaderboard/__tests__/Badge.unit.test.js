import React from 'react';

import '@testing-library/jest-dom';
import { render, cleanup } from '@testing-library/react';

import Badge from '../Badge';


afterEach(cleanup);


describe('<Badge>', () => {
    it('renders', () => {
        const { getByTestId } = render(<Badge />);

        expect(getByTestId('leaderboard-badge')).toBeInTheDocument();
    });

    it('has correct src attribute', () => {
        const testUrl = 'https://localhost/static/images/link.png';

        const { getByTestId } = render(<Badge url={testUrl} />);
        const badgeImage = getByTestId('leaderboard-badge');

        expect(badgeImage).toHaveAttribute('src', testUrl);
    });
});
