import {initMiniature} from './miniature.js';
import {loadImage} from './form.js';
import {getData} from './api.js';
import {showAlert} from './util.js';

getData()
  .then((pictures) => {
    initMiniature(pictures);
  })
  .catch(
    () => {
      showAlert('Не удалось загрузить данные');
    }
  );

loadImage();
