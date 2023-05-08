import { showAlertMessage } from './utils.js';

const API_URL = 'https://28.javascript.pages.academy/kekstagram';

const getData = (onSuccess) => {
  fetch(`${API_URL}/data`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((data) => onSuccess(data))
    .catch(() => showAlertMessage('Не удалось загрузить данные с сервера', 5000));
};

const sendData = (data, onSuccess, onError) => {
  fetch(API_URL,
    {
      method: 'POST',
      body: data,
    })
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onError();
      }
    })
    .catch(() => onError());
};

export { getData, sendData };
