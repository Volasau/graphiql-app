import { describe, expect, test /*,vi*/ } from 'vitest';
import { act, render, screen /*,fireEvent*/ } from '@testing-library/react';
import EditorPanel from '../../components/EditorPanel/Panel';
import { LanguageProvider } from '../../context/contextLanguage';
import { MemoryRouter } from 'react-router-dom';

describe('Test EditorPanel component', () => {
  test('Сhecked EditorPanel component', () => {
    act(() => {
      render(
        <MemoryRouter>
          <LanguageProvider>
            <EditorPanel />
          </LanguageProvider>
        </MemoryRouter>
      );
    });

    const apiInput = screen.getByPlaceholderText('enter API url...');
    const getSchemaButton = screen.getByText('Get schema');
    const runRequestButton = screen.getByText('Run request');

    expect(apiInput).toBeTruthy();
    expect(getSchemaButton).toBeTruthy();
    expect(runRequestButton).toBeTruthy();
    const panel = screen.getByTestId('panel');
    expect(panel).toBeTruthy();
  });
});
