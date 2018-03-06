firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
    } else {
        window.location.href = "admin_login.html";
    }
});


function logout(){
    firebase.auth().signOut();
}




//-------------------------------push data to database-------------------------------
function submitClick() {
    var uid = firebase.auth().currentUser.uid;
    var database = firebase.database();
    var refUser = database.ref('users').child(uid);
    var refArticles = database.ref('users').child(uid).child('articles');


    var articleDate = document.getElementById("input_date");
    var articleTime = document.getElementById("input_time");
    var articleName = document.getElementById("input_article_name");
    var articleText = document.getElementById("input_article_text");
    //var articleImage = document.getElementById("input_article_image");
    //var articleImageUri = document.getElementById("input_image_url");



    var articleDateString = articleDate.value;
    var articleTimeString = articleTime.value;
    var articleNameString = articleName.value;
    var articleTextString = articleText.value;


    var data = {
        articleDate: articleDateString,
        authorTime: articleTimeString,
        authorName: articleNameString,
        authorText: articleTextString
    };
    refArticles.push(data);

    window.alert("submit");
}


function setUserData(){
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