var logged;

//check if uer is logged
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        logged = true;
        // document.getElementById("invisivle-comment").visibility = "hidden";
        // document.getElementById("commentForm").visibility = "hidden";
        // document.getElementById("article-buttons").visibility = "hidden";
        // document.getElementById("add-project").visibility = "hidden";
        document.getElementById("logInOut-nav").textContent = "LogOut";
        document.getElementById("logInOut-side-nav").textContent = "LogOut";
    } else {
        logged = false;
        // document.getElementById("invisivle-comment").visibility = "visible";
        // document.getElementById("commentForm").visibility = "visible";
        // document.getElementById("article-buttons").visibility = "visible";
        // document.getElementById("add-project").visibility = "visible";
        document.getElementById("logInOut-nav").textContent = "LogIn";
        document.getElementById("logInOut-side-nav").textContent = "LogIn";
    }
});

//logout button
function logout() {
    if (logged) {
        firebase.auth().signOut();
    } else {
        window.location.href = "login.html";
    }
}


