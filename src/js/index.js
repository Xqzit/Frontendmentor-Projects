import '../css/style.css';
import '../css/page-style.css';
import axios from 'axios';
import {
    elements
} from './base';
import Home from './models/Home';
import Search from './models/Search';
import Filter from './models/Filter';
import Country from './models/Country';
import Border from './models/Border';
import * as view from './views/view';
import {
    async
} from 'q';


/**
 * *Switching Themes
 * *fetching all countries
 * *render the homepage
 * *Search for a country by name
 * *render search result
 * *Filter results by region
 * *Render filtered results
 * Click on a result container and go to the next page
 * render country details
 * click on border and go to that page
 * click on back to original page
 */

// CONTROLLER

/* -- State -- */

const state = {};

// Theme Switcher
elements.themeBtn.addEventListener('click', view.switchTheme);

/** HOME CONTROLLER **/

// fetching all countries
const controlHome = async () => {
    state.home = new Home();
    try {
        view.clearResults();
        await state.home.getAllCountries();
        // rendering homepage results
        state.home.results.forEach(el => view.renderResults(el));
    } catch (error) {
        alert(`Oops...page couldn't load!`);
    }
};
window.addEventListener('load', controlHome);

/** SEARCH CONTROLLER **/

const controlSearch = async () => {
    const query = view.getInputs();
    if (query) {
        state.search = new Search(query);
        try {
            // clear the home result
            view.clearResults();
            // fetch the search data
            await state.search.getSearchResults();

            // render search results page
            state.search.results.forEach(el => view.renderResults(el));
        } catch (error) {
            view.showError();
        }
    }
}
elements.search.addEventListener('keyup', controlSearch);



/**  FILTER CONTROLLER **/

const controlFilter = async (q) => {
    // Instantiate filter obj
    state.filter = new Filter(q);
    // clear prev search results
    view.clearResults();
    if (q !== 'All') {
        try {
            // filtering results by region
            await state.filter.filterByRegion();
            // render results by region
            state.filter.results.forEach(el => view.renderResults(el));
        } catch (error) {
            view.clearResults();
            view.showError();
        }
    } else {
        controlHome();
    }

}
//  Adding event listeners to all the filter list and the filter the list as per the selected region
elements.filter.addEventListener('click', e => {
    if (e.target.matches('.filter--list li, .filter--list li *')) {
        const query = e.target.innerText;
        controlFilter(query);
    }
    e.preventDefault();
})

/** COUNTRY CONTROLLER **/

const controlCountry = async (q) => {
    state.country = new Country(q);
    // Clear HomePage
    view.clearResults();
    // hide the search div
    elements.searchDiv.style.display = 'none';
    try {
        // Get clicked country data
        await state.country.getCountry();
        // render the country page
        state.country.results.forEach(el => view.renderCountryPage(el));
        // Render buttons for all border countries

        state.country.borders.forEach(async (el) => {
            const res = await axios(`https://restcountries.eu/rest/v2/alpha/${el}?fields=name`);
            const data = res.data;
            view.renderButton(document.getElementById('countryBorders'), el, data);
        });


    } catch (error) {
        console.error(error);
        view.showError();
    }
}

// Adding event listeners to all the result divs and rendering the details page

elements.results.addEventListener('click', (e) => {
    const query = e.target.matches('.results__container, .results__container *');
    if (query) {
        const countryName = e.target.closest('.results__container').dataset.country;
        // get Country Details
        controlCountry(countryName);
    }
    e.preventDefault();
});

/** BORDER CONTROLLER **/
const controlBorder = async (q) => {
    state.border = new Border(q);
    try {
        await state.border.getBorder();
        // render the clicked page results
        controlCountry(state.border.results.name);
    } catch (error) {
        view.showError();
    }
}

// Click on the logo
elements.logo.addEventListener('click', (e) => {
    controlHome();
    e.preventDefault();
});


// Event propagation by adding event to the parent element

elements.main.addEventListener('click', (e) => {
    // Back btn
    if (e.target.matches('.back-btn', '.back-btn i')) {
        view.clearCountryPage(e.target.parentElement);
        elements.searchDiv.style.display = 'flex';
        controlHome();
    }
    // Border button
    if (e.target.closest('.border-btn')) {
        //   Remove the prev country page
        const wrapper = document.querySelector('.wrapper');
        elements.main.removeChild(wrapper);
        const id = e.target.dataset.border;
        // BORDER CONTROLLER
        controlBorder(id);
    }
    e.preventDefault();
});