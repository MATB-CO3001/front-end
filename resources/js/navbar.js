// const NUM_OF_ITEMS = 4;

// const items = [
//     {
//         item: 'Home',
//     },
//     'Home',
//     'Cart',
//     'History',
//     'Login'
// ];

// const navbar = document.getElementById('nav-bar');
// const itemsContainer = document.createElement('ul');
// itemsContainer.classList.add('nav', 'justify-content-center');
// navbar.appendChild(itemsContainer);

// for (let i = 0; i < NUM_OF_ITEMS; i++) {
//     const item = document.createElement('li');
//     item.classList.add('nav-item', 'modify-item');
//     itemsContainer.appendChild(item);
//     const redirect = document.createElement('a');
//     redirect.classList.add('nav-link');
//     redirect.setAttribute('href', '#');
//     redirect.appendChild(document.createTextNode(items[i]));
//     item.appendChild(redirect);
// }

/*----------------Scroll Cart------------------*/
function smoothScroll(target, duration) {
    var target = document.querySelector(target);
    var targetPos = target.getBoundingClientRect().top;
    var startPos = window.pageYOffset;
    var distance = targetPos - startPos;
    var startTime = null;

    function animation(currentTime){
        if(startTime === null) {
            startTime = currentTime;
        }
        var elapsedTime = currentTime - startTime;
        var run = ease (elapsedTime, startPos, distance, duration);
        window.scrollTo(0, run);
        if(elapsedTime < duration) {
            requestAnimationFrame(animation);    
        }
    }

    function ease(t, b, c, d) {
        t /= d/2;
        if (t < 1) return c/2*t*t + b;
        t--;
        return -c/2 * (t*(t-2) - 1) + b;
    }

    requestAnimationFrame(animation);    
}

var scrollBtn = document.getElementsByClassName("cart-btn")[0];
var cart = document.getElementsByClassName("cart")[0];
scrollBtn.addEventListener('click', function(){
    smoothScroll('.cart', 556);
});