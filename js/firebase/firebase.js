//check if uer is logged
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
    } else {
        window.location.href = "login.html";
    }
});

//logout button
function logout() {
    firebase.auth().signOut();
}