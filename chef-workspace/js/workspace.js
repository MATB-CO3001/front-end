const pendingList = document.getElementById('pending-list');
const inprogressList = document.getElementById('inprogress-list');

document.addEventListener("DOMContentLoaded", async() => {
    fetchPendingOrderList();
    fetchInprogressOrderList();
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
                        <button type="button" class="btn btn-secondary">Đang chờ</button>
                        <button type="button" class="btn btn-outline-primary" onclick="changeStateToInprogress()">Chuẩn bị</button>
                    </div>
                </div>
                <div class="list-item">
                <table class="table table-sm">
                    <thead>
                        <tr>
                            <th scope="col" style="width: 10%">#</th>
                            <th scope="col" style="width: 65%">Món ăn</th>
                            <th scope="col" style="width: 25%">Số lượng</th>
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
    pendingList.innerHTML = pendingInnerHtml;
}

const fetchInprogressOrderList = () => {
    const data = '';
    const config = {
        method: 'get',
        url: 'https://matb-app.herokuapp.com/api/chef/toi-tao-ra-com-ngon/inprogress',
        headers: { },
        data : data
    };

    axios(config)
    .then(function (response) {
        displayInprogressOrderList(response.data);
    })
    .catch(function (error) {
        console.log(error);
    });
}

const displayInprogressOrderList = (data) => {
    var inprogressInnerHtml = "";
    var i = 0;
    data.forEach((order) => {
        inprogressInnerHtml += `
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
                        <button type="button" class="btn btn-primary">Chuẩn bị</button>
                        <button type="button" class="btn btn-outline-danger" onclick="deliverOrderModal()">Giao đơn</button>
                    </div>
                </div>
                <div class="list-item">
                <table class="table table-sm">
                    <thead>
                        <tr>
                            <th scope="col" style="width: 10%">#</th>
                            <th scope="col" style="width: 65%">Món ăn</th>
                            <th scope="col" style="width: 25%">Số lượng</th>
                        </tr>
                    </thead>
                `
                var k = 1;
                order.cartItem.forEach((item) => {
                    inprogressInnerHtml += `
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
        inprogressInnerHtml += `
                    </table>
                </div>
            </li>`
        i++;
    })
    inprogressList.innerHTML = inprogressInnerHtml;
}

const getEventTarget = (e) => {
    e = e || window.event;
    return e.target || e.srcElement;
};

const changeStateToInprogress = (e) => {
    const target = getEventTarget(e);
    const cartId = target.parentElement.parentElement.childNodes[3].childNodes[1].innerText;

    var data = JSON.stringify({"cartId": cartId, "newState": 1});
    var config = {
        method: 'post',
        url: 'https://matb-app.herokuapp.com/api/chef',
        headers: { 
            'Content-Type': 'application/json'
        },
        data : data
    };

    axios(config)
    .then(function (response) {
        fetchPendingOrderList();
        fetchInprogressOrderList();
        alert("Món ăn đã chuyển sang trạng thái được chuẩn bị.")
    })
    .catch(function (error) {
        console.log(error);
    });
}

const deliverOrderModal = () => {
    
}