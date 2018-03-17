console.log("Downloading comments ...");

writeComments2Html(0, articlesForPage, server, 'komentare');

//geting page id
// var articleID = document.URL;
// var numberPattern = "=[0-9][0-9][0-9][0-9]";
// articleID = articleID.match( numberPattern )[0];
// var unwantedCharacter = "=";
// while( articleID.charAt(0) == unwantedCharacter ) articleID = articleID.substr(1);
//
// var artId = queryString2obj().id;
console.log(artId);

function addNavBtInfo(comments, startIndex){
    if(startIndex>0) {
        comments.prev = {
            from:  (startIndex - commentsForPage > 0 ? startIndex - commentsForPage : 0),
        };
    }
    if(startIndex+commentsForPage<comments.meta.totalCount){
        comments.nxt={
            from:  startIndex+commentsForPage,
        };
    }
}

function writeComments2Html(startIndex, max, server, commentsElID){
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var uid = user.uid;
            console.log(user.uid);

            var userName = "";

            var database = firebase.database();
            var refUser = database.ref('users').child(uid).child("userInfo");
            refUser.once("value", function(snapshot) {
                snapshot.forEach(function(child) {
                    if(child.key === "userName"){
                        console.log(child.key+": "+child.val());
                        userName = child.val();

                        //actual getting of articles
                        $.ajax({
                            type: 'GET',
                            url: "http://"+server+"/api/article/"+artId+"/comment",
                            data: { max: max, offset: startIndex },
                            dataType: "json",
                            success: function (comments) {
                                addNavBtInfo(comments,startIndex);
                                $.get("templates/listOfComments.mst",
                                    function (template) {
                                        $("#"+commentsElID).html(Mustache.render(template, comments));
                                    }
                                    ,"text");
                            },
                            error:function(jxhr){
                                errorAlert("Loading of Comments failed.",jxhr);
                            }
                        });
                    }
                });
            });
        } else {
            window.location.href = "login.html";
        }
    });
}
