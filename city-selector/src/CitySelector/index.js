const $ = require('jquery');

class CitySelector {
    constructor(options){
        this.el = $(`#${options.el}`);
        this.regionsUrl      = options.regionsUrl;
        this.localitiesUrl   = options.localitiesUrl;
        this.saveUrl         = options.saveUrl;
        this.btnSave         = $('.js-btn-save');
        this.btnLoad         = $('.js-btn-load');
        this.region          = $('#region');
        this.city            = $('#city');
        this._regionTemplate = $('#region-select').html();
        this._cityTemplate   = $('#city-select').html();
        this.resultId        = null;
        this.resultRegion    = null;
        this.resultCity      = null;

        this._loadRegion();
    }

    _loadRegion() {
        this.el.on('click', (event) => {
            let $elem = $(event.target);

            if($elem.hasClass('js-btn-load')) {
                $.ajax({
                    url: this.regionsUrl
                }).done((res) => {
                    var regionsTmpl = _.template(this._regionTemplate);

                    this.region.html(regionsTmpl({regions: res}));
                    this._selectRegion();
                });

                $elem.addClass('_hidden');
            }
        });
    }

    _selectRegion(){
        this.el.on('click', (event) => {
            let $elem    = $(event.target);
            let regionId = $elem.data('region-id');

            if($elem.hasClass('js-region-select')) {
                $('.js-region-select').removeClass('_selected');

                $.ajax({
                    url: this.localitiesUrl
                }).done((res) => {
                    let regionsTmpl = _.template(this._cityTemplate);
                    let sortedCity = $.grep(res, function(item) {
                        return item.id == regionId;
                    });

                    this.city.html(regionsTmpl({city: sortedCity[0].list}));
                    this._selectCity();
                    this.resultRegion = $(event.target).html();
                    this.resultCity = null;
                    this.resultId = regionId;
                    $elem.addClass('_selected');
                    this.btnSave.addClass('_hidden');
                });
            }
        });
    }

    _selectCity(){
        this.el.on('click', (event) => {
            let $elem = $(event.target);

            if($elem.hasClass('js-city-select')) {
                this.resultCity = $(event.target).html();

                if (this.resultCity !== null) this.btnSave.removeClass('_hidden');
                $elem.addClass('_selected');
                this._sendForm();
            }
        });
    }

    _sendForm(){
        this.el.on('click', (event) => {
            let $elem = $(event.target);

        if($elem.hasClass('js-btn-save')) {
            $.ajax({
                url: this.saveUrl,
                type: 'POST',
                data: {
                    region: this.resultRegion,
                    city: this.resultCity,
                    id: this.resultId
                }
            }).done(
                window.location.href = this.saveUrl
            );
            }
        });
    }
};

module.exports = CitySelector;

