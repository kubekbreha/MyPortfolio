firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
    } else {
        window.location.href = "login.html";
    }
});


function logout() {
    firebase.auth().signOut();
}