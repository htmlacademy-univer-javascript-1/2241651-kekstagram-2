import { isEscapeKey } from './utils.js';

const showUploadModal = (modal) => {
  const successModalTemplate = document.querySelector('#success').content.querySelector('.success');
  const errorModalTemplate = document.querySelector('#error').content.querySelector('.error');
  let modalTemplate;

  switch (modal) {
    case 'success':
      modalTemplate = successModalTemplate;
      break;
    case 'error':
      modalTemplate = errorModalTemplate;
      break;
  }

  const modalElement = modalTemplate.cloneNode(true);
  const modalInner = modalElement.querySelector('div');
  const modalButton = modalElement.querySelector('button');

  const onButtonClick = () => {
    closeModal();
  };


  const onModalEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeModal();
    }
  };

  const onModalOutsideClick = (evt) => {
    if (!evt.composedPath().includes(modalInner)) {
      closeModal();
    }
  };

  modalButton.addEventListener('click', onButtonClick);
  document.addEventListener('keydown', onModalEscKeydown);
  document.addEventListener('click', onModalOutsideClick);

  document.body.append(modalElement);

  function closeModal() {
    modalButton.removeEventListener('click', onButtonClick);
    document.removeEventListener('keydown', onModalEscKeydown);
    document.removeEventListener('click', onModalOutsideClick);
    modalElement.remove();
  }
};

export { showUploadModal };
