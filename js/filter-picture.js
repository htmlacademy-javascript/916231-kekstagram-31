
import {createSlider, updateSlider, hiddenSlider, showSlider, removeSlider} from './filter-slider.js';

const valueElement = document.querySelector('.effect-level__value');
const filtersElement = document.querySelector('.effects__list');
const pictureElement = document.querySelector('.img-upload__preview img');

const Filters = {
  EFFECT_NONE: 'effect-none',
  EFFECT_CHROME: 'effect-chrome',
  EFFECT_SEPIA: 'effect-sepia',
  EFFECT_MARVIN: 'effect-marvin',
  EFFECT_PHOBOS: 'effect-phobos',
  EFFECT_HEAT: 'effect-heat',
};

const FiltersOptions = {
  'effect-chrome': {
    min: 0,
    max: 1,
    step: 0.1,
  },
  'effect-sepia': {
    min: 0,
    max: 1,
    step: 0.1,
  },
  'effect-marvin': {
    min: 0,
    max: 100,
    step: 1,
  },
  'effect-phobos': {
    min: 0,
    max: 3,
    step: 0.1,
  },
  'effect-heat': {
    min: 1,
    max: 3,
    step: 0.1,
  },
};

const filterFunctions = {
  setFilterNone: () => {
    pictureElement.style.filter = null;
  },
  setFilterChrome: () => {
    pictureElement.style.filter = `grayscale(${valueElement.value})`;
  },
  setFilterSepia: () => {
    pictureElement.style.filter = `sepia(${valueElement.value})`;
  },
  setFilterMarvin: () => {
    pictureElement.style.filter = `invert(${valueElement.value}%)`;
  },
  setFilterPhobos: () => {
    pictureElement.style.filter = `blur(${valueElement.value}px)`;
  },
  setFilterHeat: () => {
    pictureElement.style.filter = `brightness(${valueElement.value})`;
  },
};

let currentFilter;

const setFilter = (value) => {
  valueElement.value = value;

  switch (currentFilter){
    case Filters.EFFECT_NONE:
      filterFunctions.setFilterNone();
      break;
    case Filters.EFFECT_CHROME:
      filterFunctions.setFilterChrome();
      break;
    case Filters.EFFECT_SEPIA:
      filterFunctions.setFilterSepia();
      break;
    case Filters.EFFECT_MARVIN:
      filterFunctions.setFilterMarvin();
      break;
    case Filters.EFFECT_PHOBOS:
      filterFunctions.setFilterPhobos();
      break;
    case Filters.EFFECT_HEAT:
      filterFunctions.setFilterHeat();
      break;
  }
};

const removeFilter = () => {
  removeSlider();
};

const hiddenFilter = () => {
  currentFilter = Filters.EFFECT_NONE;
  filterFunctions.setFilterNone();
  hiddenSlider();
  pictureElement.className = '';
};

const showFilter = () => {
  updateSlider(FiltersOptions[currentFilter]);
  showSlider();
};

const initFilter = () => {
  currentFilter = Filters.EFFECT_NONE;
  hiddenFilter();
  createSlider();

  filtersElement.addEventListener('change', (evt) => {
    currentFilter = evt.target.id;
    if (currentFilter === Filters.EFFECT_NONE) {
      hiddenFilter();
    } else {
      showFilter();
    }
  });
};

export {initFilter, setFilter, removeFilter};
