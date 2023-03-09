function getRandomIntInclusive(from, to){
  if (from < 0 || to < 0) {
    throw new RangeError ('Числа в диапазоне должны быть положительными');
  }

  if (typeof from === 'string' || typeof to === 'string') {
    throw new RangeError ('Значения должны быть чиcлами, а не строкой');
  }

  if (from > to) {
    [from, to] = [to, from];
  }

  if ( from === to) {
    return to;
  }

  from = Math.ceil(from);
  to = Math.floor(to);
  return Math.floor(Math.random() * (to - from + 1)) + from; //Максимум и минимум включаются
}

const isCorrectLength = (str, maxLength) => str.length <= maxLength;

export {getRandomIntInclusive, isCorrectLength};
//ссылка на источник:https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random

