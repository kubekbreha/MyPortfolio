//variables
var fileName;
var files;

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
    } else {
        window.location.href = "admin_login.html";
    }
});


function logout() {
    firebase.auth().signOut();
}


//-------------------------------push data of article to database-------------------------------
function submitClick() {
    var uid = firebase.auth().currentUser.uid;
    var database = firebase.database();
    var refArticles = database.ref('users').child(uid).child('articles');


    var articleDate = document.getElementById("input_date");
    var articleTime = document.getElementById("input_time");
    var articleName = document.getElementById("input_article_name");
    var articleText = document.getElementById("input_article_text");
    var articleImageUrl = document.getElementById("input_image_url");


    var articleDateString = articleDate.value;
    var articleTimeString = articleTime.value;
    var articleNameString = articleName.value;
    var articleTextString = articleText.value;
    var articleImageUrlString = articleImageUrl.value;


    var data = {
        articleDate: articleDateString,
        articleTime: articleTimeString,
        articleName: articleNameString,
        articleText: articleTextString,
        articleImageUrl: articleImageUrlString
    };
    refArticles.push(data);

    uploadFile();

    window.alert("submit");
}


var uploader = document.getElementById('uploader'),
    fileButton = document.getElementById('submit');

fileButton.addEventListener('change', function (e) {
    window.alert("submit");

    var file = e.target.files[0];

    var storageRef = firebase.storage().ref("articleImages" + file.name);
    console.log(fileLocation);

    var task = storageRef.put(file);

    task.on('state_changed',

        function progress(snapshot) {
            var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            uploader.value = percentage;
            if (percentage == 100) {
                alert("file uploaded Successfully");
            }
        },
        function error(err) {

        },
        function complete() {

        }
    );

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