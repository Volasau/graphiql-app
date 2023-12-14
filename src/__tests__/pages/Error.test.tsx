import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import Error from '../../pages/Error/Error';

describe('Test Error page', () => {
  test('отрисовывается ли страница', () => {
    render(<Error />);
    const heading404 = screen.getByRole('heading', {
      name: /404 Error/i,
    });
    expect(heading404).toBeTruthy();
  });
});
