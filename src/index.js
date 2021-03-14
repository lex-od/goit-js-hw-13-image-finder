import './styles.scss';
import photoCardTmpl from './data/photoCard.hbs';
import apiServ from './js/apiService';

const refs = {
    searchForm: document.querySelector('#search-form'),
    galleryList: document.querySelector('#gallery-list'),
};

refs.searchForm.addEventListener('submit', onSearch);

async function onSearch(e) {
    e.preventDefault();

    const queryInput = e.currentTarget.elements.query;

    if (!queryInput.value) {
        return;
    }

    let searchRes = null;

    try {
        searchRes = await apiServ.fetchImagesByName(queryInput.value, 1);
    } catch (err) {
        console.log(`✖ ${err.name}: ${err.message}`);
    }

    addGalleryListMarkup(searchRes.hits);
}

function addGalleryListMarkup(images) {
    refs.galleryList.insertAdjacentHTML('beforeend', photoCardTmpl(images));
}
