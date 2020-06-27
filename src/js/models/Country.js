import elements from '../base'
import { clearResults, clearCountryPage, renderCountryPage } from '../views/view'
import home from './home'
import { filterCountry } from '../utils/utils'

const countryPage = (data, iso) => {
    const countries = [...data]
    const borderCountries = [...data];
    elements.results.addEventListener('click', (e) => {
        const clickOnCard = e.target.matches('.results__container, .results__container *');
        if (clickOnCard) {
            const countryName = e.target.closest('.results__container').dataset.country;
            const country = filterCountry(countries, countryName, 'name');
            elements.searchDiv.style.display = 'none';
            clearResults();
            renderCountryPage(country[0], iso);
        }
        e.preventDefault();
    });

    elements.main.addEventListener('click', (e) => {
        // Back btn
        if (e.target.matches('.back-btn', '.back-btn i')) {
            clearCountryPage(e.target.parentElement);
            elements.searchDiv.style.display = 'flex';
            home(data);
        }
        // Border button
        if (e.target.closest('.border-btn')) {
            const wrapper = document.querySelector('.wrapper');
            elements.main.removeChild(wrapper);
            const query = e.target.dataset.border;
            const country = filterCountry(borderCountries, query, 'name');
            renderCountryPage(country[0], iso);
        }
        e.preventDefault();
    });
}

export default countryPage;