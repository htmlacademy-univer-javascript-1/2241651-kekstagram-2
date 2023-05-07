import {getRandomInteger, createIdGenerator, getRandomArrayElement} from './mocks.js';

const ID_COUNT = 25;
const AVATAR_COUNT = 6;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const NAMES = ['Мария', 'Кристина', 'Александр', 'Дмитрий', 'Ольга'];
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const DESCRIPTIONS = [
  'Парк в центре города с небольшим прудом',
  'Указатель к месту самой счастливой жизни',
  'Прогулка в парке',
  'Фотограф от бога',
  'Счастливы вместе',
  'Там тебя не достанут',
];

const generateCommentId = createIdGenerator();

const createMessage = () =>
  Array.from({ length: getRandomInteger(1, 2) }, () =>
    getRandomArrayElement(MESSAGES)
  ).join(' ');

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, AVATAR_COUNT)}.svg`,
  message: createMessage(),
  name: getRandomArrayElement(NAMES),
});

const createPhoto = (index) => ({
  id: index,
  url: `photos/${index}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
  comments: Array.from(
    { length: getRandomInteger(0, 20) },
    createComment
  )
});

const getPhotos = () =>
  Array.from({ length: ID_COUNT }, (_, pictureIndex) =>
    createPhoto(pictureIndex + 1)
  );

getPhotos();

export {getPhotos};
