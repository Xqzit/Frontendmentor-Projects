import elements from '../base'
import { match } from '../utils/utils'
import { clearResults, renderResults, showError } from '../views/view';
import home from './home'

/* Search Controller */
const search = (data) => {
    const countries = [...data];
    const search = elements.search;

    search.addEventListener('keyup', (event) => {
        const searchQuery = event.target.value;
        if (searchQuery !== "") {
            const query = searchQuery.replace(/^./, searchQuery[0].toUpperCase())
            const countryData = match(countries, query);

            if (countryData.length > 0) {
                clearResults();
                countryData.forEach(country => renderResults(country));
            } else {
                clearResults();
                showError();
            }
        } else {
            clearResults();
            home(data);
        }
    })
}

export default search;