const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const createUniqueNumbersGenerator = (min, max) => {
  const previousValues = [];

  return function() {
    let currentValue = getRandomInteger(min, max);

    if (previousValues.length >= (max - min + 1)) {
      // eslint-disable-next-line no-console
      console.error(`Перебраны все числа из диапазона от ${ min } до ${ max}`);
      return null;
    }

    while(previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

// eslint-disable-next-line no-unused-vars
const compareLength = (string, length) => string.length <= length;

// eslint-disable-next-line no-unused-vars
const isPalindrome = (string) => {
  string = string.replaceAll(' ', '').toLowerCase();
  const length = string.length;

  for(let i = 0; i < length / 2; i++) {
    if(string[i] !== string[length - i - 1]) {
      return false;
    }
  }

  return true;
};

// eslint-disable-next-line no-unused-vars
const getInteger = (string) => {
  string = string.toString();
  let result = '';

  for(let i = 0; i < string.length; i++) {
    const symbol = parseInt(string[i], 10);
    if(!Number.isNaN(symbol)) {
      result += symbol;
    }
  }

  if(result.length === 0) {
    return NaN;
  }

  return result;
};

export {getRandomInteger, createUniqueNumbersGenerator};
