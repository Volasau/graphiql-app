import { describe, expect, test } from 'vitest';
import { fetchSchema } from '../../components/EditorPanel/SchemaAPI';

describe('Checked SchemaApi', () => {
  test('fetchSchema should return an array of schema types', async () => {
    const endpoint = 'https://countries.trevorblades.com';
    const { result: schemaTypes } = await fetchSchema(endpoint);

    expect(Array.isArray(schemaTypes)).toBe(true);
    expect(schemaTypes.length).not.toBe(0);
  });

  test('fetchSchema should handle errors and return an empty array', async () => {
    const invalidEndpoint = 'https://invalid-endpoint';
    const { result: schemaTypes } = await fetchSchema(invalidEndpoint);

    expect(Array.isArray(schemaTypes)).toBe(true);
    expect(schemaTypes.length).toBe(0);
  });
});
