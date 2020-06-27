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