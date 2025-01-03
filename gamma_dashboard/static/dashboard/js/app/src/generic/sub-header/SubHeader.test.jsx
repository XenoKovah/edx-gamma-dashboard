import React from 'react';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

import { renderWithProviders } from '../../setupTests';
import SubHeader from './SubHeader';

afterEach(cleanup);

jest.mock('../../generic/logo-dropdown/LogoDropdown', () => (
  jest.fn(() => <div data-testid="logo-dropdown" />)
));

describe('SubHeader', () => {
  it('renders the title correctly', () => {
    const { getByRole } = renderWithProviders(<SubHeader title="Test Title" />);
    const titleElement = getByRole('heading', { level: 1 });
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent('Test Title');
  });

  it('assigns the correct id to the heading', () => {
    const { getByTestId } = renderWithProviders(<SubHeader id="test-id" title="Test Title" />);
    const titleElement = getByTestId('test-id');
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveAttribute('id', 'test-id');
  });

  it('applies the given className to the heading', () => {
    const { getByRole } = renderWithProviders(<SubHeader className="custom-class" title="Test Title" />);
    const titleElement = getByRole('heading', { level: 1 });
    expect(titleElement).toHaveClass('custom-class');
  });

  it('renders the LogoDropdown component', () => {
    const { getByTestId } = renderWithProviders(<SubHeader title="Test Title" />);
    const dropdownElement = getByTestId('logo-dropdown');
    expect(dropdownElement).toBeInTheDocument();
  });

  it('passes additional props to the heading', () => {
    const { getByRole } = renderWithProviders(
      <SubHeader
        title="Test Title"
        aria-label="Custom Aria Label"
        data-custom="custom-value"
      />,
    );
    const titleElement = getByRole('heading', { level: 1 });
    expect(titleElement).toHaveAttribute('aria-label', 'Custom Aria Label');
    expect(titleElement).toHaveAttribute('data-custom', 'custom-value');
  });
});
