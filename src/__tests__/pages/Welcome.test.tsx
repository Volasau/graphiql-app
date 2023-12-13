import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import Welcome from '../../pages/Welcome/Welcome';
import { LanguageProvider } from '../../context/contextLanguage';
import { MemoryRouter } from 'react-router-dom';

describe('Test Welcome', () => {
  test('Сhecked ', () => {
    render(
      <MemoryRouter>
        <LanguageProvider>
          <Welcome />
        </LanguageProvider>
      </MemoryRouter>
    );
    const welcome = screen.getByTestId('welcome');
    expect(welcome).toBeTruthy();
  });
});
