import axios from 'axios';

export default class Country {
    constructor(name) {
        this.name = name;
    }
    async getCountry() {
        try {
            const res = await axios(`https://restcountries.eu/rest/v2/name/${this.name}?fullText=true`);
            this.results = res.data;
            this.borders = res.data[0].borders;
        } catch (error) {
            console.error(error);
        }
    }
}