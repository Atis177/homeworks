const $ = require('jquery');

class CitySelector {
    constructor(options){
        this.el = options.el;
        this.regionsUrl = options.regionsUrl;
        this.localitiesUrl = options.localitiesUrl;
        this.saveUrl = options.saveUrl;
        this.selectRegion = $('.js-select-region');
        this._regionTemplate = $('#region-select').html();

        this.initCitySelector();
    }

    initCitySelector(){
        this.selectRegion.removeClass('hidden');
        this._selectRegion();
    }

    _selectRegion() {
        this.selectRegion.on('click', () => {
            $.ajax({
            url: this.regionsUrl
        }).done((res) => {;
        var regionsTmpl = _.template(this._regionTemplate);

        $('#region').html(regionsTmpl({regions: res}));
    });
    });
    }
};
module.exports = CitySelector;

