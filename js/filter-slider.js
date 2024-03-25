import {setFilter} from './filter-picture';

const sliderWrapperElement = document.querySelector('.effect-level');
const sliderElement = sliderWrapperElement.querySelector('.effect-level__slider');

const createSlider = () => {
  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    connect: 'lower',
  });

  sliderElement.noUiSlider.on('update', () => {
    setFilter(sliderElement.noUiSlider.get());
  });
};

const updateSlider = (options) => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: options.min,
      max: options.max,
    },
    start: options.max,
    step: options.step,
    format: {
      to: function (value) {
        return Number.isInteger(value) ? value.toFixed(0) : value.toFixed(1);
      },
      from: function (value) {
        return value;
      },
    },
  });
};

const hiddenSlider = () => {
  sliderWrapperElement.classList.add('hidden');
};

const showSlider = () => {
  sliderWrapperElement.classList.remove('hidden');
};

const removeSlider = () => {
  sliderElement.noUiSlider.destroy();
};

export {createSlider, updateSlider, hiddenSlider, showSlider, removeSlider};
