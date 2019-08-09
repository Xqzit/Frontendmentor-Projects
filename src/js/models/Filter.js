import axios from 'axios'

export default class Filter {
    constructor(region) {
        this.region = region;
    }
    async filterByRegion() {
        try {
            const res = await axios(`https://restcountries.eu/rest/v2/region/${this.region}`);
            this.results = res.data;
        } catch (error) {
            console.error(error);
        }
    }
}