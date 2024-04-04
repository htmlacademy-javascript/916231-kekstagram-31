import {isEscapeKey, showError, showSuccess} from './util.js';
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
const imgPreviewElement = formElement.querySelector('.img-upload__preview img');
const imgPreviewElements = formElement.querySelectorAll('.effects__preview');

const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const MAX_FILE_SIZE = 1024 * 1024;

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Отправляю...'
};

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
  const file = formInputElement.files[0];
  const fileName = file.name.toLowerCase();
  const typeMatches = FILE_TYPES.some((it) => fileName.endsWith(it));
  const sizeMatches = file.size <= MAX_FILE_SIZE;

  if (typeMatches && sizeMatches) {
    imgPreviewElement.src = URL.createObjectURL(file);
    imgPreviewElements.forEach((element) => {
      element.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
    });

    formElement.addEventListener('submit', onFormSubmit);
    imgModalElement.classList.remove('hidden');
    document.body.classList.add('modal-open');

    addValidator();
    initScale();
    initFilter();

    closeElement.addEventListener('click', onCloseClick);
    document.addEventListener('keydown', onDocumentKeydown);
  }
};

const blockSubmitButton = () => {
  submitElement.disabled = true;
  submitElement.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitElement.disabled = false;
  submitElement.textContent = SubmitButtonText.IDLE;
};

const loadImage = () => {
  formInputElement.addEventListener('change', onInputChange);
};

function onInputChange() {
  openModal();
}

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

export {loadImage, onDocumentKeydown};
