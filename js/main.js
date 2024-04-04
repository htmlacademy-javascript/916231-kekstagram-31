import {loadPicture} from './load-picture.js';
import {getData} from './api.js';
import {showAlert} from './util.js';
import {initSortingPictures} from './sorting-picture.js';

getData()
  .then((pictures) => {
    initSortingPictures(pictures);
  })
  .catch(
    () => {
      showAlert('Не удалось загрузить данные');
    }
  );

loadPicture();
