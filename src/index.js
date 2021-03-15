import './styles.scss';
import photoCardTmpl from './data/photoCard.hbs';
import API from './js/apiService';

const refs = {
    searchForm: document.querySelector('#search-form'),
    galleryList: document.querySelector('#gallery-list'),
    galleryLoad: document.querySelector('#gallery-load'),
};

refs.searchForm.addEventListener('submit', onSearch);
refs.galleryLoad.addEventListener('click', onGalleryLoadClick);

async function onSearch(e) {
    e.preventDefault();

    const query = e.currentTarget.elements.query.value;

    try {
        const hits = await API.getFirstPageHits(query);

        clearGalleryList();
        addGalleryListMarkup(hits);
    } catch (err) {
        apiErrorHandler(err);
    }
}

async function onGalleryLoadClick() {
    if (API.isLastPage) {
        return;
    }

    try {
        const hits = await API.getNextPageHits();

        addGalleryListMarkup(hits);
    } catch (err) {
        apiErrorHandler(err);
    }
}

function addGalleryListMarkup(hits) {
    refs.galleryList.insertAdjacentHTML('beforeend', photoCardTmpl(hits));
}

function clearGalleryList() {
    refs.galleryList.innerHTML = '';
}

function apiErrorHandler(err) {
    console.log(`✖ ${err.name}: ${err.message}`);

    clearGalleryList();
}
