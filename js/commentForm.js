var $form = $("#SKorFrm");
var artId = queryString2obj().id;


//go back button
$("#btBack").click(function(){
    window.history.back()
});

//commit article button
function commentSubmit(){
    event.preventDefault();
    console.log("get here");
    prepareAndSendArticle($form,"POST","http://"+server+"/api/article/"+artId+"/comment");
};


window.onload = function() {
    setFirstFormElement()
};


//set user name from firebase to author form
function setFirstFormElement() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var uid = user.uid;
            console.log(user.uid);

            var userName = "";

            var database = firebase.database();
            var refUser = database.ref('users').child(uid).child("userInfo");
            refUser.once("value", function (snapshot) {
                snapshot.forEach(function (child) {
                    if (child.key === "userName") {
                        console.log(child.key + ": " + child.val());
                        userName = child.val();
                        document.getElementById("comment_user_name").value = userName;
                        console.log("username from form:  " + userName);
                    }
                });
            });
        } else {
            window.location.href = "login.html";
        }
    });
}



/**
 * Proess data from form and send them to server.
 * @param $frm - form (jQuery objekt)
 * @param method - metóda, "POST" (add article) or "PUT" (edit article)
 * @param restURL - url of source on server
 */
function prepareAndSendArticle($frm, method, restURL) {
    //1. save data from form to object
    var data = {};
    $frm.serializeArray().map(
        function(item){
            var itemValueTrimmed = item.value.trim();
            if(itemValueTrimmed){
                data[item.name] = item.value;
            }
        }
    );


    console.log("prepareAndSendComment data after saving into object:");
    console.log(JSON.stringify(data));

    if(data.tags){
        data.tags=data.tags.split(",");
        data.tags=data.tags.map(function(tag) {return tag.trim()});
    }

    console.log("prepareAndSendArticle> tags after processing:");
    console.log(JSON.stringify(data));


    console.log("prepareAndSendArticle> All needed forms filled:");


    //3. sending data
    if(window.confirm("You realy want to save this comment")){
        $.ajax({
            type: method,
            url: restURL,
            dataType: "json",
            contentType:"application/json;charset=UTF-8",
            data:JSON.stringify(data),
            success: function (response) {
                if(response.id){
                    console.log(response.id);
                    window.location.href="article.html?id="+response.id;
                }
            },
            error: function (jxhr) {
                window.alert("Processing failed. Data was not saved. Error code:" + status + "\n" + jxhr.statusText + "\n" + jxhr.responseText);
            }
        });

    }
}
