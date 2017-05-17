const $ = require('jquery');

class CitySelector {
    constructor(options){
        this.el = $('#' + options.el);
        this.regionsUrl      = options.regionsUrl;
        this.localitiesUrl   = options.localitiesUrl;
        this.saveUrl         = options.saveUrl;
        this.loadRegion      = $('.js-load-region')
        this.region          = $('#region');
        this._regionTemplate = $('#region-select').html();

        this.initCitySelector();
    }

    initCitySelector() {
        this.loadRegion.removeClass('hidden');
        this._loadRegion();
    }

    _loadRegion() {
        this.el.on('click', (event) => {
            let $elem = $(event.target);

            if($elem.hasClass('js-load-region')) {
                $.ajax({
                    url: this.regionsUrl
                }).done((res) => {;
                    var regionsTmpl = _.template(this._regionTemplate);

                    this.region.html(regionsTmpl({regions: res}));
                    this._selectRegion();
                });
            }
        });
    }

    _selectRegion(){
        this.el.on('click', (event) => {
            let $elem       = $(event.target);
            let $city       = $('#city');
            let $citySelect = $('#city-select');

            if($elem.hasClass('js-region-select-item')) {
                $.ajax({
                    url: this.localitiesUrl
                }).done((res) => {
                    let regionsTmpl = _.template($citySelect.html());
                    let sortedCity = $.grep(res, function(item) {
                        return item.id === String($elem.data('region-id'));
                    });

                    $city.html(regionsTmpl({city: sortedCity[0].list}));
                });
            }
        });
    }

    _selectCity(){
        this.el.on('click', function(){

        })
    }

    _sendForm(){
        this.el.on('click', function(){

        })
    }
};
module.exports = CitySelector;

