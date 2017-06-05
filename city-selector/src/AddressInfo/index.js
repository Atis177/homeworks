import './style.less';
import addressInfoTemplate from './templates/addressInfoTemplate.hbs'

const $ = require('jquery');
const $body = $('body');

class AddressInfo {
    constructor(options) {
        const {elementId}  = options;
        this.$container = $(`#${elementId}`);

        this.$container.addClass('address-info').html(addressInfoTemplate({}));

        $body.on('citySelector:change', (event, address) => {
            this.$container.html(addressInfoTemplate({city: address.city, region: address.region}));
        });
    }
}

module.exports = AddressInfo;