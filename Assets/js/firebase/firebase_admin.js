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
        articleImageUrl: articleImageUrlString,
        articleFileName: file.name
    };
    refArticles.push(data);

    //document.getElementById("image_progress").style.visibility = "visible";
    var percentage;
    task.on('state_changed',

        function progress(snapshot) {
            percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            if (percentage == 100) {
                window.alert("file pushed");
                //document.getElementById("image_progress").style.visibility = "hidden";
            }
        },
        function error(err) {

        },
        function complete() {

        }
    );
}

//image upload variables

var fileButton = document.getElementById('fileButton');
var file;
var storageRef;
var task;

// fileButton.addEventListener('change', function (e) {
//     file = e.target.files[0];
//     var uid = firebase.auth().currentUser.uid;
//     storageRef = firebase.storage().ref("articleImages/" + uid +"/"+ file.name);
//     task = storageRef.put(file);
// });


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



function resetForms(){
    document.getElementById("input_article_name").value = "";
    document.getElementById("input_article_text").value = "";
    document.getElementById("input_date").value = "";
    document.getElementById("input_time").value = "";
    document.getElementById("input_image_url").value = "";
    document.getElementById("input_image_file").value = "";
    document.getElementById("input_chips").value = "";
}

