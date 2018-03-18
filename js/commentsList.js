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
