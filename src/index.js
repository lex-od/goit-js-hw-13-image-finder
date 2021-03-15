import './styles.scss';
import photoCardTmpl from './data/photoCard.hbs';
import apiServ from './js/apiService';

const refs = {
    searchForm: document.querySelector('#search-form'),
    galleryList: document.querySelector('#gallery-list'),
    galleryLoad: document.querySelector('#gallery-load'),
};

refs.searchForm.addEventListener('submit', onSearch);
refs.galleryLoad.addEventListener('click', onGalleryLoadClick);

let lastSearchQuery = '';
let nextSearchPage = 0;

async function onSearch(e) {
    e.preventDefault();

    lastSearchQuery = e.currentTarget.elements.query.value;

    if (!lastSearchQuery) {
        nextSearchPage = 0;
        clearGalleryList();
        return;
    }

    nextSearchPage = 1;

    try {
        const images = await fetchNextGalleryPage();

        clearGalleryList();
        addGalleryListMarkup(images);
    } catch (err) {
        console.log(`✖ ${err.name}: ${err.message}`);

        clearGalleryList();
    }
}

async function onGalleryLoadClick() {
    //
}

async function fetchNextGalleryPage() {
    const searchRes = await apiServ.fetchImagesByName(
        lastSearchQuery,
        nextSearchPage,
    );

    // if (result)

    return searchRes.hits;
}

function addGalleryListMarkup(images) {
    refs.galleryList.insertAdjacentHTML('beforeend', photoCardTmpl(images));
}

function clearGalleryList() {
    refs.galleryList.innerHTML = '';
}
