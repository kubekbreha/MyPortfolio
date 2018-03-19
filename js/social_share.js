document.addEventListener("DOMContentLoaded", function(event) {

// Uses sharer.js
//  https://ellisonleao.github.io/sharer.js/#twitter
    var url = window.location.href;
    var title = document.title;
    var subject = "Read this good article";
    var via = "bootstrapC";
    console.log( url );
    console.log( title );


//facebook
    $('#share-fb').attr('data-url', url).attr('data-sharer', 'facebook');
//twitter
    $('#share-tw').attr('data-url', url).attr('data-title', title).attr('data-via', via).attr('data-sharer', 'twitter');
//linkedin
    $('#share-li').attr('data-url', url).attr('data-sharer', 'linkedin');
// google plus
    $('#share-gp').attr('data-url', url).attr('data-title', title).attr('data-sharer', 'googleplus');
    // email
    $('#share-em').attr('data-url', url).attr('data-title', title).attr('data-subject', subject).attr('data-sharer', 'email');

//Prevent basic click behavior
    $( ".sharer button" ).click(function() {
        event.preventDefault();
    });


});