function createFoodinCourt(wrapper, item) {
    var cardContent = `
    <div class="card">
        <div class="img-dir">
            <img class="card-img-top" src="./resources/image/${item.image}">
        </div>
        <div class="card-body">
            <h5 class="card-title">${item.name}</h5>
            <p class="card-price">${formatNumber(item.price)}đ</p>
            <a class="btn btn-primary modify-btn">Thêm vào giỏ</a>
        </div>
    </div>`;

    wrapper.innerHTML += cardContent;

    var addToCartButtons = wrapper.getElementsByClassName('modify-btn');
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i];
        button.addEventListener('click', addToCartClicked);
    }
}

const container = document.getElementById('foods-container');

axios({
    method: 'GET',
    url: 'https://matb-app.herokuapp.com/api/vendor'
})
.then((res) => {
    console.log(res.status);

    res.data.forEach(data => {
        console.log(data.name);
        const courtFoodList = document.createElement('div');
        courtFoodList.classList.add('food-list');
        
        courtFoodList.innerHTML += `<h3>${data.name}</h3>`;

        data.foodList.forEach(foodList => {
            createFoodinCourt(courtFoodList, foodList);
        });

        container.append(courtFoodList);
    });
})
.catch(err => console.error(err));

function formatNumber(num) {
    if (num == 0) {
        return 0;
    }     
    else {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }
}