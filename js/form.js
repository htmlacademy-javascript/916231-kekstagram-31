import {isEscapeKey} from './util.js';
import {submitFormValidation, addValidator, removeValidator} from './validate-form.js';
import {initScale, removeScale} from './scale-picture.js';
import {initFilter, removeFilter} from './filter-picture.js';

const formElement = document.querySelector('#upload-select-image');
const formInputElement = formElement.querySelector('.img-upload__input');
const imgModalElement = formElement.querySelector('.img-upload__overlay');
const closeElement = formElement.querySelector('.img-upload__cancel');
const descriptionElement = formElement.querySelector('.text__description');
const hashtagElement = formElement.querySelector('.text__hashtags');

const clearForm = () => {
  formElement.reset();
};

const validateForm = (evt) => {
  evt.preventDefault();
  submitFormValidation();
};

const closeModal = () => {
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

const loadImage = () => {
  formInputElement.addEventListener('change', openModal);
};

export {loadImage};
