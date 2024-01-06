export const prettify = (value: string): string => {
  let result = '';

  result = formatStringWithSpaces(value);

  return result;
};

// add spaces to the begining of the line depending on level
export const formatStringWithSpaces = (value: string): string => {
  const spaceCount = 3;
  let res = '';
  let level = 0;
  // name
  // surname {}
  // Result: name|surname {}

  const spaceReplacedValue = value.replace(
    /([A-Za-z0-9])([\s\n]+)([A-Za-z0-9])/g,
    (str, match1, _, match3) => {
      return `${match1}|${match3}`;
    }
  );

  const removeAllSpaces = spaceReplacedValue.replace(/[\s\n]+/g, '');

  const originalPlainText = removeAllSpaces.replace(/\|/g, ' ');

  let isWithinBrackets = false;

  for (let i = 0; i < originalPlainText.length; i++) {
    const char = originalPlainText[i];
    const nextChar = originalPlainText[i + 1];
    const prevChar = originalPlainText[i - 1];

    const charMatchAlphaNum = char?.match(/[A-Za-z0-9]/) || [];
    const prevCharMatchAlphaNum = prevChar?.match(/[A-Za-z0-9]/) || [];
    const nextCharMatchAlphaNum = nextChar?.match(/[A-Za-z0-9]/) || [];

    // validation started
    if (char === '(') {
      isWithinBrackets = true;
    }
    if (char === ')') {
      isWithinBrackets = false;
    }
    // validation ended

    if (
      char === ' ' &&
      prevCharMatchAlphaNum[0] &&
      nextCharMatchAlphaNum[0] &&
      !isWithinBrackets
    ) {
      res += `\n${' '.repeat(level * spaceCount)}`;
      continue;
    }

    if (nextChar === '{' || nextChar === '(') {
      res += char + ' ';
      continue;
    }

    if (
      (char === ' ' && nextChar !== '{') ||
      (char === ' ' && nextChar !== '(')
    ) {
      res += `\n${' '.repeat(level * spaceCount)}`;
      continue;
    }

    if (char === '{') {
      level++;
      res += `{\n${' '.repeat(level * spaceCount)}`;
      continue;
    }

    if (char === '(' && prevChar === ' ') {
      res += '(';
      continue;
    }

    if (char === '}' && nextCharMatchAlphaNum[0]) {
      level--;
      res += `\n${' '.repeat(level * spaceCount)}}`;
      continue;
    }

    if (charMatchAlphaNum[0] && prevChar === '}') {
      res += `\n${' '.repeat(level * spaceCount)}`;
    }

    if (char === '}') {
      level--;
      res += `\n${' '.repeat(level * spaceCount)}}`;
      continue;
    }

    if (char) {
      res += char;
      continue;
    }
  }

  return res;
};
