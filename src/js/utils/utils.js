import { clearResults, renderResults } from '../views/view';

export const fetchCountries = async () => {
  const response = await fetch('https://restcountries.eu/rest/v2/all');
  const result = await response.json();
  return result;
}

export const createIsoMap = (data) => {
  const countries = [...data];
  const isoObj = {};
  countries.map(country => {
    isoObj[country.alpha3Code] = country.name;
  });
  return isoObj;
}

export const filterCountry = (data, query, filterBy) => {
  return data.filter(el => el[filterBy] === query)
};

export const match = (data, query) => {
  const countries = [...data];
  const q = query;
  const arr = countries.filter(country => {
    const name = country.name;
    if (name.startsWith(q)) {
      return country;
    }
  })
  return arr;
};

export const chunk = (arr, size, out) => {
  out = out || [];
  if (!arr.length) return out;
  out.push(arr.slice(0, size));
  return chunk(arr.slice(size), size, out);
}

export const paginationClickHandler = (e, arr) => {
  const pageBtns = document.querySelectorAll('.page-btn');
  const pageBtnsArray = [...pageBtns];
  pageBtnsArray.filter(el => {
    if (el.classList.contains('current_page'))
      el.classList.remove('current_page');
  })
  const current = e.target;
  let currentPage = 0;
  const button = current.matches('button, button *');
  if (button) {
    current.classList.add("current_page");
    currentPage = parseInt(current.dataset.index);
    clearResults();
    arr[currentPage].forEach(country => renderResults(country));
  }
}
