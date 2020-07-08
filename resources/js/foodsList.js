//const { each } = require("jquery");

function createFoodinCourt(wrapper, item) {
    var cardContent = `
    <div class="card">
        <div class="img-dir">
            <img class="card-img-top" src="${item.image}">
        </div>
        <div class="card-body">
            <h5 class="card-title">${item.name}</h5>
            <p class="card-price">${formatNumber(item.price)} VND</p>
            <a class="btn btn-primary modify-btn">Thêm vào giỏ</a>
        </div>
    </div>`;

    wrapper.innerHTML += cardContent;
}

const container = document.getElementById('foods-container');

// for (let k = 0; k < NUM_OF_COURTS; k++) {
//     const courtFoodList = document.createElement('div');
//     courtFoodList.classList.add('food-list');
//     courtFoodList.setAttribute('id', k);

//     courtFoodList.innerHTML += `<h3>${courtInfo.name}</h3>`;

//     for (let i = 0; i < NUM_OF_FOODS_EACH_COURT["COURT" + k]; i++) {
//         createFoodinCourt(courtFoodList, foodInfo[k]);
//     }
//     container.append(courtFoodList);
// }

axios({
    method: 'GET',
    url: 'https://matb-app.herokuapp.com/api/vendor'
})
    .then((res) => {
        console.log(res.status);
        res.data.forEach(data => {
            console.log(data.name);
            data.foodList.forEach(foodList => {
                createFoodinCourt(container, foodList);
            });
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