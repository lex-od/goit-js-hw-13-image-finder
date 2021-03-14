export default {
    BASE_URL: 'https://pixabay.com/api',
    PAGE_SIZE: 12,
    API_KEY: '20679339-fea13a2297aa7649e9595d106',

    async fetchImagesByName(imgName, pageNum = 1) {
        const url = `${this.BASE_URL}/?image_type=photo&orientation=horizontal&q=${imgName}&page=${pageNum}&per_page=${this.PAGE_SIZE}&key=${this.API_KEY}`;

        const response = await fetch(url);

        return await response.json();
    },
};
