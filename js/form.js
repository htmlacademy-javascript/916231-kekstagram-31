import {isEscapeKey, showAlert, showSuccess} from './util.js';
import {sendData} from './api.js';
import {submitFormValidation, addValidator, removeValidator} from './validate-form.js';
import {initScale, removeScale} from './scale-picture.js';
import {initFilter, removeFilter} from './filter-picture.js';

const formElement = document.querySelector('#upload-select-image');
const formInputElement = formElement.querySelector('.img-upload__input');
const imgModalElement = formElement.querySelector('.img-upload__overlay');
const closeElement = formElement.querySelector('.img-upload__cancel');
const descriptionElement = formElement.querySelector('.text__description');
const hashtagElement = formElement.querySelector('.text__hashtags');
const submitElement = formElement.querySelector('#upload-submit');

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Отправляю...'
};

const clearForm = () => {
  formElement.reset();
};

const validateForm = (evt) => {
  evt.preventDefault();
  submitFormValidation();
};

const closeModal = () => {
  formElement.removeEventListener('submit', onSubmitClick);
  imgModalElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  formElement.removeEventListener('submit', validateForm);
  clearForm();
  removeValidator();
  removeScale();
  removeFilter();

  closeElement.removeEventListener('click', closeModal);
  document.removeEventListener('keydown', onDocumentKeydown);
};

const openModal = () => {
  formElement.addEventListener('submit', onSubmitClick);
  imgModalElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  formElement.addEventListener('submit', validateForm);
  addValidator();
  initScale();
  initFilter();

  closeElement.addEventListener('click', closeModal);
  document.addEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown (evt) {
  if (hashtagElement === document.activeElement || descriptionElement === document.activeElement) {
    evt.stopPropagation();
  } else if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
}

const blockSubmitButton = () => {
  submitElement.disabled = true;
  submitElement.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitElement.disabled = false;
  submitElement.textContent = SubmitButtonText.IDLE;
};

function onSubmitClick (evt) {
  evt.preventDefault();

  if (submitFormValidation()) {
    blockSubmitButton();
    sendData(new FormData(evt.target))
      .then(submitForm)
      .catch(
        (err) => {
          showAlert(err.message);
        }
      )
      .finally(unblockSubmitButton);
  }
}

function submitForm() {
  closeModal();
  showSuccess('Изображение успешно загружено');
}

const loadImage = () => {
  formInputElement.addEventListener('change', openModal);
};

export {loadImage};
