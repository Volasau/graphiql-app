import { describe, expect, test } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import DocumentationSchema from '../../components/DocumentationSchema/DocumentationSchema';
import { LanguageProvider } from '../../context/contextLanguage';
import { MemoryRouter } from 'react-router-dom';

describe('Test Login page', () => {
  test('Сhecked login page', () => {
    act(() => {
      render(
        <MemoryRouter>
          <LanguageProvider>
            <DocumentationSchema objects={[]} />
          </LanguageProvider>
        </MemoryRouter>
      );
    });
    const expoler = screen.getByTestId('expoler');
    expect(expoler).toBeTruthy();
  });
});
