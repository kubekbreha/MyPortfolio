function sendPasswordRestoreMail() {

    var email = document.getElementById("email_forgot").value;
    firebase.auth().sendPasswordResetEmail(email).then(function onSuccess(res) {
        window.location.href = "login.html";
    }).catch(function onError(err) {
        Materialize.toast("Email wasnt set.", 4000);
    });
}