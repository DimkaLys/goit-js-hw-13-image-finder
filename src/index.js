import './css/style.css';
import { error } from '../node_modules/@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import getPictures from './js/apiService';
import createCard from './template/card.hbs';
import * as basicLightbox from 'basiclightbox';

const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  btnMore: document.querySelector('.btn'),
};

const state = {
  page: 1,
  query: '',
};

// !
const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5,
};
// !

refs.form.addEventListener('submit', onSubmit);
refs.btnMore.addEventListener('click', onBtnMore);
refs.gallery.addEventListener('click', onImgClick);
refs.btnMore.style.visibility = 'hidden';

async function onSubmit(e) {
  e.preventDefault();
  refs.btnMore.style.visibility = 'hidden';
  state.query = e.currentTarget.elements.query.value;
  state.page = 1;
  const {
    data: { hits },
  } = await getPictures(state.query, state.page);
  if (hits.length === 0) {
    return error({
      text: 'Enter correct name',
    });
  }
  if (hits.length > 11) {
    refs.btnMore.style.visibility = 'visible';
  }
  const markup = createCard(hits);
  refs.gallery.innerHTML = markup;
}

async function onBtnMore(e) {
  state.page += 1;
  const {
    data: { hits },
  } = await getPictures(state.query, state.page);
  const markup = createCard(hits);
  refs.gallery.insertAdjacentHTML('beforeend', markup);

  // !
  if (state.page === 2) {
    const observer = new IntersectionObserver(onBtnMore, options);
    observer.observe(refs.btnMore);
  }
  // !

  // refs.gallery.scrollIntoView({
  //   behavior: 'smooth',
  //   block: 'end',
  // });
}

function onImgClick(e) {
  if (e.target.nodeName !== 'IMG') {
    return;
  }
  const currentImg = e.target.dataset.src;
  const instance = basicLightbox.create(`
    <img src="${currentImg}" width="800" height="600">
`);

  instance.show();
}
