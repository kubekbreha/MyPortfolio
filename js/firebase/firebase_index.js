var logged;

//check if user is logged
$(document).ready(function () {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            logged = true;
        } else {
            logged = false;
        }
    });
});

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        var uid = user.uid;
        console.log(user.uid);

        var userName = "";

        var database = firebase.database();

        var leadsRef = database.ref('users').child(uid).child("userAbout");
        leadsRef.on('value', function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                var childData = childSnapshot.val();
                console.log(childData.key + ": " + childData);
                document.getElementById("index_about_text").textContent = childData;
            });
        });

        var refUser = database.ref('users').child(uid).child("userInfo");
        refUser.once("value", function (snapshot) {
            snapshot.forEach(function (child) {
                if (child.key === "userName") {
                    console.log(child.key + ": " + child.val());
                    userName = child.val();

                    document.getElementById("index_user_name").textContent = userName;

                }
            });
        });


    }else{
        var userURL = window.location.href;
        var reg = /[^?]*$/g;
        var matches = userURL.match(reg);
        console.log("This is url matched: " + matches[0]);

        var newName = matches[0].replace(/%20/g , " ");
        document.getElementById("index_user_name").textContent = newName;
        document.getElementById("index_about_me_section").style.display = "none";

    }
});