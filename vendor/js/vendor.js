const apiUrl = 'https://matb-app.herokuapp.com/api'
// const apiUrl = 'http://localhost:8080/api'

const usernameSaveContainer = document.getElementById("username-container");
const contentContainer = document.getElementById("content-container");
const usernameInput = document.getElementById("username");
var foodList;
var reportList;
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const main = document.getElementById('main');
var date = new Date()
var yearmonth = date.getFullYear() + "-" + ((date.getMonth()<10)?"0":"") + (date.getMonth()+1)

document.addEventListener("DOMContentLoaded", async () => {
  if (!checkUsernameInLocalStorage()) {
    return;
  } else {
    var type = urlParams.get('type');
    if (type == 'food') {
      fetchVendorData();
    } else 
      if (type == "report") {
        var yearmonthVar = urlParams.get('yearmonth')
        if (!yearmonthVar) {
          yearmonthVar = yearmonth
        }
        fetchReport(yearmonthVar);
      }
  }
});

const fetchVendorData = () => {
  axios({
    method: 'get',
    url: apiUrl + '/vendor/'+localStorage.getItem("username")
  })
    .then(function (response) {
      foodList = response.data.foodList.sort(dynamicSort("name"))
      showVendor(foodList);
    });
};

const showVendor = (data) => {
  var requestListInnerHtml = `
  <table id="dtHorizontalExample" id="report-table" class="table table-striped" style="width:auto">
    <thead>
      <tr>
        <th>STT</th>
        <th >Tên món ăn</th>
        <th>Giá</th>
        <th>Hình ảnh</th>
        <th>Trạng thái</th>
        <th><button class="btn-right" onclick="popupCreateFood()">Tạo món ăn</button></th>
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
          <div style="display: flex; float:right;">   
            <button class="btn-right" onclick="deleteFood()">Xóa</button>  
            <button class="btn-right" onclick="popupFoodEdit()">Chỉnh sửa</button>
          <div>                       
        </td>
      </tr>`;
  });
  requestListInnerHtml += `
    </tbody>
    </table>`
  main.innerHTML = requestListInnerHtml;
}

const fetchReport = (yearmonth) => {
  axios({
    method: 'get',
    url: apiUrl + '/vendor/report/'+localStorage.getItem("username")+'/'+yearmonth
  })
    .then(function (response) {
      reportList = response.data
      showReport(reportList);
    });
};

const showReport = (data) => {  
  var requestListInnerHtml = `
  <table id="report-table" class="table table-striped" style="width:auto">
    <label for="start">Tháng:</label>
    <input lang='vi' type="month" id="start" name="start"
        min="2010-03" value="${(urlParams.get('yearmonth'))?urlParams.get('yearmonth'):yearmonth}"> 
    <button onclick="filter()">Lọc</button>
    <thead>
      <tr>
        <th>STT</th>
        <th>Ngày</th>
        <th>Tổng</th>
        <th></th>
      </tr>
    </thead>`;
  requestListInnerHtml += `
    <tbody>`
  var i = 0;
  data.forEach((item) => {
    i++;
    var d = new Date(reportList[0].date);
    const ye = new Intl.DateTimeFormat('vi', { year: 'numeric' }).format(d)
    const mo = new Intl.DateTimeFormat('vi', { month: 'short' }).format(d)
    const da = new Intl.DateTimeFormat('vi', { day: '2-digit' }).format(d)    
    requestListInnerHtml += `
    <th scope="row">${i}</th>
      <td>${`${da}-${mo}-${ye}`}</td>
      <td>${item.total} VNĐ</td>
      <td><button class="btn-right" onclick="popupViewDetail()">Chi tiết</button></td>
    </tr>`;
  });
  requestListInnerHtml += `
    </tbody>
  </table>`
  main.innerHTML = requestListInnerHtml;
}

function filter() {
  var monthInput = document.getElementById('start')
  location.href = location.href.split('report')[0]+'report&yearmonth='+monthInput.value
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
    url: apiUrl + '/vendor/'+localStorage.getItem("username"),
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
    url: apiUrl + '/vendor/food/' + document.getElementById('foodid').value,
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
var aa
function deleteFood(e) {
  var target = foodList[parseInt(getEventTarget(e).parentElement.parentElement.parentElement.childNodes[0].innerHTML-1)].id
  axios({
    method: 'delete',
    url: apiUrl + '/vendor/food/'+target,
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
  let foodRow = target.parentElement.parentElement.parentElement;
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
            <label class="col-lg-3 control-label">STT</label>
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
  var index = parseInt(foodRow.childNodes[0].innerText)-1
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
      <th scope="col">STT</th>
      <th scope="col">Tên</th>
      <th scope="col">Số lượng</th>
    </tr>
  </thead>
  <tbody>`
  var i = 0
  reportList[index].reportList.forEach((item) => {
    i++;
    popup.innerHTML+=`<tr>
      <th scope="row">${i}</th>
      <td>${item.food.name}</td>
      <td>${item.quantity}</td>
    </tr>`
  })
  
  popup.innerHTML+=`
    </tbody>`
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