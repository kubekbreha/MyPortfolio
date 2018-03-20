var logged;

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
        logged = false;
        document.getElementById("log-nav").textContent = "LogIn";
        document.getElementById("log-side-nav").textContent = "LogIn";
        document.getElementById("log-out-invisible-add-project").style.visibility = "hidden";
        document.getElementById("log-out-invisible-article-buttons").style.visibility = "hidden";
        document.getElementById("log-out-invisible-comments").style.visibility = "hidden";
    }
});

//logout button
function logOutOrIn() {
    if(logged){
        firebase.auth().signOut();
    }else{
        window.location.href = "login.html";
    }
}
console.log("This is url : " + window.location.href);

function openPage(url){
    if(logged){
        window.location.href = url;
    }else{
        var userURL = window.location.href;
        var reg = /[^?]*$/g;
        var matches = userURL.match(reg);
        console.log("This is url matched: " + matches[0]);
        console.log("Parameter: " + url);
        console.log("Redirect to: "+ url + "?" + matches);

        window.location.href = url + "?" + matches[0] ;
    }
}
