var logged;

var userURL;
//check if user is logged
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        logged = true;
        document.getElementById("log-nav").textContent = "LogOut";
        document.getElementById("log-side-nav").textContent = "LogOut";
        document.getElementById("log-out-invisible-add-project").style.visibility = "visible";
        document.getElementById("log-out-invisible-article-buttons").style.visibility = "visible";
        document.getElementById("log-out-invisible-comments").style.visibility = "visible";
    } else {
        userURL = location.pathname;
        logged = false;
        document.getElementById("log-nav").textContent = "LogIn";
        document.getElementById("log-side-nav").textContent = "LogIn";
        document.getElementById("log-out-invisible-add-project").style.visibility = "hidden";
        document.getElementById("log-out-invisible-article-buttons").style.visibility = "hidden";
        document.getElementById("log-out-invisible-comments").style.visibility = "hidden";
    }
    console.log(userURL);
});

//logout button
function logOutOrIn() {
    if(logged){
        firebase.auth().signOut();
    }else{
        window.location.href = "login.html";
    }
}