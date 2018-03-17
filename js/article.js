var artId = queryString2obj().id;
var restURL ="http://"+server+"/api/article/"+artId;

writeArticle2Html(restURL,"article",artId);

$("#btArtList").click(function(){
    window.location.href='index.html';
});

$("#btUpdate").click(function(){
    window.location.href='articleForm.html?id='+artId;
});

$("#btDelete").click(function(){
    deleteArticle(restURL);
});

/**
 * write article to html page.
 *
 * @param sourceURL
 * @param articleElmId
 * @param articleId
 */
function writeArticle2Html(sourceURL,articleElmId, articleId){
    if (isFinite(articleId)){
        $.ajax({
            type: 'GET',
            url: sourceURL,
            dataType: "json",
            success: function (article) {
                $.get("templates/article.mst", function (template) {
                        $("#"+articleElmId).html(Mustache.render(template, article));
                    }
                    ,"text")
            },
            error:function(jxhr){
                errorAlert("Loading of article failed",jxhr);
            }
        });
    }
}

/**
 * Deleting of article with its comments.
 * @param sourceURL
 */
function deleteArticle(sourceURL){
    if(window.confirm("Are you sure you want to delete this projec?")) {

        $.ajax({
            type: 'DELETE',
            url: sourceURL,
            success: function () {
                window.alert("Project was deleted");
                window.location.href = "index.html";
            },
            error: function (jxhr) {
                errorAlert("Deleting failed.",jxhr);
            }
        });

    }
}