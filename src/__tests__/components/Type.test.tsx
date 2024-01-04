import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import SchemaType from '../../components/SchemaType/Type';

describe('Test SchemaType component', () => {
  test('Should render SchemaType component with provided data', () => {
    const types = [
      {
        name: 'ObjectType1',
        type: 'Type1',
        args: [],
        fields: [],
      },
      {
        name: 'ObjectType2',
        type: 'Type2',
        args: [],
        fields: [],
      },
    ];

    const allObjects = [
      ...types[0].args,
      ...types[0].fields,
      ...types[1].args,
      ...types[1].fields,
    ];

    render(<SchemaType type={types[0]} allObjects={allObjects} />);

    const schemaType = screen.getByTestId('schema-type');
    expect(schemaType).toBeTruthy();

    const items = screen.getAllByTestId('schema-type');
    expect(items.length).toBe(allObjects.length + 1);

    expect(screen.getByText('Object: ObjectType1')).toBeTruthy();
    expect(screen.getByText('Type: Type1')).toBeTruthy();
  });

  test('Should render SchemaType component with undefined data', () => {
    render(<SchemaType type={undefined} allObjects={[]} />);

    const items = screen.queryAllByTestId('schema-type');
    expect(items.length).toBe(1);
  });
});
