import { describe, expect, test } from 'vitest';
import {
  ErrorLocation,
  InputFieldData,
  ResponseError,
  SchemaFieldData,
  SchemaObject,
  SchemaObjectField,
  SchemaTypeData,
  TypeObject,
} from '../utils/types';

describe('Test Interfaces', () => {
  test('Checked all Interfaces with file types', () => {
    const schemaObjectField: SchemaObjectField = {
      name: 'Azim',
      type: 'man',
    };

    expect(typeof schemaObjectField.name).toBe('string');
    expect(typeof schemaObjectField.name).not.toBe('number');
    expect(typeof schemaObjectField.type).toBe('string');
    expect(typeof schemaObjectField.type).not.toBe('number');

    const schemaObject: SchemaObject = {
      name: 'Azim',
      type: 'man',
      args: [],
      fields: [schemaObjectField],
    };
    expect(schemaObject).toEqual({
      name: 'Azim',
      type: 'man',
      args: [],
      fields: [schemaObjectField],
    });
    const typeObject: TypeObject = {
      name: 'Azim',
      kind: 'WWW',
      ofType: {
        name: 'Ryhor',
        kind: 'SCALAR',
        ofType: undefined,
      },
    };
    expect(typeObject).toEqual({
      name: 'Azim',
      kind: 'WWW',
      ofType: { name: 'Ryhor', kind: 'SCALAR', ofType: undefined },
    });
    const schemaFieldData: SchemaFieldData = {
      args: [],
      name: 'Azim',
      description: 'Description',
      isDeprecated: false,
      deprecationReason: '',
      type: typeObject,
    };
    expect(schemaFieldData).toEqual({
      args: [],
      name: 'Azim',
      description: 'Description',
      isDeprecated: false,
      deprecationReason: '',
      type: typeObject,
    });
    const inputFieldData: InputFieldData = {
      name: 'Azim',
      description: 'Description',
      defaultValue: null,
      type: typeObject,
    };
    expect(inputFieldData).toEqual({
      name: 'Azim',
      description: 'Description',
      defaultValue: null,
      type: typeObject,
    });
    const schemaTypeData: SchemaTypeData = {
      description: 'Description',
      enumValues: [],
      fields: [],
      inputFields: [inputFieldData],
      interfaces: [],
      kind: 'WWW',
      name: 'Azim',
      possibleTypes: [],
    };
    expect(schemaTypeData).toEqual({
      description: 'Description',
      enumValues: [],
      fields: [],
      inputFields: [inputFieldData],
      interfaces: [],
      kind: 'WWW',
      name: 'Azim',
      possibleTypes: [],
    });
    const errorLocation: ErrorLocation = { line: '1', column: '2' };
    expect(errorLocation).toEqual({ line: '1', column: '2' });

    const responseError: ResponseError = {
      message: 'Message',
      locations: [errorLocation],
    };
    expect(responseError).toEqual({
      message: 'Message',
      locations: [errorLocation],
    });
  });
});
