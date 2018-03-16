////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Kód, ktorý sa vykoná pri načítaní skriptu

var artId = queryString2obj().id;
var restURL ="http://"+server+"/api/article/"+artId;

writeArticle2Html(restURL,"article",artId);


//Pridanie funkcionality pre kliknutie na tlacidla
$("#btArtList").click(function(){
    window.location.href='index.html';
});

$("#btUpdate").click(function(){
    window.location.href='articleForm.html?id='+artId;
});

$("#btDelete").click(function(){
    deleteArticle(restURL);
});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//funkcie



function writeArticle2Html(sourceURL,articleElmId, articleId){
    if (isFinite(articleId)){
        $.ajax({
            type: 'GET',
            url: sourceURL,
            dataType: "json",
            success: function (article) {
                $.get("templates/article.mst",      //get() je vlastne specialna verzia ajax()
                    function (template) {
                        $("#"+articleElmId).html(Mustache.render(template, article));
                    }
                    ,"text")
            },
            error:function(jxhr){
                errorAlert("Načitanie článku zlyhalo.",jxhr);
            }
        });
    }
}

/**
 * Vymazanie článku aj s komentármi
 * @param articleId - id článku na vymazanie
 */
function deleteArticle(sourceURL){
    if(window.confirm("Skutočne si želáte vymazať článok aj s jeho komentármi?")) {

        $.ajax({
            type: 'DELETE',
            url: sourceURL,
            success: function () {
                window.alert("Článok úspešne vymazaný");
                window.location.href = "index.html";
            },
            error: function (jxhr) {
                errorAlert("Vymazanie neúspešné.",jxhr);
            }
        });

    }
}