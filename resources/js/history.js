const apiUrl = 'https://matb-app.herokuapp.com/api'

var carttList;

const tbodyHistory = document.getElementById('tbody-history');

document.addEventListener("DOMContentLoaded", async () => {
    fetchCustomerHistory()
});

const fetchCustomerHistory = () => {
    axios({
      method: 'get',
       url: apiUrl + '/cart/customer/'+localStorage.getItem("username")
    })
      .then(function (response) {
        carttList = response.data
        showHistory(carttList);
      });
};

const showHistory = (data) => {
    var requestListInnerHtml = ``

    var i = 0;
    data.forEach((item) => {
      i++;      
      requestListInnerHtml += `<tr>
      <th scope="row">${i}</th>
      <td>${item.createAt.replace(' ', '<br>')}</td>
      <td>${
        (item.state == 'DONE'? 'Hoàn thành':'Đang chờ')}</td>
      <td class="overflow-hidden">toi-tao-ra-com-ngon</td>
    </tr>`;
        requestListInnerHtml += `
            <tr>
            <td></td>
            <td colspan="3">
                <div>
                  <table class="table table-sm">
                    <colgroup>
                      <col width="40%">
                      <col width="25%">
                      <col width="35%">
                    </colgroup>
                    <thead class="thead-light ">
                      <tr>
                        <th scope="col">Món ăn</th>
                        <th scope="col">Số lượng</th>
                        <th scope="col">Giá</th>
                      </tr>               
                    </thead>
                    <tbody>`
        item.cartItem.forEach((cartItem) => {
            requestListInnerHtml += `
            <tr>
                <td>${cartItem.food.name}</td>
                <td>${cartItem.quantity}</td>
                <td>${cartItem.food.price} VNĐ</td>
            </tr>`

        });
        requestListInnerHtml += `
                    <tr>
                    <td colspan="1"></td>
                    <td>Tổng</td>
                    <td>${item.total} VNĐ</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </td>
        </tr>`

    });
    tbodyHistory.innerHTML += requestListInnerHtml;

}

