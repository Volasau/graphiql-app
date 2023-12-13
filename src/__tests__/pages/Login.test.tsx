import { describe, expect, test } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import Login from '../../pages/LoginPage/LoginPage';
import { LanguageProvider } from '../../context/contextLanguage';
import { MemoryRouter } from 'react-router-dom';

describe('Test Login page', () => {
  test('Сhecked login page', () => {
    act(() => {
      render(
        <MemoryRouter>
          <LanguageProvider>
            <Login />
          </LanguageProvider>
        </MemoryRouter>
      );
    });
    const login = screen.getByTestId('login');
    expect(login).toBeTruthy();
  });
});
