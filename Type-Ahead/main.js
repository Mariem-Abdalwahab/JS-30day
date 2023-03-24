const input = document.querySelector('input');
const li = document.querySelector('li');
const url = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const cities = [];

fetch(url)
    .then(response => {
        return response.json();
    })
    .then(data => {
        cities.push(...data);
    });

// search if the city or state found or not
function findcity(word, cities) {
    return cities.filter(place => {
        const regex = new RegExp(word, 'gi');
        return place.city.match(regex) || place.state.match(regex);
        // return place.city.match(word) || place.state.match(word);
    });
};

function display() {
    const arr = findcity(this.value, cities); //find for each character cause of 'keyup' 
    const html = arr.map(place => {
        const regex = new RegExp(this.value, 'gi');
        const cityn = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
        const staten = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
        return `
                <li>
                    <span class="name">${place.city} ,${place.state}</span>
                    <span class="population">${place.population}</span>
                </li>`;
    }).join('');
    li.innerHTML = html;
};

input.addEventListener('change', display);
input.addEventListener('keyup', display);