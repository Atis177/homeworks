import './style.less';
import template from './templates/mainTemplate.hbs'
import regionTmpl from './templates/region.hbs'
import cityTmpl from './templates/city.hbs'
import formTmpl from './templates/form.hbs'

const $ = require('jquery');
const $body = $('body');

class CitySelector {
    constructor(options) {
        const {elementId, regionsUrl, localitiesUrl, saveUrl}  = options;
        this.$container = $(`#${elementId}`);

        $(template({})).appendTo(`#${elementId}`);
        this.$container.addClass('city-selector');

        this.$container
            .on('click', '.js-btn-load', {regionsUrl: regionsUrl}, this._renderRegion.bind(this))
            .on('click', '.js-region-select', {localitiesUrl: localitiesUrl}, this._renderCity.bind(this))
            .on('click', '.js-city-select', this._selectCity.bind(this));

        $body.on('citySelector:change', () => {
            this._formRender(saveUrl);
        });
    }

    _renderRegion(event) {
        this._sendRequest(event.data.regionsUrl).then((regions) => {
            let $regionWr = $('#region');

            $regionWr.html(regionTmpl({regions}))
        });
    }

    _renderCity(event) {
        let $regionId = $(event.target).data('region-id');
        this.region = $(event.target).text();
        this.city   = '';

        $('.js-region-select').removeClass('_selected');
        $(event.target).addClass('_selected');

        this._sendRequest(`${event.data.localitiesUrl}/${$regionId}`).then((cities) => {
            let $cityWr = $('#city');

            $cityWr.html(cityTmpl({cities}));
        });

        $('.js-btn-submit').prop('disabled', this.city === '');

        this.$container.triggerHandler('citySelector:change', {
            region: this.region,
            localityName: this.city
        });
    }

    _selectCity(event) {
        this.city = $(event.target).text();

        $('.js-city-select').removeClass('_selected');
        $(event.target).addClass('_selected');

        //triggerHandler не сработал почему-то
        this.$container.trigger('citySelector:change', {
            localityName: this.city
        });

        $('.js-btn-submit').prop('disabled', this.city === '');
    }

    _formRender(saveUrl) {
        let $addressInfo = $('#address-info');

        $addressInfo.html(formTmpl({
            url: saveUrl,
            region: this.region,
            city: this.localityName
        }));
    }

    _sendRequest(url) {
        return $.ajax({
            url: url
        }).fail(() => {
            console.log('error')
        });
    }
}

module.exports = CitySelector;