
// All page - Menu for small screen
//прилипание заголовка при скролле с отступом на header
var num = $("header").outerHeight() - 50; //number of pixels before modifying styles
$(window).bind('scroll', function() {
    if ($(window).scrollTop() > num) {
        $('.navbar').addClass('fixed');
    } else {
        $('.navbar').removeClass('fixed');
    }
});

// All page - Nice select
$(document).ready(function() {
    $('select').niceSelect();
});

// Home page - news same size
$('.news-small-block-match-height').matchHeight(false);
$('.news-small-block-match-height h3').matchHeight(false);

// Home page - Carousel 
$('#owl-carousel__about-us').owlCarousel({
    loop: true,
    margin: 10,
    smartSpeed: 1000,
    responsive: {
        0: {
            items: 1
        },
        460: {
            items: 2
        },
        650: {
            items: 3
        },
        900: {
            items: 4
        }
    }
});