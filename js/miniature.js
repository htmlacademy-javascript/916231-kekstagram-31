import { generatePhotos } from './generate-photos.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictureListElement = document.querySelector('.pictures');

const photos = generatePhotos();

const pictureListFragment = document.createDocumentFragment();

const initMiniature = () => {
  photos.forEach(({url, description, likes, comments}) => {
    const pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__img').alt = description;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;

    pictureListFragment.appendChild(pictureElement);
  });

  pictureListElement.appendChild(pictureListFragment);
};

export {initMiniature};
