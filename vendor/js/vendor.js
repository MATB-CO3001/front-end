var dummyData1 = [
  {
    "date": "05/05/2020",
    "total": "4000000",
  },
  {
    "date": "06/05/2020",
    "total": "4000000",
  },
  {
    "date": "06/05/2020",
    "total": "4000000",
  },
];

const usernameSaveContainer = document.getElementById("username-save-container");
const contentContainer = document.getElementById("content-container");
const usernameInput = document.getElementById("username-input");
var foodList;
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const main = document.getElementById('main');


document.addEventListener("DOMContentLoaded", async () => {
  if (!checkUsernameInLocalStorage()) {
    return;
  } else {
    var type = urlParams.get('type');
    if (type == 'food') {
      fetchVendorData();
    } else 
      if (type == "report") {
        fetchReport();
      }
  }
});


const fetchVendorData = () => {
  axios({
    method: 'get',
    url: 'https://matb-app.herokuapp.com/api/vendor/'+localStorage.getItem("username")
  })
    .then(function (response) {
      foodList = response.data.foodList.sort(dynamicSort("name"))
      showVendor(foodList);
    });
};

const showVendor = (data) => {
  var requestListInnerHtml = `
  <thead>
    <tr>
      <th scope="col">STT</th>
      <th scope="col">Tên món ăn</th>
      <th scope="col">Giá</th>
      <th scope="col">Hình ảnh</th>
      <th scope="col">Trạng thái</th>
      <td><button class="btn-right" onclick="popupCreateFood()">Tạo món ăn</button></td>
    </tr>
  </thead>`;
  requestListInnerHtml += `
  <tbody>` 
  var i = 0;
  data.forEach((item) => {
    i++;
    requestListInnerHtml += `
        <th scope="row">${i}</th>
        <td>${item.name}</td>
        <td>${item.price} VNĐ</td>
        <td>${item.image}</td>
        <td>${(item.state == "AVAILABLE"? "Còn hàng":"Hết hàng")}</td>
        <td>
          <button class="btn-right" onclick="popupFoodEdit()">Chỉnh sửa</button>   
          <button class="btn-right" onclick="deleteFood()">Xóa</button>                         
        </td>
      </tr>`;
  });
  requestListInnerHtml += `
  </tbody>`
  main.childNodes[1].innerHTML = requestListInnerHtml;
}

const fetchReport = () => {
  axios({
    method: 'get',
    url: 'https://matb-app.herokuapp.com/api/vendor/'+localStorage.getItem("username")
  })
    .then(function (response) {
      foodList = response.data.foodList.sort(dynamicSort("name"))
      showReport(dummyData1);
    });
};

const showReport = (data) => {
  var requestListInnerHtml = `
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Ngày</th>
      <th scope="col">Tổng</th>
      <th scope="col"></th>
    </tr>
  </thead>`;
  requestListInnerHtml += `
  <tbody>`
  var i = 0;
  data.forEach((item) => {
    i++;
    requestListInnerHtml += `
    <th scope="row">${i}</th>
      <td>${item.date}</td>
      <td>${item.total} VNĐ</td>
      <td><button class="btn-right" onclick="popupViewDetail()">Chi tiết</button></td>
    </tr>`;
  });
  requestListInnerHtml += `
  </tbody>`
  main.childNodes[1].innerHTML = requestListInnerHtml;
}

function createFood(e) {
  let target = getEventTarget(e);
  target.setAttribute("disabled", false);
  var data = JSON.stringify({
    "name": document.getElementById('name').value,
    "price": parseInt(document.getElementById('price').value),
    "image": "image.jpg"
  });

  axios({
    method: 'post',
    url: 'https://matb-app.herokuapp.com/api/vendor/'+localStorage.getItem("username"),
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  })
    .then(function (response) {
      fetchVendorData();
      deletePopupFoodEdit();
    })
    .catch(function (error) {
      console.log(error);
    });
}

function updateFood() {
  var data = JSON.stringify({
    "name": document.getElementById('name').value,
    "price": parseInt(document.getElementById('price').value),
    "image": "image.jpg",
    "state": document.getElementById('state').selectedIndex
  });
  axios({
    method: 'put',
    url: 'https://matb-app.herokuapp.com/api/vendor/food/' + document.getElementById('foodid').value,
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  })
    .then(function (response) {
      fetchVendorData();
      deletePopupFoodEdit();
    })
    .catch(function (error) {
      console.log(error);
    });
}

function deleteFood(e) {
  var target = foodList[parseInt(getEventTarget(e).parentElement.parentElement.childNodes[0].innerHTML-1)].id
  axios({
    method: 'delete',
    url: 'https://matb-app.herokuapp.com/api/vendor/food/'+target,
  })
  .then(function (response) {
    fetchVendorData();
  })
  .catch(function (error) {
    console.log(error);
  });
  
}



const getEventTarget = (e) => {
  e = e || window.event;
  return e.target || e.srcElement;
};

