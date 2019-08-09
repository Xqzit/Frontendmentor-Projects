import axios from 'axios';

export default class Home {
    constructor() {
        this.results = [];
    }
    // fetch all country details
    getAllCountries = async () => {
        try {
            const response = await axios.get('https://restcountries.eu/rest/v2/all');
            const data = response.data;
            data.forEach(el => {
                this.results.push(el);
            })
            // console.log(this.results);
        } catch (error) {
            alert(`Oops! Something Went Wrong :()`);
        }
    }
}