import { describe, expect, test } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import { LanguageProvider } from '../context/contextLanguage';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

describe('Test App component', () => {
  test('Сhecked App component', () => {
    act(() => {
      render(
        <MemoryRouter>
          <LanguageProvider>
            <App />
          </LanguageProvider>
        </MemoryRouter>
      );
    });
    const app = screen.getByTestId('app');
    expect(app).toBeTruthy();
  });
});
