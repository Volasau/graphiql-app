import { describe, test, expect } from 'vitest';
import DocumentationSchema from '../../components/DocumentationSchema/DocumentationSchema';
import { render, screen, within } from '@testing-library/react';
import { LanguageProvider } from '../../context/contextLanguage';

describe('DocumentationSchema Component', () => {
  const mockObjects = [
    {
      name: 'ObjectType1',
      type: 'Object',
      args: [{ name: 'arg1', type: 'String' }],
      fields: [{ name: 'field1', type: 'Int' }],
    },
  ];

  test('renders DocumentationSchema component with provided data', () => {
    render(
      <LanguageProvider>
        <DocumentationSchema objects={mockObjects} />
      </LanguageProvider>
    );

    const documentationHeader = screen.getByText(/Documentation/i);
    expect(documentationHeader).toBeInTheDocument();

    const emptyText = screen.queryByTestId('empty-text');
    expect(emptyText).not.toBeInTheDocument();

    for (const object of mockObjects) {
      const schemaType = screen.getByTestId('schema-type');
      const objectName = within(schemaType).getByText(`Object: ${object.name}`);
      expect(objectName).toBeInTheDocument();
    }
  });

  test('renders DocumentationSchema component with no items', () => {
    render(
      <LanguageProvider>
        <DocumentationSchema objects={[]} />
      </LanguageProvider>
    );

    const emptyText = screen.getByTestId('empty-text');
    expect(emptyText).toBeInTheDocument();

    const documentationHeader = screen.queryByText(/Documentation/i);
    expect(documentationHeader).toBeInTheDocument();
  });
});
