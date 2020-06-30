<!doctype html>
<html>
<head>
	<meta charset="utf-8">
	<title>Untitled Document</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
	<link type="text/css" href="./resources/css/home.css" rel="stylesheet">
</head>

<body>
<!--	START HEADER-->
	<div id="header" class="w3-container"> 
		<div class="w3-bar w3-blue">
			<div class="w3-bar-item">
				<a href="#" class="w3-button w3-large">BKSFCS</a>
			</div>
			<div class="w3-bar-item">
				<div class="w3-row w3-container">
					<div class="w3-col m6">
					<input type="text" placeholder="Tìm kiếm" class="w3-input w3-border"/>
					</div>
					<div class="w3-col m1">
						<i class="fa fa-search w3-button w3-xlarge w3-grey"></i>
					</div>
				</div>
			</div>
			<div class="w3-bar-item w3-right">
				<a href="#" class="w3-button w3-large" onClick="openModalRegister()">Đăng ký</a>
			</div>
			<div class="w3-bar-item w3-right">
				<a href="#" class="w3-button w3-large" onClick="openModalLogin()">Đăng nhập</a>
			</div>
		</div>
	</div>
<!--	END HEADER-->
<!--	START CONTENT-->
	<div id="content" class="w3-container w3-row">
		<div id="left" class="w3-col m1">
			<div class="w3-bar-block">
				<a href="#" class="w3-bar-item w3-button">
					<div id="home">
						<i class="fa fa-home w3-xxlarge w3-padding"></i>
						<span style="font-size: 0.9em">Trang chủ</span>
					</div>
				</a>
				<a href="#" class="w3-bar-item w3-button">
					<div id="cart">
						<i class="fa fa-cart-plus w3-xxlarge w3-padding"></i>
						<span style="font-size: 0.9em">Giỏ hàng</span>
					</div>
				</a>
				<a href="#" class="w3-bar-item w3-button">
					<div id="history">
						<i class="fa fa-history w3-xxlarge w3-padding"></i>
						<span style="font-size: 0.9em">Lịch sử</span>
					</div>
				</a>
				<a href="#"  class="w3-bar-item w3-button">
					<div id="login">
						<i class="fa fa-user w3-xxlarge w3-padding"></i>
						<span style="font-size: 0.9em">Đăng nhập</span>
					</div>	
				</a>
				
			</div>
		</div>
		<div id="middle" class="w3-col m9 w3-container">
			<div class="w3-content w3-section" style="width: 100%">
				<img class="mySlides" src="https://cdn.cet.edu.vn/wp-content/uploads/2019/05/chon-lua-va-nau-ky-thuc-pham.jpg" style="width: 100%;height: 400px"/>
				<img class="mySlides" src="https://images.foody.vn/res/g87/862055/prof/s576x330/foody-upload-api-foody-mobile-hddd-jpg-181210165347.jpg" style="width: 100%;height: 400px"/>
				<img class="mySlides" src="https://images.vov.vn/w800/uploaded/0my4wpimuay/2019_02_15/a_1_fsbg.jpg" style="width: 100%;height: 400px"/>
				<img class="mySlides" src="https://image.plo.vn/w653/Uploaded/2020/tmuihk/2017_09_08/thuc-an-nhanh-thumb_yxiv.jpg" style="width: 100%;height: 400px"/>
				<img class="mySlides" src="https://icdn.dantri.com.vn/thumb_w/640/2019/04/07/di-ung-1554605099535.jpg" style="width: 100%;height: 400px"/>
			</div>
			<div>Hiển thị các món ăn</div>
		</div>
		<div id="right" class="w3-col m2 w3-panel w3-card-4 w3-container">
			<div class="w3-blue" style="font-size: 1.2em;text-align: center">Menu chính</div>
			<a href="#" class="w3-bar-item w3-button">
			<i class="fa fa-shopping-basket w3-large w3-padding"></i>	
				Cơm
			</a>
			<a href="#" class="w3-bar-item w3-button">
			<i class="fa fa-shopping-basket w3-large w3-padding"></i>	
				Bún-Phở
			</a>
			<a href="#" class="w3-bar-item w3-button">
			<i class="fa fa-shopping-basket w3-large w3-padding"></i>	
				Nước giải khát
			</a>
		</div>
	</div>
<!--	END CONTENT-->
	<div id="footer" class="w3-container"></div>
	<?php
	include "login.php";
	include "register.php";
	?>
</body>
	<script src="./resources/js/home.js"></script>
</html>