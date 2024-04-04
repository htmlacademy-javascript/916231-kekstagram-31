import {isEscapeKey, showError, showSuccess} from './util.js';
import {sendData} from './api.js';
import {submitFormValidation, addValidator, removeValidator} from './validate-form.js';
import {initScale, removeScale} from './scale-picture.js';
import {initFilter, removeFilter} from './filter-picture.js';

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Отправляю...'
};

const formElement = document.querySelector('#upload-select-image');
const imgModalElement = formElement.querySelector('.img-upload__overlay');
const closeElement = formElement.querySelector('.img-upload__cancel');
const descriptionElement = formElement.querySelector('.text__description');
const hashtagElement = formElement.querySelector('.text__hashtags');
const submitElement = formElement.querySelector('#upload-submit');

const clearForm = () => {
  formElement.reset();
};

const closeModal = () => {
  imgModalElement.classList.add('hidden');
  formElement.removeEventListener('submit', onFormSubmit);
  document.body.classList.remove('modal-open');
  clearForm();
  removeValidator();
  removeScale();
  removeFilter();

  closeElement.removeEventListener('click', onCloseClick);
  document.removeEventListener('keydown', onDocumentKeydown);
};

const openModal = () => {
  formElement.addEventListener('submit', onFormSubmit);
  imgModalElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  addValidator();
  initScale();
  initFilter();

  closeElement.addEventListener('click', onCloseClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

const blockSubmitButton = () => {
  submitElement.disabled = true;
  submitElement.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitElement.disabled = false;
  submitElement.textContent = SubmitButtonText.IDLE;
};

function onFormSubmit (evt) {
  evt.preventDefault();
  submitFormValidation();

  if (submitFormValidation()) {
    blockSubmitButton();
    sendData(new FormData(evt.target))
      .then(submitForm)
      .catch(
        (err) => {
          showError(err.message);
        }
      )
      .finally(unblockSubmitButton);
  }
}

function submitForm() {
  closeModal();
  showSuccess('Изображение успешно загружено');
}

function onCloseClick () {
  closeModal();
}

function onDocumentKeydown (evt) {
  if (hashtagElement === document.activeElement || descriptionElement === document.activeElement) {
    evt.stopPropagation();
  } else if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
}

export {openModal, onDocumentKeydown};
