$(document).ready(function () {


    var artId = queryString2obj().id;

    function errorDialog(status) {
        console.log("Chyba pri načítavaní údajov zo servera.\nStatus= " + status);
    }

    writeComment2Html(0, commentsForPage, server, 'komentare', 'navigacia', artId);

    function writeComment2Html(startIndex, max, server, commentElmId, navElmId, ID) {
        if (isFinite(ID)) {
            $.ajax({
                type: 'GET',
                url: "http://" + server + "/api/article/" + ID + "/comment",
                data: {max: max, offset: startIndex},
                dataType: "json",
                success: function (comments) {
                    comments.comments = comments.comments.map(function (comment) {
                        comment.dateCreatedHr = moment(comment.dateCreated).calendar();
                        comment.lastUpdatedHr = moment(comment.lastUpdated).calendar();
                        return comment;
                    });
                    $("#" + commentElmId).html(Mustache.render($("#commentTemplate").html(), comments));
                    $("#" + navElmId).html(navHtml(startIndex, comments.comments.length, comments.meta.totalCount));
                }
            });
        }
    }
});