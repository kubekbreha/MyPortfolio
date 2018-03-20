firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        window.location.href = "settings.html";
    } else {

    }
});

function register() {
    var userEmail = document.getElementById("email_register").value;
    var userPass = document.getElementById("password_register").value;
    var userPass2 = document.getElementById("password_register2").value;


    if(userPass === userPass2) {
        firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;

            document.getElementById("error_message_register").innerHTML = errorMessage;
        });
    }
}


function backToLogin() {
    window.location.href = "login.html";
}