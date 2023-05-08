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

// Проверка строки на максимальную длину
const checkStringLength = (string, maxLenght) => string.length <= maxLenght;

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

// Создает и показывает сообщение об ошибке запроса при загрузке данных с сервера
const showAlertMessage = (message, time) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, time);
};

export {getRandomInteger, createIdGenerator, getRandomArrayElement, checkStringLength, isEscapeKey, checkActionCode, showAlertMessage};

