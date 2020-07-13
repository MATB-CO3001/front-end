const server = 'https://matb-app.herokuapp.com/api'

const pendingList = document.getElementById('pending-list');
const inprogressList = document.getElementById('inprogress-list');

document.addEventListener("DOMContentLoaded", async() => {
    checkEmailInLocalStorage();
});

const fetchPendingOrderList = () => {
    const data = '';
    const config = {
        method: 'get',
        url: server + '/chef/' + localStorage.getItem("current-username") + '/pending',
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
};

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
};

const fetchInprogressOrderList = () => {
    const data = '';
    const config = {
        method: 'get',
        url: server + '/chef/' + localStorage.getItem("current-username") + '/inprogress',
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
};

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
                        <button type="button" class="btn btn-outline-danger" data-toggle="modal" data-target="#deliverOrderPopup" onclick="getCartId()">Giao đơn</button>
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
};

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
        url: server + '/chef/',
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
};

let tmpCartId;
const getCartId = (e) => {
    const target = getEventTarget(e);
    tmpCartId = target.parentElement.parentElement.childNodes[3].childNodes[1].innerText;
};

const changeStateToReady = () => {
    var data = JSON.stringify({"cartId": tmpCartId, "newState": 2});
    var config = {
        method: 'post',
        url: server + '/chef/',
        headers: { 
            'Content-Type': 'application/json'
        },
        data : data
    };

    axios(config)
    .then(function (response) {
        console.log("READY");
    })
    .catch(function (error) {
        console.log(error);
    });
};

const changeStateToDone = (e) => {
    var data = JSON.stringify({"cartId": tmpCartId, "newState": 3});
    var config = {
        method: 'post',
        url: server + '/chef/',
        headers: { 
            'Content-Type': 'application/json'
        },
        data : data
    };

    axios(config)
    .then(function (response) {
        fetchInprogressOrderList();
    })
    .catch(function (error) {
        console.log(error);
    });
};

const usernameSaveContainer = document.getElementById("username-container");
const contentContainer = document.getElementById("content-container");
const usernameInput = document.getElementById("username-input");

const checkEmailInLocalStorage = () => {
    const username = localStorage.getItem("current-username");
    if (!username) {
      usernameSaveContainer.classList.remove("hide-container");
      contentContainer.classList.add("hide-container");
      return false;
    } else {
      usernameSaveContainer.classList.add("hide-container");
      contentContainer.classList.remove("hide-container");
      document.getElementById("vendor-name").innerText = "Xin chào, " + username;
      fetchPendingOrderList();
      fetchInprogressOrderList();
      return true;
    }
};

const saveEmailToLocalStorage = async () => {
    const username = usernameInput.value;
    localStorage.setItem("current-username", username);
    checkEmailInLocalStorage();
};

const logout = () => {
    localStorage.removeItem("current-username");
    location.reload();
}