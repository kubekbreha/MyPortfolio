//Nastavenie moment js na slovensicnu
moment.locale('sk');

var artId = queryString2obj().id;
writeArticle2Html("article",artId);

function errorDialog(status){
    console.log("Chyba pri načítavaní údajov zo servera.\nStatus= "+status);
}

function writeArticle2Html(articleElmId,ID){
    if (isFinite(ID)){
        $.ajax({
            type: 'GET',
            url: "http://"+server+"/api/article/"+ID,
            dataType: "json",
            success: function (article) {
                article.dateCreatedHr = moment(article.dateCreated).calendar();
                article.lastUpdatedHr = moment(article.lastUpdated).calendar();
                $("#"+articleElmId).html(Mustache.render($("#artcTemplate").html(), article));
                startApp();
            },
            error:function(responseObj,textStatus, errorThrown){
                errorDialog(textStatus+"("+errorThrown+")");
            }
        });
    }
}

writeComment2Html(0, pocetKomentarovNaStranu, server, 'comment', 'navigacia', artId);

function writeComment2Html(startIndex, max, server, commentElmId, navElmId, ID) {
    if (isFinite(ID)) {
        $.ajax({
            type: 'GET',
            url: "http://" + server + "/api/article/" + ID + "/comment",
            data: { max: max, offset: startIndex },
            dataType: "json",
            success: function (comments) {
                comments.comments = comments.comments.map(function (comment) {
                    comment.dateCreatedHr = moment(comment.dateCreated).calendar();
                    comment.lastUpdatedHr = moment(comment.lastUpdated).calendar();
                    return comment;
                });
                $("#" + commentElmId).html(Mustache.render($("#comTemplate").html(), comments));
                $("#" + navElmId).html(navHtml(startIndex, comments.comments.length,comments.meta.totalCount));
            }
        });
    }
}

function navHtml(startIndex, commentsCount, commentsTotalCount) {
    var htmlKod = "";
    htmlKod += "<p id='vypis'>";
    if (commentsCount > 0) {
        if (startIndex > (commentsCount - 1)) {
            htmlKod += " <button id='prevB' onclick=\"writeComment2Html(" + (startIndex-pocetKomentarovNaStranu) +
                ", pocetKomentarovNaStranu, server, 'comment', 'navigacia', artId)\">" +
                "<< Predchádzajúce</button>";
        }
        if (commentsCount > 0) {
            htmlKod += "<span id='textvypisu'>Vypisujem komentáre " + (startIndex + 1) + " až " + (startIndex + commentsCount) + " z " + commentsTotalCount +
                " <input type='button' value='2' id='pocetClankov2' onclick=\"choose(2)\">" +
                " <input type='button' value='4' id='pocetClankov4' onclick=\"choose(4)\">" +
                " <input type='button' value='6' id='pocetClankov6' onclick=\"choose(6)\">" +
                " <input type='button' value='8' id='pocetClankov8' onclick=\"choose(8)\">" +
                "</span>";
        }
        if (startIndex < (commentsTotalCount - pocetKomentarovNaStranu)) {
            htmlKod += " <button id='nextB' onclick=\"writeComment2Html(" + (startIndex+pocetKomentarovNaStranu) +
                ", pocetKomentarovNaStranu, server, 'comment', 'navigacia', artId)\">" +
                "Nasledujúce >></button>";
        }
    }
    htmlKod += "</p>";
    return htmlKod;
}

var restURL ="http://"+server+"/api/article/"+artId;
function deleteArticle(sourceURL){
    if(window.confirm("Skutočne si želáte vymazať článok aj s jeho komentármi?")) {

        $.ajax({
            type: 'DELETE',
            url: sourceURL,
            success: function () {
                window.alert("Článok úspešne vymazaný");
                window.location.href = "main.html";
            },
            error: function (jxhr) {
                errorAlert("Vymazanie neúspešné.", jxhr);
            }
        });

    }
}

var commentURL ="http://"+server+"/api/comment/";
function deleteComment(sourceURL){
    if(window.confirm("Skutočne si želáte vymazať tento komentár?")) {

        $.ajax({
            type: 'DELETE',
            url: sourceURL,
            success: function () {
                window.alert("Komentár úspešne vymazaný");
                window.location.href = "article.html?id="+artId;
            },
            error: function (jxhr) {
                errorAlert("Vymazanie neúspešné.", jxhr);
            }
        });

    }
}

function choose(pocet){
    pocetKomentarovNaStranu = pocet;
    writeComment2Html(0, pocetKomentarovNaStranu, server, 'comment', 'navigacia', artId);
}