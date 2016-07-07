var sale = [];
var promo = [];
var recommended = [];
var title = [
    "Распродажа",
    "Промо-акция",
    "Рекомендуемые товары"
];

$.fancybox.showLoading();
$.getJSON( 'products.json' )
.done(function( data ){
    $.each( data, function( key, val ){
        if ( val.type === 'sale' ) {
            sale.push(this);
        }
        if ( val.type === 'promo' ) {
            promo.push(this);
        }
        if ( val.type === 'recommended' ) {
            recommended.push(this);
        }
    });

    var tmpl = _.template(document.getElementById( 'items' ).innerHTML)( sale );
    $( '#products' ).append( tmpl );
})
.fail(function() {
    alert( 'Произошла ошибка' );
})
.always(function(){
    $.fancybox.hideLoading();
});