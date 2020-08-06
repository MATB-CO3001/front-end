var navHeight = document.getElementById('nav-bar').clientHeight;

$(document).ready(function() {
    $('.purchase-btn').each(function(){ 
        $(this).css({
            'margin-bottom' : navHeight + 'px' 
        });
    });
});

const CART = {
    KEY: 'matb2020',
    contents: [],

    init (){
        let _contents = localStorage.getItem(CART.KEY);
        if(_contents){
            CART.contents = JSON.parse(_contents);
            for (let i = 0; i < CART.contents.length; i++) {
                let tmp = CART.contents[i];
                addItemToCart(tmp.vendor, tmp.itemTitle, tmp.id, tmp.itemPrice, tmp.image, tmp.itemQty);
                updateCartTotal();
            }
        }
    },
    async sync(){
        let _cart = JSON.stringify(CART.contents);
        await localStorage.setItem(CART.KEY, _cart);
    },
    find(id){
        //find an item in the cart by it's id
        let match = CART.contents.filter(item=>{
            if(item.id == id)
                return true;
        });
        if(match && match[0])
            return match[0];
    },
    add(vendorName, title, foodId, price, imageSrc, qty){
        //add a new item to the cart
        let obj = {
            vendor: vendorName,
            id: foodId,
            itemTitle: title,
            itemPrice: price,
            image: imageSrc,
            itemQty: qty 
        };
        CART.contents.push(obj);
        //update localStorage
        CART.sync();
    },
    increase(id, qty){
        //increase the quantity of an item in the cart
        CART.contents = CART.contents.map(item=>{
            if(item.id === id)
                item.itemQty = item.itemQty + qty;
            return item;
        });
        //update localStorage
        CART.sync()
    },
    reduce(id, qty){
        //reduce the quantity of an item in the cart
        CART.contents = CART.contents.map(item=>{
            if(item.id === id)
                item.itemQty = item.itemQty - qty;
                if (item.itemQty <= 0) {
                    item.itemQty = 1;
                }
            return item;
        });
        CART.sync()
    },
    remove(id){
        //remove an item entirely from CART.contents based on its id
        CART.contents = CART.contents.filter(item=>{
            if(item.id !== id)
                return true;
        });
        //update localStorage
        CART.sync()
    },
    empty(){
        //empty whole cart
        CART.contents = [];
        //update localStorage
        CART.sync()
    }
};

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
    CART.init();
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
    document.getElementsByClassName('close')[0].addEventListener('click', togglePopup);
    document.getElementsByClassName('purchase-btn')[0].addEventListener('click', togglePopup);
    document.getElementsByClassName('pay-btn')[0].addEventListener('click', purchaseClicked);
}

function togglePopup() {
    var popup = document.getElementById('payment-popup');
    popup.classList.toggle('d-none');
}

function purchaseClicked() {
    var ret= {
        "customer": localStorage.getItem("username"),
        "orderedFoodList":[]
    };
    var list = document.getElementsByClassName("cart-row");
    for (let i = 0; i < list.length; i++) {
        var foodId = list[i].getElementsByClassName("food-id")[0];
        var qnty = list[i].getElementsByClassName('cart-quantity-input')[0];
        var item = {
            "foodId": foodId.innerText,
            "quantity": qnty.value
        };
        ret.orderedFoodList[i] = item;
    }
    if (ret.orderedFoodList.length > 0) {
        axios({
            method: 'POST',
            url: 'https://matb-app.herokuapp.com/api/cart',
            data: ret
        })
        .then((res) => {
            console.log(res.status);
            alert('Thanh toán thành công, cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.');
        })
        .catch(err => console.error(err));
    } else {
        alert('Giỏ hàng của bạn đan trống.');
    }
    console.log(ret);
    var cartItems = document.getElementById('cart-items');
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild);
    }
    var popup = document.getElementById('payment-popup');
    popup.classList.toggle('d-none');
    CART.empty();
    updateCartTotal();
}

function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    var id = buttonClicked.parentElement.parentElement.getElementsByClassName('food-id')[0].innerHTML; 
    CART.remove(id);
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
    addItemToCart(vendorName.innerText, title, foodId, price, imageSrc, 1);
    if(!CART.find(foodId)){
        CART.add(vendorName.innerText, title, foodId, price, imageSrc, 1);
    }
    updateCartTotal();
}

function addItemToCart(vendorName, title, foodId,price, imageSrc, qty) {
    var cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');
    var cartItems = document.getElementById('cart-items');
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title');
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('Bạn đã thêm món ăn vào giỏ');
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
                <input class="cart-quantity-input" type="number" value="${qty}">
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
    qntyBtn = cartRow.getElementsByClassName('qnty-btn');
    for (let i = 0; i < qntyBtn.length; i++) {  
        qntyBtn[i].addEventListener('click', modifyQuantity);
    }
}

function modifyQuantity(event) {
    var btn = event.target;
    var qntyBox = btn.parentElement;
    var id = btn.parentElement.parentElement.getElementsByClassName('food-id')[0].innerHTML;
    var input = qntyBox.getElementsByClassName('cart-quantity-input')[0];
    if(btn.innerText == '+') {
        input.value++;
        CART.increase(id, 1);
    } else {
        input.value--;
        CART.reduce(id, 1);
        if (input.value <= 0) {
            input.value = 1;
        }
    }
    updateCartTotal();
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