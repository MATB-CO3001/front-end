var dummyData = [
    {
      "name": "Cơm củ thịt",
      "price": "20000",
      "image": "image1.jpg",
      "status": "Còn hàng",
    },
    {
      "name": "Cơm cục cá",
      "price": "18000",
      "image": "image2.jpg",
      "status": "Còn hàng",
    },
    {
      "name": "Cơm trứng khủng lung",
      "price": "25000",
      "image": "image3.jpg",
      "status": "Còn hàng",
    },
  ];
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

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const main = document.getElementById('main');

document.addEventListener("DOMContentLoaded", () => {
    var type = urlParams.get('type');
    // if (type==null)
    //   type = 'food'
    // console.log(type);
    if (type == 'food'){
        var requestListInnerHtml = `
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Tên món ăn</th>
            <th scope="col">Giá</th>
            <th scope="col">Hình ảnh</th>
            <th scope="col">Trạng thái</th>
            <th scope="col"></th>
          </tr>
        </thead>`;
        requestListInnerHtml += `
        <tbody>`
        var i=0;
        dummyData.forEach((item) => {
          i++;
          requestListInnerHtml += `
          <th scope="row">${i}</th>
            <td>${item.name}</td>
            <td>${item.price} VNĐ</td>
            <td>${item.image}</td>
            <td>${item.status}</td>
            <td><button class="btn-right" onclick="popupFoodEdit()">Chỉnh sửa</button></td>
          </tr>`;
        });
      requestListInnerHtml += `
      </tbody>`         
      main.childNodes[1].innerHTML = requestListInnerHtml;
      return;
    }
    if (type == 'report'){
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
      var i=0;
      dummyData1.forEach((item) => {
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
    return;
  }
    
});

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
  
  var popup = document.createElement("div");
  popup.id = 'food-edit-popup'
  popup.innerHTML = `
  <h2>Chỉnh sửa món ăn</h2>
        <hr>

        <form class="form-horizontal" role="form">
          <div class="form-group">
            <label class="col-lg-3 control-label">Tên món ăn</label>
            <div class="col-lg-8">
              <input class="form-control" type="text" value="${foodRow.childNodes[2].innerHTML}">
            </div>
          </div>
          <div class="form-group">
            <label class="col-lg-3 control-label">Giá tiền</label>
            <div class="col-lg-8">
              <input class="form-control" type="text" value="${foodRow.childNodes[4].innerHTML}">
            </div>
          </div>
          <div class="form-group">
            <label class="col-lg-3 control-label">Trạng thái</label>
            <div class="col-lg-8">
              <select class="form-control">
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
              <input type="reset" class="btn btn-default" value="Hủy bỏ">
              <span>&nbsp</span>
              <input type="button" class="btn btn-primary" value="Lưu lại">
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
  target.parentElement.remove();
}