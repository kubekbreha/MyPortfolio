firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
    } else {
        window.location.href = "login.html";
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

    refUser.set(userData);
}
