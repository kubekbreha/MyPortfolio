//check if user is logged
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {

    } else {
        window.location.href = "index.html";
    }
});


//-------------------------------push data of article to database-------------------------------
function setUserData() {
    var uid = firebase.auth().currentUser.uid;
    var database = firebase.database();
    var refUser = database.ref('users').child(uid).child("userInfo");

    var authorName = document.getElementById("input_name").value;
    var authorEmail = document.getElementById("input_email").value;

    window.alert("submit");

    var userData = {
        userName: authorName,
        userEmail: authorEmail
    };

    console.log("set user data");

    refUser.set(userData).then(function onSuccess(res) {
        window.location.href = "index.html";
    }).catch(function onError(err) {
        Materialize.toast("Data wasnt set.", 4000);
    });

}
