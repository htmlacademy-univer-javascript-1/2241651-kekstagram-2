import { isEscapeKey } from './util.js';

const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const commentsListElement = document.querySelector('.social__comments');
const commentTemplateElement = bigPicture.querySelector('.social__comment');
const bigPictureCommentsCount = bigPicture.querySelector('.social__comment-count');
const photoSourceElement = bigPicture.querySelector('.big-picture__img').querySelector('img');
const commentsLoaderElement = bigPicture.querySelector('.comments-loader');
const photoLikesElement = bigPicture.querySelector('.likes-count');
const photoDescriptionElement = bigPicture.querySelector('.social__caption');
const closedButtonElement = bigPicture.querySelector('.big-picture__cancel');

const addComment = (comment) => {
  const commentObject = commentTemplateElement.cloneNode(true);
  const commentPictureElement = commentObject.querySelector('.social__picture');
  commentPictureElement.src = comment.avatar;
  commentPictureElement.alt = comment.name;
  const commentTextElement = commentObject.querySelector('.social__text');
  commentTextElement.textContent = comment.message;
  return commentObject;
};

const showBigPhoto = (picture) => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  photoSourceElement.src = picture.url;
  photoLikesElement.textContent = picture.likes;
  photoDescriptionElement.textContent = picture.description;
  const commentsData = picture.comments;
  commentsLoaderElement.classList.remove('hidden');

  const commentsFragment = document.createDocumentFragment();
  let countShownComments = 5;
  if (commentsData.length < 5) {
    countShownComments = commentsData.length;
  }
  for (let i = 0; i < countShownComments; i++) {
    commentsFragment .appendChild(addComment(commentsData[i]));
  }

  bigPictureCommentsCount.textContent = `${countShownComments} из ${picture.comments.length} комментариев`;

  commentsListElement.innerHTML = '';

  const updateComments = (evt) => {
    evt.preventDefault();
    const commentsFragmentUpdate = document.createDocumentFragment();
    let count = 5;
    if ((commentsData.length - countShownComments) < 5 && (commentsData.length - countShownComments) > 0) {
      count = commentsData.length - countShownComments;
    }
    for (let i = countShownComments; i < countShownComments + count; i++) {
      commentsFragmentUpdate.append(addComment(commentsData[i]));
    }
    countShownComments = countShownComments + commentsFragmentUpdate.children.length;
    commentsListElement.append(commentsFragmentUpdate);
    if (countShownComments === commentsData.length) {
      commentsLoaderElement.classList.add('hidden');
    }
    bigPictureCommentsCount.textContent = `${countShownComments} из ${picture.comments.length} комментариев`;
  };

  const closePhotoCard = () => {
    bigPicture.classList.add('hidden');
    closedButtonElement.removeEventListener('click', closePhotoCard);
    commentsLoaderElement.removeEventListener('click', updateComments);
  };

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closePhotoCard();
    }
  }, {once: true});
  closedButtonElement.addEventListener('click', closePhotoCard);

  if (commentsData.length > 5) {
    commentsLoaderElement.classList.remove('visually-hidden');
    commentsLoaderElement.addEventListener('click', updateComments);
  } else {
    commentsLoaderElement.classList.add('visually-hidden');
  }

  commentsListElement.append(commentsFragment);
};

export { showBigPhoto };
