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
        var name = articles[keys[i]].articleName;
        var text = articles[keys[i]].articleText;
        var date = articles[keys[i]].articleDate;
        var time = articles[keys[i]].articleTime;
        var imageStored = articles[keys[i]].articleFileName;

        var uid = firebase.auth().currentUser.uid;

        var storageRef = firebase.storage().ref();

        storageRef.child("articleImages/" + uid + "/" + imageStored).getDownloadURL().then(function (url) {
            $('#cards_area').append('        <div class="col l6 s12 m12">\n' +
                '            <div class="card">\n' +
                '                <div class="card-image">\n' +
                '                    <a href=""><img title="' + name + '" src="' + url + '"\n' +
                '                                               alt="' + name + '"></a>\n' +
                '                    <span class="card-title">'  +name+ '</span>\n' +
                '                </div>\n' +
                '                <div class="card-content">\n' +
                '                    <p>' + text + '</p>\n' +
                '                </div>\n' +
                '            </div>\n' +
                '        </div>\n');
        });


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
