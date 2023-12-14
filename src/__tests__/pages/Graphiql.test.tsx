import { describe, expect, test } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import { LanguageProvider } from '../../context/contextLanguage';
import { MemoryRouter } from 'react-router-dom';
import Graphi from '../../pages/GraphiQl/Graphi';

describe('Test Graphi page', () => {
  test('Сhecked Graphi page', () => {
    act(() => {
      render(
        <MemoryRouter>
          <LanguageProvider>
            <Graphi />
          </LanguageProvider>
        </MemoryRouter>
      );
    });
    const Graphiql = screen.getByTestId('graphiql');
    expect(Graphiql).toBeTruthy();
  });
});
