import { closeEditModal } from './form-upload-picture.js';
import { showUploadModal } from './show-upload-modal.js';
import { sendData } from './api.js';

const Hashtag = {
  PATTERN: /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/,
  MAX_COUNT: 5,
  MAX_LENGTH: 20,
  SEPARATOR: ' '
};

const MAX_COMMENT_LENGHT = 140;
const uploadForm = document.querySelector('#upload-select-image');
const hashtagsInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');
const submitButton = document.querySelector('.img-upload__submit');

// Инициализация Pristine.js
const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__error-message',
});

// Проверка длины комментария
const validateComment = (value) => value.length <= MAX_COMMENT_LENGHT;

// Проверка хэштегов на соответствие паттерну Hashtag.PATTERN
const checkHashtagsPattern = (value) => {
  if (value === '') {
    return true;
  }

  const hashtagsArray = value.trim().split(Hashtag.SEPARATOR).filter((hashtag) => hashtag !== '');
  return hashtagsArray.every((hashtag) => Hashtag.PATTERN.test(hashtag));
};

// Проверка на повторяющиеся хэштеги
const checkHashtagsDuplicate = (value) => {
  const hashtagsArray = value.toLowerCase().trim().split(Hashtag.SEPARATOR).filter((hashtag) => hashtag !== '');
  const uniqueHashtags = new Set(hashtagsArray);
  return hashtagsArray.length === uniqueHashtags.size;
};

// Проверка количества хэштегов — не больше Hashtag.MAX_COUNT
const checkHashtagsCount = (value) => {
  const hashtagsArray = value.trim().split(Hashtag.SEPARATOR).filter((hashtag) => hashtag !== '');
  return hashtagsArray.length <= Hashtag.MAX_COUNT;
};

pristine.addValidator(
  commentInput,
  validateComment,
  `Максимальная длина комментария — ${MAX_COMMENT_LENGHT} символов`
);

pristine.addValidator(
  hashtagsInput,
  checkHashtagsPattern,
  `Формат хэштега — #хэштег (только буквы и цифры), максимальная длина хэштега — ${Hashtag.MAX_LENGTH} символов`
);

pristine.addValidator(
  hashtagsInput,
  checkHashtagsCount,
  `Максимальное количество хэштегов — ${Hashtag.MAX_COUNT}`
);

pristine.addValidator(
  hashtagsInput,
  checkHashtagsDuplicate,
  'Хэштеги не должны повторяться'
);

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикуем...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

// Обработчик на отправку формы
uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();

  if (!isValid) {
    return;
  }

  const formData = new FormData(evt.target);
  blockSubmitButton();

  const onSuccess = () => {
    closeEditModal();
    unblockSubmitButton();
    showUploadModal('success');
  };

  const onError = () => {
    closeEditModal();
    unblockSubmitButton();
    showUploadModal('error');
  };

  sendData(formData, onSuccess, onError);
});
