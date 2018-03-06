firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        loadArticles();

    } else {
        window.location.href = "admin_login.html";
    }
});

function logout(){
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
    while(ul.firstChild) ul.removeChild(ul.firstChild);

    //console.log(data.val());
    var articles = data.val();
    var keys = Object.keys(articles);
    console.log(keys);
    for(var i = 0; i<keys.length; i++){
        var k = keys[i];
        var name = articles[k].articleName;
        var text = articles[k].articleText;
        var date = articles[k].articleDate;
        var time = articles[k].articleTime;

        var node = document.createElement("LI");
        var textnode = document.createTextNode(name + " " + text + " " + date + " " + time);
        node.appendChild(textnode);
        document.getElementById("articles_list").appendChild(node);
    }
}

function errData(err){
    console.log('Error!');
    console.log(err);
}