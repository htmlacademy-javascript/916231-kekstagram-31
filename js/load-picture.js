import {openModal} from './form.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const MAX_FILE_SIZE = 1024 * 1024;

const formElement = document.querySelector('#upload-select-image');
const formInputElement = formElement.querySelector('.img-upload__input');
const imgPreviewElement = formElement.querySelector('.img-upload__preview img');
const imgPreviewElements = formElement.querySelectorAll('.effects__preview');

const selectPicture = () => {
  const file = formInputElement.files[0];
  const fileName = file.name.toLowerCase();
  const typeMatches = FILE_TYPES.some((it) => fileName.endsWith(it));
  const sizeMatches = file.size <= MAX_FILE_SIZE;

  if (typeMatches && sizeMatches) {
    imgPreviewElement.src = URL.createObjectURL(file);
    imgPreviewElements.forEach((element) => {
      element.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
    });
    openModal();
  }
};

const loadPicture = () => {
  formInputElement.addEventListener('change', onInputChange);
};

function onInputChange() {
  selectPicture();
}

export {loadPicture};
