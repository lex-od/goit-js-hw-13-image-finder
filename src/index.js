import './styles.scss';
import photoCardTmpl from './data/photoCard.hbs';
import apiServ from './js/apiService';

const refs = {
    searchForm: document.querySelector('#search-form'),
};

refs.searchForm.addEventListener('submit', onSearch);

async function onSearch(e) {
    e.preventDefault();

    const queryInput = e.currentTarget.elements.query;

    if (!queryInput.value) {
        return;
    }

    try {
        const response = await apiServ.fetchImagesByName(queryInput.value, 1);
    } catch (err) {
        console.log(`✖ ${err.name}: ${err.message}`);
    }
}
