import {isEscapeKey} from './util.js';

const AVATAR_SIZE = '35';

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

const renderComments = (comments) => {
  const fragmentComments = document.createDocumentFragment();
  comments.forEach((comment) => fragmentComments.appendChild(renderComment(comment)));
  commentsElement.innerHTML = '';
  commentsElement.appendChild(fragmentComments);
};

const renderBigPicture = (dataPicture) => {
  bigPictureImgElement.src = dataPicture.url;
  bigPictureLikesElement.textContent = dataPicture.likes;
  bigPictureCommentShownCountElement.textContent = 5;
  bigPictureCommentTotalCountElement.textContent = dataPicture.comments.length;
  bigPictureDescriptionElement.textContent = dataPicture.description;
  renderComments(dataPicture.comments);
};

const closePicture = () => {
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
  bigPictureCloseElement.removeEventListener('click', closePicture);
};


const openPicture = (dataPicture) => {
  renderBigPicture(dataPicture);
  bigPictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  bigPictureCommentElement.classList.add('hidden');
  bigPictureCommentsLoaderElement.classList.add('hidden');

  document.addEventListener('keydown', onDocumentKeydown);
  bigPictureCloseElement.addEventListener('click', closePicture);
};

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePicture();
  }
}

export {openPicture};
