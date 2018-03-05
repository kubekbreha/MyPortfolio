firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        window.location.href = "admin.html";
    } else {

    }
});

function logIn() {
    var userEmail = document.getElementById("email_login").value;
    var userPass = document.getElementById("password_login").value;

    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        document.getElementById("error_message").innerHTML = errorMessage;
    });
}
