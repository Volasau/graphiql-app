import { prettify, formatStringWithSpaces } from '../utils/prettifier';

import { describe, expect, it } from 'vitest';

describe('prettify function', () => {
  it('correctly prettifies the input string', () => {
    const inputString = 'function foo() {return { key: "value" };}';
    const expectedOutputRegex =
      /function foo\(\) {\n\s*return {\n\s*key:\s*"value"\s*};\n\s*}/;

    const result = prettify(inputString);

    expect(result).toMatch(expectedOutputRegex);
  });
});

describe('formatStringWithSpaces function', () => {
  it('correctly formats the input string with spaces', () => {
    const inputString = 'function foo() {return { key: "value" };}';
    const expectedOutputRegex =
      /function foo\(\) {\n\s*return {\n\s*key:\s*"value"\s*};\n\s*}/;

    const result = formatStringWithSpaces(inputString);

    expect(result).toMatch(expectedOutputRegex);
  });
});
