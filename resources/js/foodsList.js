const NUM_OF_FOODS = 4;

const foodInfo = {
    foodName: 'Cơm canh rồng biển vượt đại dương',
    foodDesc: 'Cá trứng muối tiêu',
    price: '20,000 VND',
    image: 'resources/image/2.jpg'
};

const container = document.getElementById('foods-container');

for (let i = 0; i < NUM_OF_FOODS; i++) {
    const card = document.createElement('div');
    card.classList.add('card');
    const imgContainer = document.createElement('div');
    imgContainer.classList.add('img-dir');
    const img = document.createElement('img');
    img.classList.add('card-img-top');
    img.setAttribute('src', foodInfo.image);
    imgContainer.appendChild(img);
    card.appendChild(imgContainer);
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    const foodName = document.createElement('h5');
    foodName.classList.add('card-title');
    foodName.appendChild(document.createTextNode(foodInfo.foodName));
    const foodDesc = document.createElement('p');
    foodDesc.classList.add('card-text');
    foodDesc.appendChild(document.createTextNode(foodInfo.foodDesc));
    const price = document.createElement('a');
    price.classList.add('btn', 'btn-primary');
    price.appendChild(document.createTextNode(foodInfo.price));
    cardBody.appendChild(foodName);
    cardBody.appendChild(foodDesc);
    cardBody.appendChild(price);
    card.appendChild(cardBody);
    container.appendChild(card);
}