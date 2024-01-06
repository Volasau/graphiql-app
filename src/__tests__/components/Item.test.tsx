import { describe, expect, test } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import { LanguageProvider } from '../../context/contextLanguage';
import { MemoryRouter } from 'react-router-dom';
import Item from '../../components/Item/Item';

describe('Test Item page', () => {
  test('Сhecked Item page', () => {
    act(() => {
      render(
        <MemoryRouter>
          <LanguageProvider>
            <Item
              item={{
                name: 'w',
                type: 'w',
              }}
              allObjects={[]}
            />
          </LanguageProvider>
        </MemoryRouter>
      );
    });
    const item = screen.getByTestId('item');
    expect(item).toBeTruthy();
  });
});
