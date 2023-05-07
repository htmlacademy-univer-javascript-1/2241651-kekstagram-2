import { isEscapeKey } from './utils.js';

const body = document.querySelector('body');
const uploadForm = document.querySelector('#upload-select-image');
const fileUpload = document.querySelector('#upload-file');
const editModal = document.querySelector('.img-upload__overlay');
const editModalClose = document.querySelector('#upload-cancel');

// Закрытие формы редактирования изображения
const closeEditModal = () => {
  fileUpload.value = '';
  uploadForm.reset();
  editModal.classList.add('hidden');
  body.classList.remove('modal-open');

  editModalClose.removeEventListener('click', closeEditModal);
};

// Открытие формы редактирования изображения
const onFileUploadChange = () => {
  editModal.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeEditModal();
    }
  }, {once : true});
  editModalClose.addEventListener('click', () => {
    closeEditModal();
  });
};

fileUpload.addEventListener('change', onFileUploadChange);
