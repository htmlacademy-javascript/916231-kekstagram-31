const ALERT_SHOW_TIME = 5000;

let successElement;

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const isEnterKey = (evt) => evt.key === 'Enter';

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

const compareLength = (string, length) => string.length <= length;

const showAlert = (errorText) => {
  const alertTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
  const alertElement = alertTemplate.cloneNode(true);
  alertElement.textContent = errorText;
  document.body.append(alertElement);

  setTimeout(() => {
    alertElement.remove();
  }, ALERT_SHOW_TIME);
};

const onSuccessButtonClick = () => {
  document.body.removeChild(successElement);
};

const closeSuccess = () => {
  document.body.removeChild(successElement);
  document.removeEventListener('click', onSuccessDocumentClick);
  document.removeEventListener('keydown', onSuccessEscKeydown);
};

function onSuccessDocumentClick (evt) {
  if (evt.target === successElement) {
    closeSuccess();
  }
}

function onSuccessEscKeydown (evt) {
  if (isEscapeKey(evt)) {
    closeSuccess();
  }
}

const showSuccess = (successText) => {
  const successTemplate = document.querySelector('#success').content.querySelector('.success');
  successElement = successTemplate.cloneNode(true);
  const successTitleElement = successElement.querySelector('.success__title');
  const successButtonElement = successElement.querySelector('.success__button');

  successTitleElement.textContent = successText;

  successButtonElement.addEventListener('click', onSuccessButtonClick);
  document.addEventListener('click', onSuccessDocumentClick);
  document.addEventListener('keydown', onSuccessEscKeydown);

  document.body.append(successElement);
};

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {getRandomInteger, createUniqueNumbersGenerator, isEscapeKey, isEnterKey, compareLength, showAlert, showSuccess, debounce};
