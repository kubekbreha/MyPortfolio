console.log("Downloading comments ...");
var artId = queryString2obj().id;

writeComment2Html(0, commentsForPage, server, 'komentare');

function writeComment2Html(startIndex, max, server, commentElID){
    $.ajax({
        type: 'GET',
        url: "http://"+server+"/api/article/"+artId+"/comment",
        data: { max: max, offset: startIndex },
        dataType: "json",
        success: function (articles) {
            $.get("templates/listOfComments.mst",
                function (template) {
                    $("#"+commentElID).html(Mustache.render(template, articles));
                }
                ,"text");
        },
        error:function(jxhr){
            errorAlert("Comment loading failed.",jxhr);
        }
    });
}




var commentURL ="http://"+server+"/api/comment/";
function deleteComment(sourceURL){
    if(window.confirm("Are you sure you want to delete this comment?")) {

        $.ajax({
            type: 'DELETE',
            url: sourceURL,
            success: function () {
                window.alert("Deleted successfully");
                window.location.href = "article.html?id="+artId;
            },
            error: function (jxhr) {
                errorAlert("Delete not successfull", jxhr);
            }
        });

    }
}