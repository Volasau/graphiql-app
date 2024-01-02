export const prettify = (value: string): string => {
  let res = '';
  let result = formatStringMultiSpaces(value);
  result = result.replace(/^\s*\n/gm, '');
  res = formatStringWithSpaces(result);
  // add space between a word and opening curly brace
  res = res.replace(/([a-zA-Z]+)\s*{/g, '$1 {\n');
  console.log('test', res);
  //remove empty lines
  res = res.replace(/^\s*\n/gm, '');

  return res;
};

// add spaces to the begining of the line depending on level
export const formatStringWithSpaces = (value: string): string => {
  const spaceCount = 3;
  let res = '';
  let level = 0;
  for (let i = 0; i < value.length; i++) {
    const char = value[i];
    const prevChar = value[i - 1];
    if (char === '{') {
      level++;
      res += `{\n${' '.repeat(level * spaceCount)}`;
    } else if (char === '}') {
      level--;
      res += `\n${' '.repeat(level * spaceCount)}}`;
    } else if (prevChar !== ' ' && (char === ' ' || char === '\n')) {
      level;
      res += `\n${' '.repeat(level * spaceCount)}`;
    } else {
      res += char;
    }
  }
  return res;
};

export const formatStringMultiSpaces = (value: string): string => {
  const newValue = value.replace(/\s+/g, ' ').trim();
  let res = '';
  const spaceCount = 3;
  let level = 0;
  const valueArr = newValue.split('\n');
  for (let i = 0; i < valueArr.length; i++) {
    const char = valueArr[i];
    const prevChar = valueArr[i - 1] || null;
    if (
      char.startsWith(`${' '.repeat(level * spaceCount)}`) &&
      !char.endsWith(' {')
    ) {
      res += char.trim();
    } else if (prevChar?.includes('{')) {
      level++;
      res += `${' '.repeat(level * spaceCount)}`;
      res += char;
    } else if (prevChar?.includes('}')) {
      level--;
      res += `${' '.repeat(level * spaceCount)}`;
    } else if (char.includes('{')) {
      level;
      res += char.trim();
      res += `${' '.repeat(level * spaceCount)}}`;
    } else {
      res += char;
    }
  }

  return res;
};
