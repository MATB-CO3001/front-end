$(document).ready(function() {      
    $('.carousel').carousel({
        pause: true,
        interval: false
    });
});

var slideAt;

$('#carouselExampleIndicators').on('slid.bs.carousel', function () {
    var ele = $('#carouselExampleIndicators .carousel-indicators li.active');
    slideAt = ele.data('slideTo');
    console.log(slideAt);
});