const popupFoodEdit = (e) => {
  let target = getEventTarget(e);
  let foodRow = target.parentElement.parentElement;
  var popupContainer = document.createElement("div");
  popupContainer.classList.add('popup-container');

  var closePopup = document.createElement("div");
  closePopup.id = "area-close-popup";
  closePopup.setAttribute("onclick", "deletePopupFoodEdit()");
  popupContainer.appendChild(closePopup);
  var index = parseInt(foodRow.childNodes[0].innerHTML)-1;
  var popup = document.createElement("div");
  popup.id = 'food-edit-popup'
  popup.innerHTML = `
  <h2>Chỉnh sửa món ăn</h2>
        <hr>
        <form class="form-horizontal" role="form">
          <div style="visibility: hidden; position: absolute" class="form-group">
            <label class="col-lg-3 control-label">ID</label>
            <div class="col-lg-8">
              <input class="form-control" id="foodid" type="text" value="${foodList[index].id}">
            </div>
          </div>
          <div class="form-group">
            <label class="col-lg-3 control-label">Tên món ăn</label>
            <div class="col-lg-8">
              <input class="form-control" id="name" type="text" value="${foodList[index].name}">
            </div>
          </div>
          <div class="form-group">
            <label class="col-lg-3 control-label">Giá tiền</label>
            <div class="col-lg-8">
              <input class="form-control" id="price" type="text" value="${foodList[index].price}">
            </div>
          </div>
          <div class="form-group">
            <label class="col-lg-3 control-label">Trạng thái</label>
            <div class="col-lg-8">
              <select id="state" class="form-control" >
                <option>Còn hàng</option>
                <option>Hết hàng</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <div class="text-center">
              <h6>Chọn hình ảnh mới...</h6>
              <input type="file" class="col-lg-8">
            </div>
          </div>
          <div class="form-group">
            <div class="d-flex justify-content-center">
              <input type="button" onclick="updateFood()" class="btn btn-primary" value="Lưu lại">
            </div>
          </div>
        </form>
  `
  popupContainer.appendChild(popup);
  var ss = document.getElementsByClassName("popup-container")[0]
  if (ss)
    ss.remove();
  document.getElementsByTagName('BODY')[0].appendChild(popupContainer);
  document.getElementById("state").selectedIndex = foodList[index].state == "AVAILABLE"? 0:1
}


const popupCreateFood = (e) => {
  let target = getEventTarget(e);
  let foodRow = target.parentElement.parentElement;
  var popupContainer = document.createElement("div");
  popupContainer.classList.add('popup-container');

  var closePopup = document.createElement("div");
  closePopup.id = "area-close-popup";
  closePopup.setAttribute("onclick", "deletePopupFoodEdit()");
  popupContainer.appendChild(closePopup);

  var popup = document.createElement("div");
  popup.id = 'food-edit-popup'
  popup.innerHTML = `
  <h2>Tạo món ăn</h2>
        <hr>
        <form class="form-horizontal" role="form">
          <div class="form-group">
            <label class="col-lg-3 control-label">Tên món ăn</label>
            <div class="col-lg-8">
              <input class="form-control" id="name" type="text" value="">
            </div>
          </div>
          <div class="form-group">
            <label class="col-lg-3 control-label">Giá tiền</label>
            <div class="col-lg-8">
              <input class="form-control" id="price" type="text" value="">
            </div>
          </div>
          <div class="form-group">
          <div class="text-center">
            <h6>Chọn hình ảnh mới...</h6>
            <input type="file" class="col-lg-8">
          </div>
        </div>
          <div class="form-group">
            <div class="d-flex justify-content-center">
              <input type="button" onclick="createFood()" class="btn btn-primary" value="Lưu lại">
            </div>
          </div>
        </form>
  `
  popupContainer.appendChild(popup);
  var ss = document.getElementsByClassName("popup-container")[0]
  if (ss)
    ss.remove();
  document.getElementsByTagName('BODY')[0].appendChild(popupContainer);
}

const popupViewDetail = (e) => {
  let target = getEventTarget(e);
  let foodRow = target.parentElement.parentElement;
  var popupContainer = document.createElement("div");
  popupContainer.classList.add('popup-container');

  var closePopup = document.createElement("div");
  closePopup.id = "area-close-popup";
  closePopup.setAttribute("onclick", "deletePopupFoodEdit()");
  popupContainer.appendChild(closePopup);

  var popup = document.createElement("table");
  popup.id = 'food-edit-popup'
  popup.classList.add("table");
  popup.classList.add("table-striped");
  popup.innerHTML = `<thead>
  <tr>
    <th scope="col">ID</th>
    <th scope="col">Tên</th>
    <th scope="col">Số lượng</th>
  </tr>
</thead>
<tbody>
  <tr>
    <th scope="row">1</th>
    <td>Cơm củ thịt</td>
    <td>100</td>
  </tr>
  <tr>
    <th scope="row">2</th>
    <td>Cơm cục gà</td>
    <td>100</td>
  </tr>
  <tr>
    <th scope="row">3</th>
    <td>Cơm trứng khủng long</td>
    <td>100</td>
  </tr>
</tbody>
  `
  popupContainer.appendChild(popup);
  var ss = document.getElementsByClassName("popup-container")[0]
  if (ss)
    ss.remove();
  document.getElementsByTagName('BODY')[0].appendChild(popupContainer);
}

const deletePopupFoodEdit = (e) => {
  let target = getEventTarget(e);
  document.getElementsByClassName("popup-container")[0].remove();
}

const deletePopupAfterSave = (e) => {
  let target = getEventTarget(e);
  document.getElementsByClassName("popup-container")[0].remove();

}

function dynamicSort(property) {
  var sortOrder = 1;
  if(property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
  }
  return function (a,b) {
      /* next line works with strings and numbers, 
       * and you may want to customize it to your needs
       */
      var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortOrder;
  }
}

const checkUsernameInLocalStorage = () => {
  const username = localStorage.getItem("username");
  if (!username) {
    usernameSaveContainer.classList.remove("hide-container");
    contentContainer.classList.add("hide-container");
    return false;
  } else {
    usernameSaveContainer.classList.add("hide-container");
    contentContainer.classList.remove("hide-container");
    document.getElementById("welcome").innerHTML = "Xin chào, " + username;
    return true;
  }
};

const saveUsernameToLocalStorage = async () => {
  const username = usernameInput.value;
  localStorage.setItem("username", username);
  checkUsernameInLocalStorage();
};

const logout = () => {
  localStorage.setItem("username", "");
}