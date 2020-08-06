vendorCount = 0
foodCount = 0
function createFoodinCourt(wrapper, item, state) {
    foodCount++
    var cardContent = `
    <div class="card">
        <div class="img-dir">
            <img class="card-img-top" src="./resources/image/${vendorCount}_${foodCount}.jpg">
        </div>
        <div class="card-body">
            <h5 class="card-title">${item.name}</h5>
            <p class="desc-info">Mã hàng: <span class="food-id desc-info">${item.id}</span></p>
            <p class="card-price">${formatNumber(item.price)}đ</p>`;
            
    var avail = `
            <a class="btn btn-primary modify-btn">Thêm vào giỏ</a>
        </div>
    </div>`;

    var unavail = `
            <span class="unavailable">Tạm hết hàng</span>
        </div>
    </div>`;
    
    if (state != "AVAILABLE") { 
        cardContent += unavail;
    } else {
        cardContent += avail;
    }
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
        vendorCount++
        const courtFoodList = document.createElement('div');
        courtFoodList.classList.add('food-list');
        
        courtFoodList.innerHTML += `<h3 class="vendor-name">${data.name}</h3>`;

        foodCount = 0
        data.foodList.forEach(foodList => {
            createFoodinCourt(courtFoodList, foodList, foodList.state);
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