
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Untitled Document</title>
</head>

<body>
	<div id="modallogin" class="w3-modal">
		<div class="login w3-modal-content w3-card-4 w3-animate-zoom">
				<header class="w3-container w3-blue w3-margin-bottom">
					<span onClick="closeModalLogin()" class="w3-button w3-display-topright">&times;</span>
					<h2 class="w3-blue" style="text-align:center">Thông tin đăng nhập</h2>
				</header>
			<div class="enter-login w3-padding">
				<i class="fa fa-user w3-xlarge"></i>
				<input type="text" placeholder="Tên đăng nhập"/>
			</div>
			<div class="enter-login w3-padding">
				<i class="fa fa-lock w3-xlarge"></i>
				<input type="password" placeholder="Mật khẩu"/>
			</div>
			<footer class="w3-display-bottomright" style="margin-right: 100px;margin-bottom: 65px">
				<a href="#">
					<button class="w3-button w3-blue w3-content">Đăng nhập</button>
				</a>
			</footer>
		</div>
	</div>
</body>
</html>