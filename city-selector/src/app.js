import CitySelector from './CitySelector';
const $ = require('jquery');

new CitySelector({
    elementId: 'citySelector',
    regionsUrl: 'http://localhost:3000/regions',
    localitiesUrl: 'http://localhost:3000/localities',
    saveUrl: 'http://localhost:3000/selectedRegions'
});

$('.js-destroy-component').on('click', () => {
    CitySelector.destroy();
});


