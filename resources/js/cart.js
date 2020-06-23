var navHeight = document.getElementById('nav-bar').clientHeight;

$(document).ready(function() {
    $('.purchase-btn').each(function(){ 
        $(this).css({
            'margin-bottom' : navHeight + 'px' 
        });
    });
});

const cart = document.getElementById('cart-container');

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }
}