import {onDocumentKeydown} from './form.js';

const ALERT_SHOW_TIME = 5000;
const TIMEOUT_DELAY = 500;

let successElement;
let errorElement;

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
  document.addEventListener('keydown', onDocumentKeydown);
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
  document.removeEventListener('keydown', onDocumentKeydown);

  document.body.append(successElement);
};

const onErrorButtonClick = () => {
  document.body.removeChild(errorElement);
};

const closeError = () => {
  document.body.removeChild(errorElement);
  document.removeEventListener('click', onErrorDocumentClick);
  document.removeEventListener('keydown', onErrorEscKeydown);
  document.addEventListener('keydown', onDocumentKeydown);
};

function onErrorDocumentClick (evt) {
  if (evt.target === errorElement) {
    closeError();
  }
}

function onErrorEscKeydown (evt) {
  if (isEscapeKey(evt)) {
    closeError();
  }
}

const showError = () => {
  const errorTemplate = document.querySelector('#error').content.querySelector('.error');
  errorElement = errorTemplate.cloneNode(true);
  const errorButtonElement = errorElement.querySelector('.error__button');


  errorButtonElement.addEventListener('click', onErrorButtonClick);
  document.addEventListener('click', onErrorDocumentClick);
  document.addEventListener('keydown', onErrorEscKeydown);
  document.removeEventListener('keydown', onDocumentKeydown);

  document.body.append(errorElement);
};

const debounce = (callback, timeoutDelay = TIMEOUT_DELAY) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {getRandomInteger, createUniqueNumbersGenerator, isEscapeKey, isEnterKey, compareLength, showAlert, showSuccess, showError, debounce};
