import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import RegisterComp from '../../components/RegisterComp/RegisterComp';
import { MemoryRouter } from 'react-router-dom';

describe('Test RegisterComp', () => {
  test('Сhecked ', () => {
    render(
      <MemoryRouter>
        <RegisterComp />
      </MemoryRouter>
    );

    const form = screen.getByTestId('form__registr');
    expect(form).toBeTruthy();
  });
});
