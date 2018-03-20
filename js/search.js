function searchArticle() {
    var nameValue = document.getElementById("search").value;
    writeArticles2HtmlSearch(0, articlesForPage, server, 'clanky', nameValue);
}

function writeArticles2HtmlSearch(startIndex, max, server, articlesElmId, search){
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
                            url: "http://"+server+"/api/article?author="+userName+"&title="+search,
                            data: { max: max, offset: startIndex },
                            dataType: "json",
                            success: function (articles) {
                                $.get("templates/listOfArticles.mst",
                                    function (template) {
                                        $("#"+articlesElmId).html(Mustache.render(template, articles));
                                    }
                                    ,"text");
                            },
                            error:function(jxhr){
                                errorAlert("Loading of articles failed.",jxhr);
                            }
                        });
                    }
                });
            });
        } else {
            //window.location.href = "login.html";
        }
    });
}
