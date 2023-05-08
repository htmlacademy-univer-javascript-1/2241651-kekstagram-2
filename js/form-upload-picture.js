import { isEscapeKey } from './utils.js';
import { getEffect } from './get-effect.js';

const Scale = {
  MIN: 25,
  MAX: 100,
  STEP: 25
};

const body = document.querySelector('body');
const uploadForm = document.querySelector('#upload-select-image');
const fileUpload = document.querySelector('#upload-file');
const editModal = document.querySelector('.img-upload__overlay');
const editModalClose = document.querySelector('#upload-cancel');

const hashtagsInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');

const sliderContainer = document.querySelector('.effect-level');
const sliderElement = document.querySelector('.effect-level__slider');
const valueElement = document.querySelector('.effect-level__value');
const imagePreview = document.querySelector('.img-upload__preview').querySelector('img');
const effectsList = document.querySelector('.effects__list');
const scaleValue = document.querySelector('.scale__control--value');
const scaleSmaller = document.querySelector('.scale__control--smaller');
const scaleBigger = document.querySelector('.scale__control--bigger');

let activeEffect;

// Инициализация слайдера применения эффекта к изображению
const initSlider = (effect) => {
  valueElement.value = effect.max;

  noUiSlider.create(sliderElement, {
    range: {
      min: effect.min,
      max: effect.max,
    },
    start: effect.max,
    step: effect.step,
    connect: 'lower',
    format: {
      to: (value) => {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: (value) => parseFloat(value),
    },
  });

  sliderElement.noUiSlider.on('update', () => {
    valueElement.value = sliderElement.noUiSlider.get();
    imagePreview.style.filter = `${effect.filter}(${valueElement.value}${effect.unit})`;
  });
};

// Изменение масштаба изображения
const setScale = (value) => {
  imagePreview.style.transform = `scale(${value / 100})`;
  scaleValue.value = `${ value }%`;
};

// Сброс эффектов, применённых к изображению
const resetEffect = () => {
  if (activeEffect) {
    imagePreview.classList.remove(activeEffect.class);
    sliderElement.noUiSlider.destroy();
  }

  setScale(100);
  imagePreview.style.filter = null;
  sliderContainer.classList.add('hidden');
};


const onScaleSmallerClick = () => {
  let value = parseInt(scaleValue.value, 10);

  if (value > Scale.MIN) {
    value -= Scale.STEP;
    setScale(value);
  }
};

const onScaleBiggerClick = () => {
  let value = parseInt(scaleValue.value, 10);

  if (value < Scale.MAX) {
    value += Scale.STEP;
    setScale(value);
  }
};

// Применение эффектов к изображению
const setEffect = (evt) => {
  // Сброс эффекта
  resetEffect();
  // Выбор актвиного эффекта
  activeEffect = getEffect(evt);

  // Возвращает оригинал
  if (activeEffect === '') {
    return;
  }

  initSlider(activeEffect);
  sliderContainer.classList.remove('hidden');
  imagePreview.classList.add(activeEffect.class);
};

const onEffecstListClick = (evt) => {
  setEffect(evt);
};

const onCloseEditModalClick = () => {
  closeEditModal();
};

const onEditModalEscKeydown = (evt) => {
  const focused = document.activeElement;

  // Если фокус находится в поле ввода хэш-тега или комментария,
  // нажатие на Esc не должно приводить к закрытию формы редактирования изображения
  if (focused !== hashtagsInput && focused !== commentInput && isEscapeKey(evt)) {
    evt.preventDefault();
    closeEditModal();
  }
};

// Открытие формы редактирования изображения
const onFileUploadChange = () => {
  editModal.classList.remove('hidden');
  sliderContainer.classList.add('hidden');
  scaleValue.value = Scale.MAX;

  document.addEventListener('keydown', onEditModalEscKeydown);
  editModalClose.addEventListener('click', onCloseEditModalClick);
  effectsList.addEventListener('click', onEffecstListClick);
  scaleBigger.addEventListener('click', onScaleBiggerClick);
  scaleSmaller.addEventListener('click', onScaleSmallerClick);
};

// Закрытие формы редактирования изображения
function closeEditModal() {
  editModal.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadForm.reset();
  // resetEffect();

  document.removeEventListener('keydown', onEditModalEscKeydown);
  editModalClose.removeEventListener('click', onCloseEditModalClick);
  effectsList.removeEventListener('click', onEffecstListClick);
  scaleBigger.removeEventListener('click', onScaleBiggerClick);
  scaleSmaller.removeEventListener('click', onScaleSmallerClick);
}

fileUpload.addEventListener('change', onFileUploadChange);

export { closeEditModal };
