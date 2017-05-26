import './style.less';
import template from './template.hbs'
import regionTmpl from './region.hbs'
import cityTmpl from './city.hbs'
import formTmpl from './form.hbs'

const $ = require('jquery');
const $body = $('body');

class CitySelector {
    constructor(options){
        const {elementId, regionsUrl, localitiesUrl, saveUrl}  = options;
        const $container = $(`#${elementId}`);
        $container.addClass('city-selector');
        this.region;
        this.city;

        this._renderRegion(regionsUrl, $container);
        this._renderCity(localitiesUrl, $container);
        this._renderTemplate(elementId, $container);
        this._selectCity($container, saveUrl);
    }

    _renderTemplate(elementId){
        $(template({})).appendTo(`#${elementId}`);
    }

    _renderRegion(regionsUrl, $container){
        $container.on('click', '.js-btn-load', () => {
            this._sendRequest(regionsUrl, (regions) => {
                let $regionWr = $('#region');

                $regionWr.html(regionTmpl({regions}))
            });
        });
    }

    _renderCity(localitiesUrl, $container){
        $container.on('click', '.js-region-select', (ev) => {
            let $regionId = $(ev.target).data('region-id');
            this.region = $(ev.target).text();

            $('.js-region-select').removeClass('_selected');
            $(ev.target).addClass('_selected');

            this._sendRequest(`${localitiesUrl}/${$regionId}`, (cities) => {
                let $cityWr = $('#city');

                $cityWr.html(cityTmpl({cities}));
            });
        });
    }

    _selectCity($container, saveUrl){
        $container.on('click', '.js-city-select', (ev) => {
            this.city = $(ev.target).text();

            $('.js-city-select').removeClass('_selected');
            $(ev.target).addClass('_selected');

            this._formSubmit(saveUrl);
        });
    }

    _formSubmit(saveUrl) {
        let $addressInfo = $('#address-info');

        $addressInfo.html(formTmpl({
            url: saveUrl,
            region: this.region,
            city: this.city
        }));
    }

    _sendRequest(url, onSuccess){
        $.ajax({
            url: url
        }).done(onSuccess)
          .fail(() => {
            console.log('error')
        });
    }
}

module.exports = CitySelector;