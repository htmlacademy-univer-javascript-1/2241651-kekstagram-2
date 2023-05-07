// Проверка нажатой клавиши
const isEscapeKey = (evt) => evt.key === 'Escape';

/**
 * Генерация случайного числа из диапазона
 * @param {int} a - начальное число диапазона
 * @param {int} b - последнее число диапазона
 * @returns {int} - случайное число
 */
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

/**
 * Генерация случайного элемента списка
 * @param {object} list - список
 * @returns - случайный элемент списка
 */
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createIdGenerator = () => {
  let lastGeneratedId = 0;

  return () => {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};

// Выполнение действия по нажатию на кнопку
const checkActionCode = (evt, key, action) => {
  if (evt.keyCode === key) {
    action();
  }
};

export {getRandomInteger, createIdGenerator, getRandomArrayElement, isEscapeKey, checkActionCode};

