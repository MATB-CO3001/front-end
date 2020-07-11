const pendingList = document.getElementById('pending-list');

document.addEventListener("DOMContentLoaded", async() => {
    fetchPendingOrderList();
})

const fetchPendingOrderList = () => {
    const data = '';
    const config = {
        method: 'get',
        url: 'https://matb-app.herokuapp.com/api/chef/toi-tao-ra-com-ngon/pending',
        headers: { },
        data : data
    };

    axios(config)
    .then(function (response) {
        displayPendingOrderList(response.data);
    })
    .catch(function (error) {
        console.log(error);
    });
}

const displayPendingOrderList = (data) => {
    var pendingInnerHtml = "";
    var i = 0;
    data.forEach((order) => {
        pendingInnerHtml += `
            <li class="order">
                <div class="general-info">
                    <div class="order-date">
                        ${order.createAt.split(" ")[0]}
                        <br> 
                        ${order.createAt.split(" ")[1]}
                    </div>
                    <div class="order-info">
                        Mã đơn hàng: <span style="font-weight: 700;">
                        ${order.id}
                        </span>
                        <br>
                        Khách hàng: <span style="font-weight: 700;">
                        ${order.customer}
                        </span>
                    </div>
                    <div class="order-status" align="right">
                        <button type="button" class="btn btn-danger">Đang chờ</button>
                        <button type="button" class="btn btn-light">Chuẩn bị</button>
                    </div>
                </div>
                <div class="list-item">
                <table class="table table-sm">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Món ăn</th>
                            <th scope="col">Số lượng</th>
                        </tr>
                    </thead>
                `
                var k = 1;
                order.cartItem.forEach((item) => {
                    pendingInnerHtml += `
                        <tbody>
                            <tr>
                                <th scope="row">${k}</th>
                                <td>${item.food.name}</td>
                                <td>${item.quantity}</td>
                            </tr>
                        </tbody>
                `
        k++;
        })
        pendingInnerHtml += `
                    </table>
                </div>
            </li>`
        i++;
    })
    pendingList.innerHTML += pendingInnerHtml;
}