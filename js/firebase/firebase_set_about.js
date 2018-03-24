var logged;

//check if user is logged
$(document).ready(function () {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            logged = true;
        } else {
            logged = false;
            window.location.href = "index.html";
        }
    });
});

function setAbout() {
    var uid = firebase.auth().currentUser.uid;
    var database = firebase.database();
    var refUser = database.ref('users').child(uid).child("userAbout");

    var authorAbout = document.getElementById("about_text_in").value;

    window.alert("submit");

    var userData = {
        userName: authorAbout
    };

    console.log("set user about data");

    refUser.set(userData).then(function onSuccess(res) {
        window.location.href = "index.html";
    }).catch(function onError(err) {
        Materialize.toast("Data wasnt set.", 4000);
    });

}
