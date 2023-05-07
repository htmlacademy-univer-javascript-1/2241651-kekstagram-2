import {getPhotos} from './data.js';
import {renderThumbnails} from './thumbnail.js';
import './form-upload-picture.js';
import './validation-form.js';

renderThumbnails(getPhotos());
