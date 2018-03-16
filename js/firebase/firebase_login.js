//check if user is logged
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        window.location.href = "index.html";
    } else {

    }
});

//basic log in
function logIn() {
    var userEmail = document.getElementById("email_login").value;
    var userPass = document.getElementById("password_login").value;

    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        document.getElementById("error_message").innerHTML = errorMessage;
    });
}

//open register web
function openRegister() {
    window.location.href = "admin_register.html";
}

//google sign in
function callGoogleSignIn(){
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;

        document.getElementById("error_message").innerHTML = errorMessage;

    });
}


function callFacebookSignIn() {
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;

        document.getElementById("error_message").innerHTML = errorMessage;

    });
}
