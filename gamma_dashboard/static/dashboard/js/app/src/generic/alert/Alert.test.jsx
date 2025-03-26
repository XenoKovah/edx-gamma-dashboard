import React from 'react';
import '@testing-library/jest-dom';

import { renderWithProviders } from '../../setupTests';
import Alert from '.';

describe('Alert', () => {
  const defaultTitle = 'Test Alert';
  const defaultVariant = 'info';

  const renderAlert = ({
    title = defaultTitle,
    variant = defaultVariant,
    className,
    icon,
    children,
  } = {}) => renderWithProviders(
    <Alert
      title={title}
      variant={variant}
      className={className}
      icon={icon}
    >
      {children}
    </Alert>,
  );

  const getAlertContainer = (getByText, title) => {
    const titleElement = getByText(title);
    return titleElement.closest('.alert');
  };

  it('renders with given title and children', () => {
    const title = 'Info Title';
    const content = 'Info content goes here.';

    const { getByText } = renderAlert({
      title,
      children: <p>{content}</p>,
    });

    expect(getByText(title)).toBeInTheDocument();
    expect(getByText(content)).toBeInTheDocument();
  });

  it('applies the provided variant class', () => {
    const title = 'Danger Alert';

    const { getByText } = renderAlert({
      title,
      variant: 'danger',
      children: <span>Be careful!</span>,
    });

    expect(getAlertContainer(getByText, title)).toHaveClass('alert-danger');
  });

  it('renders without children', () => {
    const title = 'Warning';

    const { getByText } = renderAlert({
      title,
      variant: 'warning',
    });

    expect(getByText(title)).toBeInTheDocument();
  });

  it('supports custom className', () => {
    const title = 'Success!';
    const customClass = 'custom-alert';

    const { getByText } = renderAlert({
      title,
      variant: 'success',
      className: customClass,
    });

    expect(getAlertContainer(getByText, title)).toHaveClass(customClass);
  });

  it('renders icon when provided', () => {
    const DummyIcon = () => <svg data-testid="custom-icon" />;

    const { getByTestId } = renderAlert({
      icon: DummyIcon,
    });

    expect(getByTestId('custom-icon')).toBeInTheDocument();
  });
});
