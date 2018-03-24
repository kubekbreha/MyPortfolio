var logged;

//check if user is logged
$(document).ready(function () {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            logged = true;
            document.getElementById("log-out-invisible-add-project").style.display = "block";
            Materialize.toast("Logged", 4000);
        } else {
            logged = false;
            document.getElementById("log-out-invisible-add-project").style.display = "none";
            Materialize.toast("NotLogged", 4000);

        }
    });
});

//logout button
function logOutOrIn() {
    if (logged) {
        firebase.auth().signOut();
    } else {
        window.location.href = "login.html";
    }
}

console.log("This is url : " + window.location.href);

function openPage(url) {
    if (logged) {
        window.location.href = url;
    } else {
        var userURL = window.location.href;
        var reg = /[^?]*$/g;
        var matches = userURL.match(reg);
        console.log("This is url matched: " + matches[0]);
        console.log("Parameter: " + url);
        console.log("Redirect to: " + url + "?" + matches);

        window.location.href = url + "?" + matches[0];
    }
}


function openPageArticle(url) {
    if (logged) {
        window.location.href = url;
    } else {
        var userName = document.getElementById('user-name-template').textContent;
        window.location.href = url + "?" + userName;
    }
}