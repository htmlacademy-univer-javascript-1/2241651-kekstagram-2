import './form-upload-picture.js';
import './validation-form.js';
import './upload-pictures.js';
import { renderThumbnails } from './thumbnail.js';
import { getData } from './api.js';
import { initPicturesFilter } from './filter.js';

getData((pictures) => {
  renderThumbnails(pictures);
  initPicturesFilter(pictures);
});
