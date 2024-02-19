const compareLength = (string, length) => string.length <= length;

compareLength('проверяемая строка', 20);
compareLength('проверяемая строка', 18);
compareLength('проверяемая строка', 10);

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

isPalindrome('топот');
isPalindrome('ДовОд');
isPalindrome('Кекс');
isPalindrome('Лёша на полке клопа нашёл ');

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

getInteger('2023 год');
getInteger('ECMAScript 2022');
getInteger('1 кефир, 0.5 батона');
getInteger('агент 007');
getInteger('а я томат');
getInteger(2023);
getInteger(-1);
getInteger(1.5);
