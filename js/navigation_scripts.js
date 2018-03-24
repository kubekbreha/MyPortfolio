$(document).ready(function () {
    $('.materialboxed').materialbox();
    $('.scrollspy').scrollSpy();
    $(".button-collapse").sideNav();

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            document.getElementById("log-nav").textContent = "LogOut";
            document.getElementById("log-side-nav").textContent = "LogOut";
        } else {
            document.getElementById("log-nav").textContent = "LogIn";
            document.getElementById("log-side-nav").textContent = "LogIn";
        }
    });
});

