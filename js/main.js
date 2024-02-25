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

const PHOTO_DESCRIPTIONS = [
  'Сложно сказать, почему логотип крупнейшей компании по производству мыльных пузырей развеял последние сомнения',
  'Случайный текст похож на звон колоколов',
  'Британские «ученые» заявили, что небо темнеет',
  'Как бы то ни было, современная методология разработки оказалась чрезвычайно полезной'
];
const COMMENT_MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const COMMENT_NAMES = [
  'Роман',
  'Дарья',
  'Виктория',
  'Иван'
];

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const createUniqueNumbersGenerator = (min, max) => {
  const previousValues = [];

  return function() {
    let currentValue = getRandomInteger(min, max);

    if (previousValues.length >= (max - min + 1)) {
      return null;
    }

    while(previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

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
  utl: `photos/${ getNumberPhoto() }.jpg`,
  description: PHOTO_DESCRIPTIONS[getRandomInteger(0, PHOTO_DESCRIPTIONS.length - 1)],
  likes: getRandomInteger(MIN_COUNT_LIKES, MAX_COUNT_LIKES),
  comments: Array.from({length: getRandomInteger(MIN_COUNT_COMMENTS, MAX_COUNT_COMMENTS)}, getComment),
});

const photos = Array.from({length: PHOTOS_COUNT}, getPhoto);

// eslint-disable-next-line no-console
console.log(photos);
