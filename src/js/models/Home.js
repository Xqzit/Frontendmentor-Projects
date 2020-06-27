import { clearResults, renderResults } from '../views/view';

/* Home Controller */

const home = (countries) => {
    clearResults();
    countries.forEach(country => renderResults(country));
};

export default home;