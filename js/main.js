import './data.js';
import {renderThumbnails} from './thumbnail.js';
import './form-upload-picture.js';
import './validation-form.js';
import './get-effect.js';
import { getData } from './api.js';

getData(renderThumbnails);
