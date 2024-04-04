import {debounce, createUniqueNumbersGenerator} from './util.js';
import {initMiniature, clearMiniature} from './miniature.js';

const sortingElement = document.querySelector('.img-filters');
const formSortingElement = sortingElement.querySelector('.img-filters__form');
const sortDefaultElement = formSortingElement.querySelector('#filter-default');
const sortRandomElement = formSortingElement.querySelector('#filter-random');
const sortDiscussedElement = formSortingElement.querySelector('#filter-discussed');

let currentSortElement = sortDefaultElement;

const RANDOM_PICTURE_COUNT = 10;

const randomSorting = (pictures) => {
  const getUniqueNumber = createUniqueNumbersGenerator(0, pictures.length - 1);
  const uniqueNumbers = Array.from({length: RANDOM_PICTURE_COUNT}, getUniqueNumber);

  const resultPictureList = [];
  uniqueNumbers.forEach((number) => {
    resultPictureList.push(pictures[number]);
  });
  return resultPictureList;
};

const compareCommentsLength = (pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length;

const sortMiniature = (pictures) => {
  switch (currentSortElement){
    case sortDefaultElement:
      clearMiniature();
      initMiniature(pictures);
      break;
    case sortRandomElement:
      clearMiniature();
      initMiniature(randomSorting(pictures));
      break;
    case sortDiscussedElement:
      clearMiniature();
      initMiniature(pictures.slice().sort(compareCommentsLength));
  }
};

const initSortingPictures = (pictures) => {
  initMiniature(pictures);
  sortingElement.classList.remove('img-filters--inactive');

  formSortingElement.addEventListener('click', debounce((evt) => {
    currentSortElement.classList.remove('img-filters__button--active');
    currentSortElement = evt.target;
    currentSortElement.classList.add('img-filters__button--active');
    sortMiniature(pictures);
  }));
};

export {initSortingPictures};
