import { describe, expect, test } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import { LanguageProvider } from '../../context/contextLanguage';
import { MemoryRouter } from 'react-router-dom';
import Registration from '../../pages/RegisterPage/RegisterPage';

describe('Test Registration page', () => {
  test('Сhecked Registration page', () => {
    act(() => {
      render(
        <MemoryRouter>
          <LanguageProvider>
            <Registration />
          </LanguageProvider>
        </MemoryRouter>
      );
    });
    const registration = screen.getByTestId('registration');
    expect(registration).toBeTruthy();
  });
});
