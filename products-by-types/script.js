$.ajax({
    dataType: 'json',
    url: 'products.json',
    beforeSend: function () {
        $.fancybox.showLoading();
    }
})
.done(function( data ){
    var sale = [];
    var promo = [];
    var recommended = [];

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

    var tmpl = _.template(document.getElementById( 'items' ).innerHTML);

    $( '#sale' ).append( tmpl({ title: "Распродажа", products: sale }) );
    $( '#promo' ).append( tmpl({ title: "Промо-акция", products: promo }) );
    $( '#recommended' ).append( tmpl({ title: "Рекомендованные товары", products: recommended }) );
})
.fail(function() {
    alert( 'Произошла ошибка' );
})
.always(function(){
    $.fancybox.hideLoading();
});
