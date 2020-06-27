import '../css/style.css';
import '../css/page-style.css';
import elements from './base';
import { fetchCountries, createIsoMap } from './utils/utils'
import home from './models/home'
import filterByRegion from './models/filter'
import search from './models/search'
import countryPage from './models/country'
import { switchTheme } from './views/view';


// Theme Switcher
elements.themeBtn.addEventListener('click', switchTheme);

/* Controller */
const initController = async () => {
    const data = await fetchCountries();
    if (data !== undefined) {
        const isoMap = createIsoMap(data);
        home(data);
        filterByRegion(data);
        search(data);
        countryPage(data, isoMap);
    }

    // Click on the logo
    elements.logo.addEventListener('click', (e) => {
        home(data);
        e.preventDefault();
    });
}

initController();


// Things to do

/*
* Add Pagination
* https://www.thatsoftwaredude.com/content/9101/custom-javascript-pagination-of-objects
* https://www.thatsoftwaredude.com/content/6125/how-to-paginate-through-a-collection-in-javascript
*/