import { renderPictures } from './render-pictures.js';
import { debounce, shuffleElement } from './utils.js';

const initPicturesFilter = (pictures) => {
  const Filter = {
    DEFAULT: 'filter-default',
    RANDOM: 'filter-random',
    DISCUSSED: 'filter-discussed'
  };

  const RANDOM_PICTURES_COUNT = 10;
  const RERENDER_DELAY = 500;

  const picturesList = document.querySelector('.pictures');
  const picturesFilters = document.querySelector('.img-filters');

  picturesFilters.classList.remove('img-filters--inactive');

  const clearPicturesList = () => {
    const currentPictures = picturesList.querySelectorAll('.picture');

    currentPictures.forEach((picture) => {
      picture.remove();
    });
  };

  const compareComments = (pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length;

  const getDiscussedPictures = (array) => array.slice().sort(compareComments);

  const getRandomPictures = (array) => shuffleElement(array.slice()).slice(0, RANDOM_PICTURES_COUNT);

  const switchFilter = (filter) => {
    switch (filter) {
      case Filter.DEFAULT:
        renderPictures(pictures);
        break;
      case Filter.RANDOM:
        renderPictures(getRandomPictures(pictures));
        break;
      case Filter.DISCUSSED:
        renderPictures(getDiscussedPictures(pictures));
        break;
      default:
        break;
    }
  };

  const activateFilterButton = (button) => {
    document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    button.classList.add('img-filters__button--active');
  };

  const onFilterButtonClick = debounce((evt) => {
    if (!evt.target.classList.contains('img-filters__button')) {
      return;
    }

    clearPicturesList();
    switchFilter(evt.target.id);
    activateFilterButton(evt.target);
  }, RERENDER_DELAY);

  picturesFilters.addEventListener('click', onFilterButtonClick);
};

export { initPicturesFilter };
