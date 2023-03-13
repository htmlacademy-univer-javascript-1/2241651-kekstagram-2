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

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createNumbersArray = (min, max) => {
  const numbers = [];
  for (let i = min; i <= max; i++) {
    numbers.push(i);
  }
  return numbers;
};

const shuffleArray = (elements) => {

  for (let i = 0; i < elements.length; i++) {
    const removedElementIndex = getRandomInteger(0, elements.length - 1);
    const removedElement = elements[removedElementIndex];
    elements.splice(removedElementIndex, 1);
    elements.push(removedElement);
  }

  return elements;
};

const createPhotos = (photosNumber) => {

  const photos = [];

  let photoIds = createNumbersArray(1, ID_COUNT);
  let urls = createNumbersArray(1, ID_COUNT);
  let commentIds = createNumbersArray(1, 1000);

  photoIds = shuffleArray(photoIds);
  commentIds = shuffleArray(commentIds);
  urls = shuffleArray(urls);

  for (let i = 0; i < photosNumber; i++) {
    photos[i] = {
      id: photoIds[i],
      url: `photos/${urls[i]}.jpg`,
      description: getRandomArrayElement(DESCRIPTIONS),
      likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
      comments: {
        id: commentIds[i],
        avatar: `img/avatar-${getRandomInteger(1, AVATAR_COUNT)}.svg`,
        message: getRandomArrayElement(MESSAGES),
        name: getRandomArrayElement(NAMES),
      },
    };
  }

  return photos;
};

createPhotos(ID_COUNT);
