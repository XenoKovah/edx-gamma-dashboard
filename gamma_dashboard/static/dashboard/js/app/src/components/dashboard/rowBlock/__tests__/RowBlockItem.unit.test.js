import React from 'react';

import '@testing-library/jest-dom';
import {
    render,
    cleanup,
    within
} from '@testing-library/react';

import RowBlockItem from '../RowBlockItem';


afterEach(cleanup);

describe('<RowBlockItem>', () => {
    it('renders with correct `complete badge` data', () => {
        const data = {
            done: true,
            id: "3",
            progress: {},
            title: "Badge for filter 1",
            url: "https://gamma-url.com/badge3.png",
        };

        const { getByTestId, queryByTestId } = render(
            <RowBlockItem
                data={data}
            />
        );

        const figure = getByTestId('row-block-item-figure');
        expect(figure).not.toHaveClass('row-block-item-figure-disabled')

        const title = getByTestId('row-block-item-title');
        expect(title).toHaveTextContent(data.title);

        const popup = queryByTestId('row-block-item-popup');
        expect(popup).not.toBeInTheDocument();
    });

    it('renders with correct `incomplete badge` data', () => {
        const data = {
            done: false,
            id: "3",
            progress: {},
            title: "Badge for filter 1",
            url: "https://gamma-url.com/badge3.png",
        };

        const { getByTestId } = render(
            <RowBlockItem
                data={data}
            />
        );

        const figure = getByTestId('row-block-item-figure');
        expect(figure).toHaveClass('row-block-item-figure-disabled')

        const title = getByTestId('row-block-item-title');
        expect(title).toHaveTextContent(data.title);

        const popup = getByTestId('row-block-item-popup');
        expect(popup).toBeInTheDocument();
    });

    it('renders with correct `complete status` data', () => {
        const data = {
            active: true,
            color: "",
            points: 180,
            slug: "test-status",
            statusPoints: 150,
            status_uid: "test-status",
            title: "Test status",
            url: "https://gamma-url.com/status-test-status.png",
        };

        const { getByTestId, queryByTestId } = render(
            <RowBlockItem
                data={data}
            />
        );
        const figure = getByTestId('row-block-item-figure');
        expect(figure).not.toHaveClass('row-block-item-figure-disabled')

        const title = getByTestId('row-block-item-title');
        expect(title.textContent).toBe(data.title);

        const popup = queryByTestId('row-block-item-popup');
        expect(popup).not.toBeInTheDocument();
    });

    it('renders with correct `incomplete status` data', () => {
        const data = {
            active: true,
            color: "",
            points: 180,
            slug: "test-status",
            statusPoints: 250,
            status_uid: "test-status",
            title: "Test status",
            url: "https://gamma-url.com/status-test-status.png",
        };

        const { getByTestId } = render(
            <RowBlockItem
                data={data}
            />
        );

        const figure = getByTestId('row-block-item-figure');
        expect(figure).toHaveClass('row-block-item-figure-disabled')

        const title = getByTestId('row-block-item-title');
        expect(title).toHaveTextContent(data.title);

        const popup = getByTestId('row-block-item-popup');
        expect(popup).toBeInTheDocument();
    });

    it('renders with correct but zeroed `incomplete status` data', () => {
        const data = {
            active: true,
            color: "",
            points: 0,
            slug: "test-status",
            statusPoints: 669,
            status_uid: "test-status",
            title: "Test status",
            url: "https://gamma-url.com/status-test-status.png",
        };
        const progressString = `${data.points}/${data.statusPoints}`;
        const { getByTestId } = render(
            <RowBlockItem
                data={data}
            />
        );

        const figure = getByTestId('row-block-item-figure');
        expect(figure).toHaveClass('row-block-item-figure-disabled')

        const title = getByTestId('row-block-item-title');
        expect(title).toHaveTextContent(data.title);

        const popup = getByTestId('row-block-item-popup');
        expect(popup).toBeInTheDocument();
        expect(popup).toHaveTextContent(progressString);
    });

    it('renders with `center` prop defined', () => {
        const data = {
            active: true,
            color: "",
            points: 180,
            slug: "test-status",
            statusPoints: 150,
            status_uid: "test-status",
            title: "Test status",
            url: "https://gamma-url.com/status-test-status.png",
        };

        const { getByTestId, queryByTestId } = render(
            <RowBlockItem
                data={data}
                center
            />
        );

        const rowBlockItem = getByTestId('row-block-item');
        expect(rowBlockItem).toHaveClass('row-block-item-center');
    });

    it('renders without data', () => {
        const { getByTestId, queryByTestId } = render(<RowBlockItem />);

        const rowBlockItem = getByTestId('row-block-item');
        expect(rowBlockItem).toBeInTheDocument();
    });
});
