import elements from '../base';

// Switching Theme
export const switchTheme = () => {
    const dataTheme = elements.html.getAttribute('data-theme');
    if (dataTheme === 'dark') {
        elements.html.setAttribute('data-theme', 'light');
        elements.icon.classList.remove('fa-sun');
        elements.icon.classList.add('fa-moon');
        elements.mode.innerHTML = "Dark Mode";
    } else {
        elements.html.setAttribute('data-theme', 'dark');
        elements.icon.classList.remove('fa-moon');
        elements.icon.classList.add('fa-sun');
        elements.mode.innerHTML = "Light Mode";
    }
};

// Rendering Results
export const renderResults = (country) => {
    const markup = `
    <div class="results__container" data-country="${country.name}">
        <a class="results__link" href="#">
            <figure class="country__fig">
                <img src="${country.flag}" alt="${country.name}">
            </figure>
            <div class="country__data">
                <div class="country__data--top">
                    <h2 class="country__name">${country.name}</h2>
                </div>
                <div class="country__data--bottom">
                    <p class="country__population">Population: ${country.population.toLocaleString('en-US')}</p>
                    <p class="country__region">Region: ${country.region}</p>
                    <p class="country__capital">Capital: ${country.capital}</p>
                </div>
            </div>
        </a>
    </div>`;
    elements.results.insertAdjacentHTML('beforeend', markup);
};

// Search View clear results
export const clearResults = () => {
    elements.results.innerHTML = '';
}
// Show 404 error page
export const showError = () => {
    const markup = `<h2 style="width: 90vh">No results found. Please check the spelling</h2>`
    elements.results.insertAdjacentHTML('afterbegin', markup);
}

/* Render Country details page */

export const renderCountryPage = (country, iso) => {
    const borders = country.borders;
    const convertIsoToName = (ISO3) => {
        const isoMap = { ...iso };
        return isoMap[ISO3];
    }
    convertIsoToName('IRN');
    let borderMarkup = ""
    const generateBorderMarkup = () => {
        borders.forEach(country => {
            const countryName = convertIsoToName(country);
            borderMarkup += `<button class="btn border-btn" data-border="${countryName}">${countryName.replace(/\([^]*\)/g, '')}</button>`;
        })
    }
    generateBorderMarkup();

    const markup = `
    <div class="wrapper">
        <button class="btn back-btn"><i class="fas fa-arrow-left" href="#"></i>Back </button>
        <div class="country__detailed__data">
            <figure class="country__flag">
                <img src="${country.flag}" alt="${country.name}">
            </figure>
            <div class="country__details">
                <div class="country__details-top">
                    <h2>${country.name}</h2>
                </div>
                <div class="country__details-main">
                    <div class="country__details-main-left">
                        <p><span class="bold">Native Name: </span>${country.nativeName}</p>
                        <p><span class="bold">Population: </span>${country.population.toLocaleString('en-US')}</p>
                        <p><span class="bold">Region: </span>${country.region}</p>
                        <p><span class="bold">Sub Region: </span>${country.subregion}</p>
                        <p><span class="bold">Capital: </span>${country.capital}</p>
                    </div>
                    <div class="country__details-main-right">
                        <p><span class="bold">Top Level Domain: </span>${country.topLevelDomain}</p>
                        <p><span class="bold">Currencies: </span>${country.currencies[0].name}</p>
                        <p><span class="bold">Languages: </span>${country.languages[0].name}</p>
                    </div>
                </div>
                <div class="country__details-bottom">
                    <h3 class="bold">Border Countries:</h3>
                    <div class="country__border-details" id="countryBorders">
                    ${borderMarkup}
                    </div>
                </div>
            </div >
        </div >
    </div > `;
    elements.main.insertAdjacentHTML('afterbegin', markup);
}
// `< button class="btn border-btn" > ${ border }</ > `


export const clearCountryPage = (el) => {
    el.remove();
}


const generatePageNumbers = (num) => {
    let markup = '';
    let i = 1;
    while (i <= num) {
        markup += `<button class="page-btn" data-index="${i - 1}">${i}</button>`;
        i++;
    }
    return markup;
}
export const paginationNumbers = (num) => {
    const markup = generatePageNumbers(num);
    elements.pagination.insertAdjacentHTML('beforeend', markup);
}

export const clearPagination = () => {
    elements.pagination.innerHTML = '';
}