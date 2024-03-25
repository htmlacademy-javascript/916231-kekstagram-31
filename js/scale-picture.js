const scaleElement = document.querySelector('.scale');
const btnSmallerElement = scaleElement.querySelector('.scale__control--smaller');
const btnBiggerElement = scaleElement.querySelector('.scale__control--bigger');
const scaleValueElement = scaleElement.querySelector('.scale__control--value');
const pictureElement = document.querySelector('.img-upload__preview img');

const SCALE_MAX = 1;
const SCALE_MIN = 0.25;
const SCALE_STEP = 0.25;
let scaleValue = SCALE_MAX;

const updateScaleValueElement = () => {
  scaleValueElement.value = `${scaleValue * 100 }%`;
};

const scalePicture = () => {
  pictureElement.style.transform = `scale(${scaleValue})`;
};

const onBtnSmallerClick = () => {
  if(scaleValue > SCALE_MIN) {
    scaleValue -= SCALE_STEP;
    updateScaleValueElement();
    scalePicture();
  }
};

const onBtnBiggerClick = () => {
  if(scaleValue < SCALE_MAX) {
    scaleValue += SCALE_STEP;
    updateScaleValueElement();
    scalePicture();
  }
};

const initScale = () => {
  btnSmallerElement.addEventListener('click', onBtnSmallerClick);
  btnBiggerElement.addEventListener('click', onBtnBiggerClick);
};

const removeScale = () => {
  scaleValue = SCALE_MAX;
  scalePicture();
  updateScaleValueElement();
  btnSmallerElement.removeEventListener('click', onBtnSmallerClick);
  btnBiggerElement.removeEventListener('click', onBtnBiggerClick);
};

export {initScale, removeScale};
