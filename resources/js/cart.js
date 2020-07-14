var navHeight = document.getElementById('nav-bar').clientHeight;

$(document).ready(function() {
    $('.purchase-btn').each(function(){ 
        $(this).css({
            'margin-bottom' : navHeight + 'px' 
        });
    });
});

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger');
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i];
        button.addEventListener('click', removeCartItem);
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input');
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged);
    }

    document.getElementsByClassName('purchase-btn')[0].addEventListener('click', purchaseClicked);
}

function purchaseClicked() {
    var ret= {
        "customer": "urmom",
        "orderedFood":[]
    };
    var list = document.getElementsByClassName("cart-row");
    for (let i = 0; i < list.length; i++) {
        var foodId = list[i].getElementsByClassName("food-id")[0];
        var qnty = list[i].getElementsByClassName('cart-quantity-input')[0];
        var Item = {
            "foodId": foodId.innerText,
            "quantity": qnty.value
        };
        ret.orderedFood[i] = Item;
        //console.log(cc);
    }
    axios({
        method: 'POST',
        url: 'https://matb-app.herokuapp.com/api/cart',
        data: ret
    })
    .then((res) => {
        console.log(res.status);
    })
    .catch(err => console.error(err));
    console.log(ret);
    alert('Thanh toán thành công, cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.');
    var cartItems = document.getElementById('cart-items');
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild);
    }
    updateCartTotal();
}

function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
}

function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateCartTotal();
}

function addToCartClicked(event) {
    var button = event.target;
    var shopItem = button.parentElement.parentElement;
    var vendor = shopItem.parentElement;
    var vendorName = vendor.getElementsByClassName("vendor-name")[0];
    var title = shopItem.getElementsByClassName('card-title')[0].innerText;
    var foodId = shopItem.getElementsByClassName("food-id")[0].innerText;
    var price = shopItem.getElementsByClassName('card-price')[0].innerText;
    var imageSrc = shopItem.getElementsByClassName('card-img-top')[0].src;
    addItemToCart(vendorName.innerText, title, foodId, price, imageSrc);
    updateCartTotal();
}

function addItemToCart(vendorName, title, foodId,price, imageSrc) {
    var cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');
    var cartItems = document.getElementById('cart-items');
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title');
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('Bạn đã thêm món này vào giỏ');
            return;
        }
    }
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
        </div>
        <div class="cart-column">
            <span class="cart-item-title">${title}</span>
            <span class="desc-info">${vendorName}</span>
            <p class="desc-info">Mã hàng: <span class="food-id desc-info">${foodId}</span></p>
            <div class="cart-quantity">
                <div class="qnty-btn decrease-btn">-</div>
                <input class="cart-quantity-input" type="number" value="1">
                <div class="qnty-btn increase-btn">+</div>
            </div>
        </div>
        <div class="cart-column">
            <span class="cart-price">${price}</span>
            <button class="btn-danger" type="button">Xoá</button>
        </div>`;
    cartRow.innerHTML = cartRowContents;
    cartItems.append(cartRow);
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem);
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged);
}

function updateCartTotal() {
    var cartItemContainer = document.getElementById('cart-items');
    var cartRows = cartItemContainer.getElementsByClassName('cart-row');
    var total = 0;
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i];
        var priceElement = cartRow.getElementsByClassName('cart-price')[0];
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];

        var price = priceElement.innerText;
        var price = parseFloat(priceElement.innerText.replace('đ', ''));
        price = parseFloat(priceElement.innerText.replace(',', ''));

        var quantity = quantityElement.value
        total = total + (price * quantity);
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = formatNumber(total) + 'đ';
}