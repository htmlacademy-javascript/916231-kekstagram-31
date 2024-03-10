import { getData } from './data.js';
import { getRandomInteger, createUniqueNumbersGenerator } from './util.js';

const MIN_ID_PHOTO = 1;
const MAX_ID_PHOTO = 25;
const MIN_NUMBER_PHOTO = 1;
const MAX_NUMBER_PHOTO = 25;
const MIN_COUNT_LIKES = 15;
const MAX_COUNT_LIKES = 200;
const MIN_COUNT_COMMENTS = 0;
const MAX_COUNT_COMMENTS = 30;
const MIN_ID_COMMENT = 1;
const MAX_ID_COMMENT = 1000;
const MIN_NUMBER_AVATAR = 1;
const MAX_NUMBER_AVATAR = 6;
const PHOTOS_COUNT = 25;

const {PHOTO_DESCRIPTIONS, COMMENT_MESSAGES, COMMENT_NAMES} = getData();

const getCommentId = createUniqueNumbersGenerator(MIN_ID_COMMENT, MAX_ID_COMMENT);

const getComment = () => ({
  id: getCommentId(),
  avatar: `img/avatar-${ getRandomInteger(MIN_NUMBER_AVATAR, MAX_NUMBER_AVATAR) }.svg`,
  message: COMMENT_MESSAGES[getRandomInteger(0, COMMENT_MESSAGES.length - 1)],
  name: COMMENT_NAMES[getRandomInteger(0, COMMENT_NAMES.length - 1)],
});

const getPhotoId = createUniqueNumbersGenerator(MIN_ID_PHOTO, MAX_ID_PHOTO);

const getNumberPhoto = createUniqueNumbersGenerator(MIN_NUMBER_PHOTO, MAX_NUMBER_PHOTO);

const getPhoto = () => ({
  id: getPhotoId(),
  url: `photos/${ getNumberPhoto() }.jpg`,
  description: PHOTO_DESCRIPTIONS[getRandomInteger(0, PHOTO_DESCRIPTIONS.length - 1)],
  likes: getRandomInteger(MIN_COUNT_LIKES, MAX_COUNT_LIKES),
  comments: Array.from({length: getRandomInteger(MIN_COUNT_COMMENTS, MAX_COUNT_COMMENTS)}, getComment),
});

const generatePhotos = () => Array.from({length: PHOTOS_COUNT}, getPhoto);

export {generatePhotos};
