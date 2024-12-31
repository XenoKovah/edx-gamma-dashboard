import React from 'react';

import '@testing-library/jest-dom';
import { render, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CustomRowBlock from '../CustomRowBlock';

afterEach(cleanup);

const buttonTitle = 'Test button';

describe('<CustomRowBlock>', () => {
  it('renders', () => {
    const content = 'Test content';
    const buttonOnClickHandler = jest.fn();

    const { getByTestId, getByRole } = render(
      <CustomRowBlock
        content={content}
        items={(<div data-testid="test-items" />)}
        buttonData={{
          title: buttonTitle,
          onClick: buttonOnClickHandler,
        }}
      />,
    );

    const tableRowBlock = getByTestId('dashboard-table-row-block');
    const rowBlockHeader = getByTestId('table-row-block-header');
    const detailsButton = getByRole('button', { name: buttonTitle });
    const contentContainer = getByTestId('slider-statuses-block-description');
    const itemsContainer = getByTestId('progress-badges-list');
    const testItems = getByTestId('test-items');

    expect(tableRowBlock).toBeInTheDocument();
    expect(rowBlockHeader).toBeInTheDocument();

    expect(contentContainer).toBeInTheDocument();
    expect(contentContainer).toHaveTextContent(content);

    expect(itemsContainer).toBeInTheDocument();
    expect(testItems).toBeInTheDocument();

    expect(detailsButton).toBeInTheDocument();
    expect(detailsButton).toHaveTextContent(buttonTitle);

    userEvent.click(detailsButton);
    expect(buttonOnClickHandler).toHaveBeenCalledTimes(1);
  });

  it('renders without data', () => {
    const { getByTestId, getByRole } = render(<CustomRowBlock />);

    const tableRowBlock = getByTestId('dashboard-table-row-block');
    const rowBlockHeader = getByTestId('table-row-block-header');
    const detailsButton = getByRole('button');
    const contentContainer = getByTestId('slider-statuses-block-description');
    const itemsContainer = getByTestId('progress-badges-list');

    expect(tableRowBlock).toBeInTheDocument();
    expect(rowBlockHeader).toBeInTheDocument();
    expect(contentContainer).toBeInTheDocument();
    expect(itemsContainer).toBeInTheDocument();
    expect(detailsButton).toBeInTheDocument();
  });
});
