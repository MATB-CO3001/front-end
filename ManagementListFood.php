<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>List Food</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"/>
<link rel="stylesheet" type="text/css" href="./resources/css/MnagementListFood.css">
</head>

<body>
	<div class="header row container text-center">
		<div class="col-sm-3">Smart Food Court System</div>
		<div class="col-sm-6">Welcome Vendor</div>
		<div class="col-sm-3">
			<button type="submit" class="btn btn-primary">Logout</button>
		</div>
	</div>
	<div class="content row container jumbotron">
		<div class="left col-sm-3">
			<form method="post">
				<button type="submit" class="btn btn-primary btn-block" name="food">Food List</button>
				<button type="submit" class="btn btn-primary btn-block" name="order">View Order</button>
			</form>
		</div>
		<div class="col-sm-9">
			<?php
				include "../back-end/api/src/main/php/Management_config.php";
			?>
		</div>
	</div>
	
</body>
</html>