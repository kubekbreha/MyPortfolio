console.log("Downloading articles ...");

var startIndex = 0;

writeArticles2Html(0, articlesForPage, server, 'clanky');


/**
 * add to articles object, object whith data for nav buttons
 * @param articles - objekt with articles
 * @param startIndex - index (article number from 0)
 * @returns {Object} - objekt articles  with nav bar buttons
 */

function addNavBtInfo(articles, startIndex) {
    if (startIndex > 0) {
        articles.prev = {
            from: (startIndex - articlesForPage > 0 ? startIndex - articlesForPage : 0),
        };
    }
    if (startIndex + articlesForPage < articles.meta.totalCount) {
        articles.nxt = {
            from: startIndex + articlesForPage,
        };
    }
}


/**
 * Write data about articles to element whith id articlesElmID an nav to element navElmId
 * @param startIndex - index (poradové číslo čláanku od 0)
 * @param max - max amount of articles per page.
 * @param server - name of server where articles sit.
 * @param articlesElmId - Id of element where articles will be writen
 */
function writeArticles2Html(startIndex, max, server, articlesElmId) {
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

                        //actual getting of articles
                        $.ajax({
                            type: 'GET',
                            url: "http://" + server + "/api/article?author=" + userName,
                            data: {max: max, offset: startIndex},
                            dataType: "json",
                            success: function (articles) {
                                addNavBtInfo(articles, startIndex);
                                $.get("templates/listOfArticles.mst",
                                    function (template) {
                                        $("#" + articlesElmId).html(Mustache.render(template, articles));
                                    }
                                    , "text");
                            },
                            error: function (jxhr) {
                                errorAlert("Loading of articles failed.", jxhr);
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


function forwardArticles() {
    startIndex += 1;
    writeArticles2Html(startIndex, articlesForPage, server, 'clanky');
}


function backwardArticles() {
    if (startIndex > 0) {
        startIndex -= 1;
        writeArticles2Html(startIndex, articlesForPage, server, 'clanky');
    }
}