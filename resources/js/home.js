// JavaScript Document}
var myIndex = 0;
carousel();
function carousel() {
  var i;
  var x = document.getElementsByClassName("mySlides");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  myIndex++;
  if (myIndex > x.length) {myIndex = 1}    
  x[myIndex-1].style.display = "block";  
  setTimeout(carousel, 2000); // Change image every 2 seconds
}
function openModalLogin()
{
	document.getElementById('modallogin').style.display = 'block';
}
function closeModalLogin()
{
	document.getElementById('modallogin').style.display = 'none';
}
function openModalRegister()
{
	document.getElementById('modallregister').style.display = 'block';
}
function closeModalRegister()
{
	document.getElementById('modallregister').style.display = 'none';
}