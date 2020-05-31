const NUM_OF_ITEMS = 4;

const items = [
    'Home',
    'Cart',
    'History',
    'Login'
];

const navbar = document.getElementById('nav-bar');
const itemsContainer = document.createElement('ul');
itemsContainer.classList.add('nav', 'justify-content-center');
navbar.appendChild(itemsContainer);

for (let i = 0; i < NUM_OF_ITEMS; i++) {
    const item = document.createElement('li');
    item.classList.add('nav-item', 'modify-item');
    itemsContainer.appendChild(item);
    const redirect = document.createElement('a');
    redirect.classList.add('nav-link');
    redirect.setAttribute('href', '#');
    redirect.appendChild(document.createTextNode(items[i]));
    item.appendChild(redirect);
}