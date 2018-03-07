firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        loadArticles();

    } else {
        window.location.href = "admin_login.html";
    }
});

function logout() {
    firebase.auth().signOut();
}

function loadArticles() {
    var uid = firebase.auth().currentUser.uid;
    var database = firebase.database();
    var ref = database.ref('users').child(uid).child('articles');
    ref.on('value', gotData, errData);
}

function gotData(data) {

    var ul = document.getElementById("articles_list");
    while (ul.firstChild) ul.removeChild(ul.firstChild);

    //console.log(data.val());
    var articles = data.val();
    var keys = Object.keys(articles);
    console.log(keys);
    for (var i = 0; i < keys.length; i++) {
        var k = keys[i];
        var name = articles[k].articleName;
        var text = articles[k].articleText;
        var date = articles[k].articleDate;
        var time = articles[k].articleTime;
        var imageStored = articles[k].articleFileName;

        // showimage(imageStored);

        $('#cards_area').append('        <div class="col l6 s12 m12">\n' +
            '            <div class="card">\n' +
            '                <div class="card-image">\n' +
            '                    <a href="daphne.html"><img title="Daphne article" src="Assets/img/daphne/expo.JPG"\n' +
            '                                               alt="daphne project"></a>\n' +
            '                    <span class="card-title">Daphne</span>\n' +
            '                </div>\n' +
            '                <div class="card-content">\n' +
            '                    <p>Project Daphne is about finding a way to detect parkinson disease.\n' +
            '                        Take a look how I helped on this project.</p>\n' +
            '                </div>\n' +
            '            </div>\n' +
            '        </div>\n');



        var node = document.createElement("LI");
        var textnode = document.createTextNode(name + " " + text + " " + date + " " + time);
        node.appendChild(textnode);
        document.getElementById("articles_list").appendChild(node);
    }
}

function errData(err) {
    console.log('Error!');
    console.log(err);
}


function showimage(imageStored) {
    var storageRef = firebase.storage().ref();

    var uid = firebase.auth().currentUser.uid;
    var spaceRef = storageRef.child("articleImages/" + uid + "/");
    spaceRef.child(imageStored).getDownloadURL().then(function (url) {
        var test = url;
        alert(url);
        document.querySelector('img').src = test;

    }).catch(function (error) {

    });


}