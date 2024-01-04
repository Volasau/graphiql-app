import { describe, expect, test } from 'vitest';
import { formatStringWithSpaces } from '../utils/prettifier';

describe('Checked prettifier', () => {
  test('Handling lines with empty curly braces', () => {
    const input = 'name {}';
    const expectedOutput = 'name {\n   \n}';

    const result = formatStringWithSpaces(input);

    expect(result).toBe(expectedOutput);
  });

  test('Handling strings with empty letter brackets', () => {
    const input = 'name ()';
    const expectedOutput = 'name ()';

    const result = formatStringWithSpaces(input);

    expect(result).toBe(expectedOutput);
  });

  test('Handling nested parentheses', () => {
    const input = 'name (surname (nested))';
    const expectedOutput = 'name (surname (nested))';

    const result = formatStringWithSpaces(input);

    expect(result).toBe(expectedOutput);
  });

  test('Handling a string without parentheses', () => {
    const input = 'name without brackets';
    const expectedOutput = 'name\nwithout\nbrackets';

    const result = formatStringWithSpaces(input);

    expect(result).toBe(expectedOutput);
  });

  test('With spaces inside brackets', () => {
    const input = 'name {  }';
    const expectedOutput = 'name {\n   \n}';

    const result = formatStringWithSpaces(input);

    expect(result).toBe(expectedOutput);
  });

  test('Combination of curly and parentheses', () => {
    const input = 'mixed { brackets ( inside ) }';
    const expectedOutput = 'mixed {\n   brackets (inside)\n}';

    const result = formatStringWithSpaces(input);

    expect(result).toBe(expectedOutput);
  });
});
