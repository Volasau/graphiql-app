import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import RegisterComp from '../../components/RegisterComp/RegisterComp';
import { MemoryRouter } from 'react-router-dom';
import { LanguageProvider } from '../../context/contextLanguage';

describe('Test RegisterComp', () => {
  test('Сhecked ', () => {
    render(
      <LanguageProvider>
        <MemoryRouter>
          <RegisterComp />
        </MemoryRouter>
      </LanguageProvider>
    );

    const form = screen.getByTestId('form__registr');
    expect(form).toBeTruthy();
  });
});
