import elements from '../base'
import { match } from '../utils/utils'
import { clearResults, renderResults, showError, clearPagination } from '../views/view';
import home from './home'
import pagination from '../utils/pagination'
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
                clearPagination();
                pagination(countryData);
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