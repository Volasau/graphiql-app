import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ErrorBoundary from '../../components/errorBoundary/ErrorBoundary';

describe('Test ErrorBoundary Component', () => {
  test('Сhecked renders children when there is no error', () => {
    const childText = 'Test Child';

    render(
      <ErrorBoundary>
        <div>{childText}</div>
      </ErrorBoundary>
    );

    const childElement = screen.getByText(childText);
    expect(childElement).toBeTruthy();
  });
});
