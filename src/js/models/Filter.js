import elements from '../base'
import { filterCountry } from '../utils/utils'
import { clearResults, renderResults } from '../views/view';


/* Filter Controller */
const filter = (data) => {
    const allCountries = [...data];
    const countries = [...data];
    elements.filter.addEventListener('click', e => {
        if (e.target.matches('.filter--list li, .filter--list li *')) {
            const query = e.target.innerText;
            if (query !== 'All') {
                const countriesByRegion = filterCountry(countries, query, 'region');
                clearResults();
                countriesByRegion.forEach(country => renderResults(country));
            } else {
                clearResults();
                allCountries.forEach(country => renderResults(country));
            }
        }
        e.preventDefault();
    });
}

export default filter;