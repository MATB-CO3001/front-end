function createFoodinCourt(img, foodName, foodDesc, price) {
    return [
        '<div class="card">',
            '<div class="img-dir">',
                '<img class="card-img-top" src="' + img + '">',
            '</div>',
            '<div class="card-body">',
                '<h5 class="card-title">' + foodName + '</h5>',
                '<p class="card-text">' + foodDesc + '</p>',
                '<a class="btn btn-primary modify-btn">' + price + '</a>',
            '</div>',
        '</div>'
    ].join('\n');
}

const container = document.getElementById('foods-container');

for (let k = 0; k < NUM_OF_COURTS; k++) {
    const courtFoodList = document.createElement('div');
    courtFoodList.setAttribute('class', 'food-list');
    courtFoodList.setAttribute('id', k);
    courtFoodList.innerHTML += 
        '<h3>' + courtInfo.name + '</h3>';
    for (let i = 0; i < NUM_OF_FOODS_EACH_COURT["COURT" + k]; i++) {
        let card = createFoodinCourt(
            foodInfo[k].image, 
            foodInfo[k].foodName, 
            foodInfo[k].foodDesc,
            foodInfo[k].price
        );
        courtFoodList.innerHTML += card;
    }
    container.append(courtFoodList);
}