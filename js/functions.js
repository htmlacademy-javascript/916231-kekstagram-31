function compareLength (string, length) {
  return string.length <= length;
}

console.log(compareLength('проверяемая строка', 20));
console.log(compareLength('проверяемая строка', 18));
console.log(compareLength('проверяемая строка', 10));

function isPalindrome (string) {
  string = string.replaceAll(' ', '').toLowerCase();
  const length = string.length;

  for(let i = 0; i < length / 2; i++) {
    if(string[i] !== string[length - i - 1]) {
      return false;
    }
  }

  return true;
}

console.log(isPalindrome('топот'));
console.log(isPalindrome('ДовОд'));
console.log(isPalindrome('Кекс'));
console.log(isPalindrome('Лёша на полке клопа нашёл '));

function getInteger(string) {
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
}

console.log(getInteger('2023 год'));
console.log(getInteger('ECMAScript 2022'));
console.log(getInteger('1 кефир, 0.5 батона'));
console.log(getInteger('агент 007'));
console.log(getInteger('а я томат'));
console.log(getInteger(2023));
console.log(getInteger(-1));
console.log(getInteger(1.5));
