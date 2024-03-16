import {openPicture} from './big-picture.js';
import {generatePhotos} from './generate-photos.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictureListElement = document.querySelector('.pictures');

const photos = generatePhotos();

const pictureListFragment = document.createDocumentFragment();

const initMiniature = () => {
  photos.forEach((photo) => {
    const {url, description, likes, comments} = photo;
    const pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__img').alt = description;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;

    pictureElement.addEventListener('click', (evt) => {
      if (evt.target.closest('.picture')) {
        openPicture(photo);
      }
    });

    pictureListFragment.appendChild(pictureElement);
  });

  pictureListElement.appendChild(pictureListFragment);
};

export {initMiniature};
