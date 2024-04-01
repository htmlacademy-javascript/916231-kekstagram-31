import {compareLength} from './util.js';

const formElement = document.querySelector('#upload-select-image');
const descriptionElement = formElement.querySelector('.text__description');
const hashtagElement = formElement.querySelector('.text__hashtags');
const hashtagRegExp = /^#[a-zа-яё0-9]{1,19}$/i;

const MAX_DESCRIPTION_LENGTH = 140;
const MAX_HASHTAGS_COUNT = 5;
const ERROR_VALIDATE_DESCRIPTION_MESSAGE = 'Длина комментария не может составлять больше 140 символов';
const ErrorValidateHashtagMessages = {
  INVALID_HASHTAG: 'Неверный хэш-тег',
  REPEAT_HASHTAG: 'Хэш-тег не может повторяться',
  COUNT_HASHTAG: `Не больше ${ MAX_HASHTAGS_COUNT } хэш-тегов`
};

let pristine;
let errorValidateHashtagMessage = '';

const validateLengthDescription = (value) => compareLength(value, MAX_DESCRIPTION_LENGTH);

const validateHashtagsInvalid = (hashtagsList) => {
  for (const hashtag of hashtagsList) {
    if (!hashtagRegExp.test(hashtag)) {
      errorValidateHashtagMessage = ErrorValidateHashtagMessages.INVALID_HASHTAG;
      return false;
    }
  }
  return true;
};

const validateHashtagsCount = (hashtagsList) => {
  if (hashtagsList.length > MAX_HASHTAGS_COUNT) {
    errorValidateHashtagMessage = ErrorValidateHashtagMessages.COUNT_HASHTAG;
    return false;
  }
  return true;
};

const validateHashtagsRepeat = (hashtagsList) => {
  for (let i = 0; i < hashtagsList.length - 1; i++) {
    if (hashtagsList[i] === hashtagsList[i + 1]) {
      errorValidateHashtagMessage = ErrorValidateHashtagMessages.REPEAT_HASHTAG;
      return false;
    }
  }
  return true;
};

const validateHashtags = (value) => {
  errorValidateHashtagMessage = '';
  const hashtagsList = value.trimStart()
    .trimEnd()
    .split(' ')
    .map((hashtag) => hashtag.toLowerCase())
    .filter((hashtag) => hashtag);

  return validateHashtagsInvalid(hashtagsList) && validateHashtagsCount(hashtagsList) && validateHashtagsRepeat(hashtagsList);
};

const getErrorHashtagMessage = () => errorValidateHashtagMessage;

const submitFormValidation = () => pristine.validate();

const addValidator = () => {
  pristine = new Pristine(formElement, {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextClass: 'img-upload__field-wrapper--error',
    errorTextTag: 'div',
  });

  pristine.addValidator(descriptionElement, validateLengthDescription, ERROR_VALIDATE_DESCRIPTION_MESSAGE);
  pristine.addValidator(hashtagElement, validateHashtags, getErrorHashtagMessage);
};

const removeValidator = () => {
  pristine.destroy();
};

export {submitFormValidation, addValidator, removeValidator};
