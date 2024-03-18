import {isEscapeKey} from './util.js';

const AVATAR_SIZE = '35';
const COMMENT_LOADING_STEP = 5;

const bigPictureElement = document.querySelector('.big-picture');
const bigPictureImgElement = bigPictureElement.querySelector('.big-picture__img').querySelector('img');
const bigPictureLikesElement = bigPictureElement.querySelector('.likes-count');
const bigPictureCommentElement = bigPictureElement.querySelector('.social__comment-count');
const bigPictureCommentsLoaderElement = bigPictureElement.querySelector('.comments-loader');
const bigPictureCommentShownCountElement = bigPictureCommentElement.querySelector('.social__comment-shown-count');
const bigPictureCommentTotalCountElement = bigPictureCommentElement.querySelector('.social__comment-total-count');
const bigPictureDescriptionElement = bigPictureElement.querySelector('.social__caption');
const bigPictureCloseElement = bigPictureElement.querySelector('#picture-cancel');
const commentsElement = bigPictureElement.querySelector('.social__comments');

let comments;
let commentsLoadedCount = 0;
let renderedPictureUrl;

const renderComment = (dataComment) => {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');

  const commentAvatar = document.createElement('img');
  commentAvatar.classList.add('social__picture');
  commentAvatar.src = dataComment.avatar;
  commentAvatar.alt = dataComment.name;
  commentAvatar.width = AVATAR_SIZE;
  commentAvatar.height = AVATAR_SIZE;
  commentElement.appendChild(commentAvatar);

  const commentText = document.createElement('p');
  commentText.classList.add('social__text');
  commentText.textContent = dataComment.message;
  commentElement.appendChild(commentText);
  return commentElement;
};

const renderComments = () => {
  const fragmentComments = document.createDocumentFragment();
  const nextComments = comments.slice(commentsLoadedCount, commentsLoadedCount + COMMENT_LOADING_STEP);
  nextComments.forEach((comment) => fragmentComments.appendChild(renderComment(comment)));

  commentsLoadedCount += nextComments.length;
  bigPictureCommentShownCountElement.textContent = commentsLoadedCount;

  if(commentsLoadedCount >= bigPictureCommentTotalCountElement.textContent) {
    bigPictureCommentsLoaderElement.classList.add('hidden');
  }

  commentsElement.appendChild(fragmentComments);
};

const renderBigPicture = (dataPicture) => {
  bigPictureImgElement.src = dataPicture.url;
  bigPictureLikesElement.textContent = dataPicture.likes;
  bigPictureCommentShownCountElement.textContent = 5;
  bigPictureCommentTotalCountElement.textContent = dataPicture.comments.length;
  bigPictureDescriptionElement.textContent = dataPicture.description;
  comments = dataPicture.comments;
  renderComments();
  renderedPictureUrl = dataPicture.url;
};

const closePicture = () => {
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  bigPictureCloseElement.removeEventListener('click', closePicture);
};

const clearComments = () => {
  commentsElement.innerHTML = '';
  bigPictureCommentsLoaderElement.classList.remove('hidden');
  commentsLoadedCount = 0;
};

const openPicture = (dataPicture) => {
  if (dataPicture.url !== renderedPictureUrl) {
    clearComments();
    renderBigPicture(dataPicture);
  }

  bigPictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
  bigPictureCloseElement.addEventListener('click', closePicture);
  bigPictureCommentsLoaderElement.addEventListener('click', renderComments);
};

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePicture();
  }
}

export {openPicture};
