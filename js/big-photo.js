import {isEscapeKey} from './util.js';

const bigPicture = document.querySelector('.big-picture');
const commentTemplate = document.querySelector('#comment').content.querySelector('li');
const commentsOfPhoto = bigPicture.querySelector('.social__comments');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
bigPicture.querySelector('.social__comment-count').classList.add('hidden');
bigPicture.querySelector('.comments-loader').classList.add('hidden');

const createComment = function(commentInfo) {
  const commentClone = commentTemplate.cloneNode(true);
  const profilPhoto = commentClone.querySelector('img');
  profilPhoto.src = commentInfo.avatar;
  profilPhoto.alt = commentInfo.name;
  commentClone.querySelector('p').textContent = commentInfo.message;
  return commentClone;
};

const openBigPicture = function() {
  document.body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');
};

const closeBigPicture = function() {
  closeButton.addEventListener ('click', () => {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
    commentsOfPhoto.innerHTML = '';
  });

  document.addEventListener('keydown', (evt)=> {
    if (isEscapeKey(evt)) {
      bigPicture.classList.add('hidden');
      document.body.classList.remove('modal-open');
      commentsOfPhoto.innerHTML = '';
    }
  });
};

const showBigPhoto = function(thumbnail, likes, comments, description) {
  bigPicture.querySelector('.big-picture__img img').src = thumbnail.querySelector('img').src;
  bigPicture.querySelector('.social__caption').textContent = description;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.comments-count').textContent = thumbnail.querySelector('.picture__comments').textContent;
  comments.forEach((comment) => {
    const newComment = createComment(comment);
    commentsOfPhoto.append(newComment);
  });
  openBigPicture();
  closeBigPicture();
};

export {showBigPhoto};
