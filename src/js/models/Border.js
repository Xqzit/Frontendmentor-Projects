import axios from 'axios';

export default class Border {
    constructor(code) {
        this.code = code;
    }
    async getBorder() {
        try {
            const res = await axios(`https://restcountries.eu/rest/v2/alpha/${this.code}`);
            this.results = res.data;
        } catch (error) {
            console.error(error);
        }
    }
}