$(document).ready(function () {
    $('.materialboxed').materialbox();
    $('.scrollspy').scrollSpy();
    $(".button-collapse").sideNav();
});

$(document).ready(function(){
    $('.parallax').parallax();
});

$("show_work").click(function() {
    $('html,body').animate({
            scrollTop: $(".scroll_work").offset().top},
        'slow');
});

$(document).ready(function(){
    $('.materialboxed').materialbox();
});

//forms input
$('#textarea1').val('New Text');
$('#textarea1').trigger('autoresize');




