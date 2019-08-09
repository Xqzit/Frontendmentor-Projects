import axios from 'axios'

export default class Search {
    constructor(query) {
        this.query = query;
    }
    async getSearchResults() {
        try {
            const res = await axios(`https://restcountries.eu/rest/v2/name/${this.query}`);
            this.results = res.data;
        } catch (error) {
            console.error(error);
        }
    }
}