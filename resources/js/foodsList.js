rand = function(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
};

const container = document.getElementById('foods-container');

for (let i = 0; i < NUM_OF_FOODS; i++) {
    const card = document.createElement('div');
    card.classList.add('card');
    const imgContainer = document.createElement('div');
    imgContainer.classList.add('img-dir');
    const img = document.createElement('img');
    img.classList.add('card-img-top');
    img.setAttribute('src', foodInfo[1].image);
    imgContainer.appendChild(img);
    card.appendChild(imgContainer);
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    const foodName = document.createElement('h5');
    foodName.classList.add('card-title');
    foodName.appendChild(document.createTextNode(foodInfo[1].foodName));
    const foodDesc = document.createElement('p');
    foodDesc.classList.add('card-text');
    foodDesc.appendChild(document.createTextNode(foodInfo[1].foodDesc));
    const price = document.createElement('a');
    price.classList.add('btn', 'btn-primary', 'modify-btn');
    price.appendChild(document.createTextNode(foodInfo[1].price));
    cardBody.appendChild(foodName);
    cardBody.appendChild(foodDesc);
    cardBody.appendChild(price);
    card.appendChild(cardBody);
    container.appendChild(card);
}

console.log('OK');