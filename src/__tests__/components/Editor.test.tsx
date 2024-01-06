import { describe, test, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Editor from '../../components/TextEditor/Editor';
import { LanguageProvider } from '../../context/contextLanguage';

describe('Test Editor component', () => {
  test('Should render Editor component with provided data', async () => {
    const onQueryChangeMock = vi.fn();
    const onVariablesChangeMock = vi.fn();
    const onHeadersChangeMock = vi.fn();

    render(
      <LanguageProvider>
        <Editor
          value="query {}"
          readonly={false}
          error={false}
          onQueryChange={onQueryChangeMock}
          onVariablesChange={onVariablesChangeMock}
          onHeadersChange={onHeadersChangeMock}
        />
      </LanguageProvider>
    );

    const codeMirror = screen.getByRole('textbox');
    expect(codeMirror).toBeTruthy();

    const prettifyButton = screen.getByText(/prettify/i);
    expect(prettifyButton).toBeTruthy();

    fireEvent.click(prettifyButton);

    const variablesButton = screen.getByText(/variables/i);
    const headersButton = screen.getByText(/headers/i);
    expect(variablesButton).toBeTruthy();
    expect(headersButton).toBeTruthy();

    fireEvent.click(variablesButton);

    fireEvent.click(headersButton);

    const arrowButton = screen.getByTitle(/expand/i);
    expect(arrowButton).toBeTruthy();
    fireEvent.click(arrowButton);
    const arrowButtonе = screen.getByTitle(/collapse/i);
    expect(arrowButtonе).toBeTruthy();
  });
});
