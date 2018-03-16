////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Kód, ktorý sa vykoná pri načítaní skriptu


console.log("Zacinam stahovat zoznam clankov ...");


//Výpis prvých maximálne pocetClankovNaStranu článkov a zápis informácie do navigačného panela
writeArticles2Html(0, pocetClankovNaStranu, server, 'clanky');



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//funkcie


/**
 * prida k objektu articles objekt s udajmi pre navigacne tlacidla
 * @param articles - objekt s clankami, ku ktoremu sa pridaju udaje pre navigacne tlacidla.
 * @param startIndex - index (poradové číslo článku od 0) od ktorého sa články vypisujú
 * @returns {Object} - objekt articles  s pridanymi udajmi pre navigacne tlacidla
 */

function addNavBtInfo(articles, startIndex){
    if(startIndex>0) {
        articles.prev = {
            from:  (startIndex - pocetClankovNaStranu > 0 ? startIndex - pocetClankovNaStranu : 0),
        };
    }
    if(startIndex+pocetClankovNaStranu<articles.meta.totalCount){
        articles.nxt={
            from:  startIndex+pocetClankovNaStranu,
        };
    }
}


/**
 * Zapíše údaje o článkoch do elementu s id articlesElmId a HTML kód navigácie do elementu s id navElmId
 * Iba verzia s Mustache sablonou z elementu s id =listOfArticlesMTemplate
 * @param startIndex - index (poradové číslo čláanku od 0) od ktorého sa články vypisujú
 * @param max - maximálny počet článkov.
 * @param server - doménové meno servera odkiaľ sa majú údaje stiahnuť.
 * @param articlesElmId - Id elementu do ktorého sa články majú vypísať
 */
function writeArticles2Html(startIndex, max, server, articlesElmId){
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
                            url: "http://"+server+"/api/article?author="+userName,
                            data: { max: max, offset: startIndex },
                            dataType: "json",
                            success: function (articles) {
                                addNavBtInfo(articles,startIndex);
                                $.get("templates/listOfArticles.mst",      //get() je vlastne specialna verzia ajax()
                                    function (template) {
                                        $("#"+articlesElmId).html(Mustache.render(template, articles));
                                    }
                                    ,"text");
                            },
                            error:function(jxhr){
                                errorAlert("Načitanie článkov zlyhalo.",jxhr);
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
